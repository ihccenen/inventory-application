export default async function getAllGenres() {
  const allGenres = await fetch('http://localhost:5000/genre');

  if (!allGenres.ok) {
    throw new Error('Failed to get genre list');
  }

  return allGenres.json();
}
