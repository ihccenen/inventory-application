export default async function updateTrack(
  trackId: string,
  title: string,
  artist: string,
  album: string,
  genre: string[]
) {
  const track = await fetch(`http://localhost:5000/track/${trackId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      title,
      artist,
      album,
      genre,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  console.log(track);

  if (!track.ok) throw new Error('Failed to update track');

  return track;
}
