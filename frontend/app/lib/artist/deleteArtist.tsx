export default async function deleteArtist(artistId: string) {
  const artist = await fetch(`http://localhost:5000/artist/${artistId}`, {
    method: 'DELETE',
  });

  if (!artist.ok) throw new Error('Not found');

  return artist.json();
}
