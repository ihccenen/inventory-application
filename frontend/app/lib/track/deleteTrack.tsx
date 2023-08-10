export default async function deleteTrack(trackId: string) {
  const track = await fetch(`http://localhost:5000/track/${trackId}`, {
    method: 'DELETE',
  });

  if (!track.ok) throw new Error('Not found');

  return track.json();
}
