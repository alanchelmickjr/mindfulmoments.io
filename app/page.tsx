import { getHumeAccessToken } from "@/utils/getHumeAccessToken";
import MainContentClient from "@/components/MainContentClient"; // Import the new client component

export default async function Page() {
  const accessToken = await getHumeAccessToken();

  if (!accessToken) {
    // It's good practice to provide a more user-friendly error message or fallback UI
    // For now, we'll keep the error throwing, but this could be improved.
    throw new Error("Failed to retrieve access token.");
  }

  return (
    // The MainContentClient will now handle the layout of Chat and SwirlingPointsVisualization
    <MainContentClient accessToken={accessToken} />
  );
}
