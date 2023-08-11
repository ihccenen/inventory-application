export default async function createGenre(name: string) {
  const genre = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/genre/`, {
    method: 'POST',
    body: JSON.stringify({ name }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!genre) throw new Error('Failed to create genre');

  return genre.json();
}
