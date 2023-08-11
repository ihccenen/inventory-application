export default async function getAllGenres() {
  const allGenres = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/genre`);

  if (!allGenres.ok) {
    throw new Error('Failed to get genre list');
  }

  return allGenres.json();
}
