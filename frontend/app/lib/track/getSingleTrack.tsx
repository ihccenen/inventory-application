export default async function getSingleTrack(trackId: string) {
  const track = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/track/${trackId}`
  );

  if (!track.ok) throw new Error('Not found');

  return track.json();
}
