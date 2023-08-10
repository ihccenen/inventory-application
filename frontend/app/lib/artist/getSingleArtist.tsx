export default async function getSingleArtist(artistId: string) {
  const artist = await fetch(`http://localhost:5000/artist/${artistId}`);

  if (!artist.ok) throw new Error('Artist not found');

  return artist.json();
}
