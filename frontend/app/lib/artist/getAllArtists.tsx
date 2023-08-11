export default async function getAllArtists() {
  const allArtists = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artist`);

  if (!allArtists.ok) {
    throw new Error('Failed to get artist list');
  }

  return allArtists.json();
}
