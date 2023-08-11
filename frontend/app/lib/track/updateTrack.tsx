export default async function updateTrack(
  trackId: string,
  title: string,
  artist: string,
  album: string,
  genre: string[]
) {
  const track = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/track/${trackId}`,
    {
      method: 'PATCH',
      body: JSON.stringify({
        title,
        artist,
        album,
        genre,
      }),
      headers: { 'Content-Type': 'application/json' },
    }
  );

  console.log(track);

  if (!track.ok) throw new Error('Failed to update track');

  return track;
}
