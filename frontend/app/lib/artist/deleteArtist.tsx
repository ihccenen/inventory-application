export default async function deleteArtist(artistId: string) {
  const artist = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/artist/${artistId}`,
    {
      method: 'DELETE',
    }
  );

  if (!artist.ok) throw new Error('Not found');

  return artist.json();
}
