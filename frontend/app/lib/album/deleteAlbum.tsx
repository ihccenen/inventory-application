export default async function deleteAlbum(albumId: string) {
  const album = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/album/${albumId}`,
    {
      method: 'DELETE',
    }
  );

  if (!album.ok) throw new Error('Not found');

  return album.json();
}
