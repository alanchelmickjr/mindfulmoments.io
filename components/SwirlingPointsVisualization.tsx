import React, { useState, useEffect, useRef } from 'react';

// --- Props ---
interface SwirlingPointsVisualizationProps {
  isListening: boolean;
  isTalking: boolean;
  width?: number;
  height?: number;
  numPoints?: number;
  pointColor?: string;
}

// --- Constants ---
const DEFAULT_WIDTH = 300;
const DEFAULT_HEIGHT = 300;
const DEFAULT_NUM_POINTS = 100;
const DEFAULT_POINT_COLOR = 'rgba(255, 255, 255, 0.7)';
const MIN_SPEED = 0.005;
const MAX_SPEED = 0.02;
const MIN_RADIUS_FACTOR = 0.1;
const MAX_RADIUS_FACTOR = 0.45;
const POINT_VISUAL_RADIUS = 2; // Visual radius of each SVG circle

// --- State ---
interface Point {
  id: string;
  x: number;
  y: number;
  baseAngle: number;
  currentAngle: number;
  speed: number;
  orbitRadius: number;
  targetX?: number;
  targetY?: number;
  isFacePoint: boolean;
  noiseOffsetX: number;
  noiseOffsetY: number;
  noiseOffsetZ: number; // For 3D noise or time evolution of noise pattern
}

// --- Face Coordinate Definitions (Normalized: -1 to 1) ---
// These will be scaled by width/2 and height/2 and centered.
const LISTENING_FACE_COORDS_NORMALIZED = [
  // Outline
  { x: 0, y: -0.8 }, { x: 0.3, y: -0.75 }, { x: 0.5, y: -0.6 }, { x: 0.6, y: -0.4 },
  { x: 0.65, y: -0.2 }, { x: 0.65, y: 0 }, { x: 0.6, y: 0.2 }, { x: 0.5, y: 0.4 },
  { x: 0.3, y: 0.55 }, { x: 0, y: 0.6 }, { x: -0.3, y: 0.55 }, { x: -0.5, y: 0.4 },
  { x: -0.6, y: 0.2 }, { x: -0.65, y: 0 }, { x: -0.65, y: -0.2 }, { x: -0.6, y: -0.4 },
  { x: -0.5, y: -0.6 }, { x: -0.3, y: -0.75 },
  // Mouth (calm line)
  { x: -0.2, y: 0.3 }, { x: -0.1, y: 0.31 }, { x: 0, y: 0.31 }, { x: 0.1, y: 0.31 }, { x: 0.2, y: 0.3 },
  // Eyes (dots)
  { x: -0.25, y: -0.25 }, { x: 0.25, y: -0.25 },
];

const TALKING_FACE_COORDS_NORMALIZED = [
  // Outline (same as listening)
  { x: 0, y: -0.8 }, { x: 0.3, y: -0.75 }, { x: 0.5, y: -0.6 }, { x: 0.6, y: -0.4 },
  { x: 0.65, y: -0.2 }, { x: 0.65, y: 0 }, { x: 0.6, y: 0.2 }, { x: 0.5, y: 0.4 },
  { x: 0.3, y: 0.55 }, { x: 0, y: 0.6 }, { x: -0.3, y: 0.55 }, { x: -0.5, y: 0.4 },
  { x: -0.6, y: 0.2 }, { x: -0.65, y: 0 }, { x: -0.65, y: -0.2 }, { x: -0.6, y: -0.4 },
  { x: -0.5, y: -0.6 }, { x: -0.3, y: -0.75 },
  // Mouth (slightly open)
  { x: -0.25, y: 0.28 }, { x: 0, y: 0.38 }, { x: 0.25, y: 0.28 }, { x: 0, y: 0.32 }, { x: -0.15, y: 0.35 }, { x: 0.15, y: 0.35 },
  // Eyes (dots - same)
  { x: -0.25, y: -0.25 }, { x: 0.25, y: -0.25 },
];

const NUM_FACE_POINTS_FROM_COORDS = Math.max(LISTENING_FACE_COORDS_NORMALIZED.length, TALKING_FACE_COORDS_NORMALIZED.length);

// Placeholder for Perlin noise function (would use a library like 'simplex-noise')
// This is a very basic placeholder and not true Perlin noise.
const pseudoPerlinNoise = (x: number, y: number, z: number): number => {
  const M = 4294967296;
  let seed = (x * 12345 + y * 67890 + z * 13579) % M;
  seed = (seed * seed) % M;
  seed = (seed * seed) % M;
  return (seed / M - 0.5) * 2; // Normalize to -1 to 1
};


