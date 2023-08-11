export default async function createArtist(name: string) {
  const artist = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artist`, {
    method: 'POST',
    body: JSON.stringify({ name }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!artist.ok) throw new Error('Failed to create artist');

  return artist.json();
}
