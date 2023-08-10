export default async function getSingleTrack(trackId: string) {
  const track = await fetch(`http://localhost:5000/track/${trackId}`);

  if (!track.ok) throw new Error('Not found');

  return track.json();
}
