export default async function getSingleAlbum(albumId: string) {
  const album = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/album/${albumId}`
  );

  if (!album.ok) throw new Error('Not found');

  return album.json();
}
