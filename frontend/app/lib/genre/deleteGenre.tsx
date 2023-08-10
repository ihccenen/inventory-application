export default async function deleteGenre(genreId: string) {
  const genre = await fetch(`http://localhost:5000/genre/${genreId}`, {
    method: 'DELETE',
  });

  if (!genre) throw new Error('Failed to delete genre');

  return genre.json();
}
