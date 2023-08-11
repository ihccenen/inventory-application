export default async function getAllAlbums() {
  const allAlbums = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/album`);

  if (!allAlbums.ok) {
    throw new Error('Failed to get album list');
  }

  return allAlbums.json();
}
