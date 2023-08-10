export default async function getAllTracks() {
  const allTracks = await fetch('http://localhost:5000/track');

  if (!allTracks.ok) {
    throw new Error('Failed to get track list');
  }

  return allTracks.json();
}
