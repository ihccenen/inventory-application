export default async function getSingleAlbum(albumId: string) {
  const album = await fetch(`http://localhost:5000/album/${albumId}`);

  if (!album.ok) throw new Error('Not found');

  return album.json();
}
