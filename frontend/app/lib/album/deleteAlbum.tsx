export default async function deleteAlbum(albumId: string) {
  const album = await fetch(`http://localhost:5000/album/${albumId}`, {
    method: 'DELETE',
  });

  if (!album.ok) throw new Error('Not found');

  return album.json();
}
