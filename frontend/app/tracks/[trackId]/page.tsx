'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import deleteTrack from '@/app/lib/track/deleteTrack';
import getSingleTrack from '@/app/lib/track/getSingleTrack';
import Link from 'next/link';

export default function Artist({
  params: { trackId },
}: {
  params: { trackId: string };
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [track, setTrack] = useState<{
    title: string;
    album: { title: string; _id: string };
    artist: { name: string; _id: string };
    genre: [{ name: string; _id: string }];
  } | null>(null);
  const router = useRouter();

  const handleClick = () => {
    deleteTrack(trackId)
      .then(() => router.push('/tracks'))
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    getSingleTrack(trackId)
      .then(setTrack)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [trackId]);

  return (
    <main className="main">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {!track ? (
            <h1>{error}</h1>
          ) : (
            <>
              <div>
                <h1>{track.title}</h1>
                <Link href={`/tracks/update/${trackId}`}>Update</Link>
              </div>
              <h2>
                Artist:{' '}
                <Link href={`/artists/${track.artist._id}`}>
                  {track.artist.name}
                </Link>
              </h2>
              {track.album && (
                <h2>
                  Album:{' '}
                  <Link href={`/albums/${track.album._id}`}>
                    {track.album.title}
                  </Link>
                </h2>
              )}
              <div>
                <h2>Genres:</h2>
                {track.genre.length < 1 ? (
                  <p>No genres</p>
                ) : (
                  <ul className="items-list">
                    {track.genre.map(({ name, _id }) => (
                      <li key={_id}>
                        <Link href={`/genres/${_id}`}>{name}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <button
                className="delete-btn"
                type="button"
                onClick={handleClick}
              >
                Delete Track
              </button>
            </>
          )}
        </>
      )}
    </main>
  );
}
