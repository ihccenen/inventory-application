export default async function updateArtist(artistId: string, name: string) {
  const artist = await fetch(`http://localhost:5000/artist/${artistId}`, {
    method: 'PATCH',
    body: JSON.stringify({ name }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!artist.ok) throw new Error('Failed to update artist');

  return artist.json();
}
