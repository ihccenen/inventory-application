export default async function updateArtist(artistId: string, name: string) {
  const artist = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/artist/${artistId}`,
    {
      method: 'PATCH',
      body: JSON.stringify({ name }),
      headers: { 'Content-Type': 'application/json' },
    }
  );

  if (!artist.ok) throw new Error('Failed to update artist');

  return artist.json();
}
