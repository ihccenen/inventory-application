export default async function createTrack(
  title: string,
  artist: string,
  album: string,
  genre: string[]
) {
  const track = await fetch('http://localhost:5000/track/', {
    method: 'POST',
    body: JSON.stringify({ title, artist, album: album || undefined, genre }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!track.ok) throw new Error('Failed to create track');

  return track;
}
