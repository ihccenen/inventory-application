export default async function updateGenre(genreId: string, name: string) {
  const genre = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/genre/${genreId}`,
    {
      method: 'PATCH',
      body: JSON.stringify({ name }),
      headers: { 'Content-Type': 'application/json' },
    }
  );

  if (!genre.ok) throw new Error('Failed to update genre');

  return genre.json();
}