const SwirlingPointsVisualization: React.FC<SwirlingPointsVisualizationProps> = ({
  isListening,
  isTalking,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  numPoints = DEFAULT_NUM_POINTS,
  pointColor = DEFAULT_POINT_COLOR,
}) => {
  const [points, setPoints] = useState<Point[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // --- Initialization Effect ---
  useEffect(() => {
    const centerX = width / 2;
    const centerY = height / 2;
    const maxOrbitR = Math.min(width, height) / 2 * MAX_RADIUS_FACTOR;
    const minOrbitR = Math.min(width, height) / 2 * MIN_RADIUS_FACTOR;

    const initialPoints: Point[] = [];
    for (let i = 0; i < numPoints; i++) {
      initialPoints.push({
        id: `point-${i}`,
        x: centerX + (Math.random() - 0.5) * width * 0.8, // Start somewhat centered
        y: centerY + (Math.random() - 0.5) * height * 0.8,
        baseAngle: Math.random() * 2 * Math.PI,
        currentAngle: Math.random() * 2 * Math.PI,
        speed: MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED),
        orbitRadius: minOrbitR + Math.random() * (maxOrbitR - minOrbitR),
        isFacePoint: i < NUM_FACE_POINTS_FROM_COORDS, // Designate first N points for face
        targetX: undefined,
        targetY: undefined,
        noiseOffsetX: Math.random() * 1000,
        noiseOffsetY: Math.random() * 1000,
        noiseOffsetZ: Math.random() * 1000,
      });
    }
    setPoints(initialPoints);
  }, [numPoints, width, height]);

  // --- Animation Loop Effect ---
  useEffect(() => {
    const centerX = width / 2;
    const centerY = height / 2;
    let time = 0;

    function animate() {
      setPoints(prevPoints =>
        prevPoints.map((p, index) => {
          let newX = p.x;
          let newY = p.y;
          let newAngle = p.currentAngle + p.speed;

          let currentTargetX: number | undefined = undefined;
          let currentTargetY: number | undefined = undefined;

          if (p.isFacePoint) {
            const faceCoordsSet = isTalking
              ? TALKING_FACE_COORDS_NORMALIZED
              : isListening
              ? LISTENING_FACE_COORDS_NORMALIZED
              : null;
            
            if (faceCoordsSet && index < faceCoordsSet.length) {
              const coord = faceCoordsSet[index];
              currentTargetX = centerX + coord.x * (width / 2.5); // Scale factor for face size
              currentTargetY = centerY + coord.y * (height / 2.5);
            }
          }

          if (currentTargetX !== undefined && currentTargetY !== undefined) {
            newX += (currentTargetX - p.x) * 0.08; // Easing factor towards face
            newY += (currentTargetY - p.y) * 0.08;
          } else {
            // Swirling / Cyclonic movement
            const noiseX = pseudoPerlinNoise(p.noiseOffsetX + time * p.speed, p.noiseOffsetY, p.noiseOffsetZ) * 0.5; // Noise influence
            const noiseY = pseudoPerlinNoise(p.noiseOffsetY, p.noiseOffsetX + time * p.speed, p.noiseOffsetZ) * 0.5;

            let orbitalX = centerX + p.orbitRadius * Math.cos(newAngle + p.baseAngle) + noiseX * p.orbitRadius * 0.5;
            let orbitalY = centerY + p.orbitRadius * Math.sin(newAngle + p.baseAngle) + noiseY * p.orbitRadius * 0.5;
            
            // Gentle pull towards orbital path
            newX += (orbitalX - p.x) * 0.03;
            newY += (orbitalY - p.y) * 0.03;

            // Add a slight inward/outward drift to radius for vortex feel
            const newOrbitRadius = p.orbitRadius + Math.sin(time + p.baseAngle) * 0.1;
             p.orbitRadius = Math.max(MIN_RADIUS_FACTOR * Math.min(width,height)/2 , Math.min(MAX_RADIUS_FACTOR * Math.min(width,height)/2, newOrbitRadius));
          }
          
          // Boundary checks (simple wrap around for now)
          if (newX < -POINT_VISUAL_RADIUS*2) newX = width + POINT_VISUAL_RADIUS*2;
          if (newX > width + POINT_VISUAL_RADIUS*2) newX = -POINT_VISUAL_RADIUS*2;
          if (newY < -POINT_VISUAL_RADIUS*2) newY = height + POINT_VISUAL_RADIUS*2;
          if (newY > height + POINT_VISUAL_RADIUS*2) newY = -POINT_VISUAL_RADIUS*2;

          return { ...p, x: newX, y: newY, currentAngle: newAngle };
        })
      );
      time += 0.01;
      animationFrameId.current = requestAnimationFrame(animate);
    }

    if (points.length > 0) { // Only start animation if points are initialized
        animationFrameId.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [points, width, height, isListening, isTalking]); // Re-run if points array itself changes by re-initialization

  return (
    <svg ref={svgRef} width={width} height={height} style={{ overflow: 'hidden' }}>
      {points.map(p => (
        <circle
          key={p.id}
          cx={p.x}
          cy={p.y}
          r={POINT_VISUAL_RADIUS}
          fill={pointColor}
          opacity={p.isFacePoint && (isListening || isTalking) ? 0.9 : 0.6}
        />
      ))}
    </svg>
  );
};

export default SwirlingPointsVisualization;