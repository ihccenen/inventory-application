export default async function updateAlbum(
  albumId: string,
  title: string,
  artist: string,
  genre: string[]
) {
  const album = await fetch(`http://localhost:5000/album/${albumId}`, {
    method: 'PATCH',
    body: JSON.stringify({ title, artist, genre }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!album.ok) throw new Error('Failed to updated album');

  return album.json();
}
