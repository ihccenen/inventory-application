export default async function deleteTrack(trackId: string) {
  const track = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/track/${trackId}`,
    {
      method: 'DELETE',
    }
  );

  if (!track.ok) throw new Error('Not found');

  return track.json();
}
