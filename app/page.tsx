import MainContentClient from "@/components/MainContentClient"; // Import the new client component

export default function Page() {
  // The MainContentClient will now handle the layout of Chat and SwirlingPointsVisualization
  return (
    <MainContentClient />
  );
}
