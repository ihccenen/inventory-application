export default async function createGenre(name: string) {
  const genre = await fetch('http://localhost:5000/genre/', {
    method: 'POST',
    body: JSON.stringify({ name }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!genre) throw new Error('Failed to create genre');

  return genre.json();
}
