export default async function getAllTracks() {
  const allTracks = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/track`);

  if (!allTracks.ok) {
    throw new Error('Failed to get track list');
  }

  return allTracks.json();
}
