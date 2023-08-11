export default async function deleteGenre(genreId: string) {
  const genre = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/genre/${genreId}`,
    {
      method: 'DELETE',
    }
  );

  if (!genre) throw new Error('Failed to delete genre');

  return genre.json();
}
