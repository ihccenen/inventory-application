export default async function getSingleGenre(genreId: string) {
  const items = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/genre/${genreId}`
  );

  if (!items) throw new Error('Failed to get genre');

  return items.json();
}
