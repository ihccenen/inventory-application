export default async function createAlbum(
  title: string,
  artist: string,
  genre: string[]
) {
  const album = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/album`, {
    method: 'POST',
    body: JSON.stringify({ title, artist, genre }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!album.ok) throw new Error('Failed to create album');

  return album.json();
}
