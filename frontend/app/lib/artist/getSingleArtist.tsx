export default async function getSingleArtist(artistId: string) {
  const artist = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/artist/${artistId}`
  );

  if (!artist.ok) throw new Error('Artist not found');

  return artist.json();
}
