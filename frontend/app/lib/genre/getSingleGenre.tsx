export default async function getSingleGenre(genreId: string) {
  const items = await fetch(`http://localhost:5000/genre/${genreId}`);

  if (!items) throw new Error('Failed to get genre');

  return items.json();
}
