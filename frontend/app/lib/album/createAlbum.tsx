export default async function createAlbum(
  title: string,
  artist: string,
  genre: string[]
) {
  const album = await fetch('http://localhost:5000/album', {
    method: 'POST',
    body: JSON.stringify({ title, artist, genre }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!album.ok) throw new Error('Failed to create album');

  return album.json();
}
