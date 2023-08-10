export default async function getAllArtists() {
  const allArtists = await fetch('http://localhost:5000/artist');

  if (!allArtists.ok) {
    throw new Error('Failed to get artist list');
  }

  return allArtists.json();
}
