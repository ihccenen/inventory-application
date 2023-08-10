export default async function getAllAlbums() {
  const allAlbums = await fetch('http://localhost:5000/album');

  if (!allAlbums.ok) {
    throw new Error('Failed to get album list');
  }

  return allAlbums.json();
}
