import type { FC, SVGAttributes } from "react";

export type MindfulMomentsLogoProps = SVGAttributes<SVGSVGElement>;

export default function MindfulMomentsLogo(props: MindfulMomentsLogoProps) {
  return (
    <svg
      width="200"
      height="25"
      viewBox="0 0 200 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <text
        x="0"
        y="18"
        fontFamily="Arial, sans-serif"
        fontSize="18"
        fontWeight="bold"
        fill="currentColor"
      >
        MindfulMoments.io
      </text>
      {/* Lotus flower icon */}
      <path
        d="M185,12.5 C185,8.91 182.09,6 178.5,6 C174.91,6 172,8.91 172,12.5 C172,16.09 174.91,19 178.5,19 C182.09,19 185,16.09 185,12.5 Z"
        fill="#4CAF50"
        opacity="0.3"
      />
      <path
        d="M178.5,7 C179.5,9 181,10 183,10 C181,11 179.5,12 178.5,14 C177.5,12 176,11 174,10 C176,10 177.5,9 178.5,7 Z"
        fill="#4CAF50"
      />
    </svg>
  );
}