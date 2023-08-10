'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import deleteArtist from '@/app/lib/artist/deleteArtist';
import getSingleArtist from '@/app/lib/artist/getSingleArtist';

export default function Artist({
  params: { artistId },
}: {
  params: { artistId: string };
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [artist, setArtist] = useState<{
    name: string;
    albums: [{ title: string; _id: string }];
    tracks: [{ title: string; _id: string }];
  } | null>(null);
  const router = useRouter();

  const handleClick = () => {
    deleteArtist(artistId)
      .then(() => router.push('/artists'))
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    getSingleArtist(artistId)
      .then(setArtist)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [artistId]);

  return (
    <main className="main">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {!artist ? (
            <h1>{error}</h1>
          ) : (
            <>
              <div>
                <h1>{artist.name}</h1>
                <p>
                  <Link href={`/artists/update/${artistId}`}>Update</Link>
                </p>
              </div>
              <div>
                <h2>Albums:</h2>
                {artist.albums.length < 1 ? (
                  <p>No albums</p>
                ) : (
                  <ul className="items-list">
                    {artist.albums.map(({ title, _id }) => (
                      <li key={_id}>
                        <Link href={`/albums/${_id}`}>{title}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <h2>Tracks:</h2>
                {artist.tracks.length < 1 ? (
                  <p>No tracks</p>
                ) : (
                  <ul className="items-list">
                    {artist.tracks.map(({ title, _id }) => (
                      <li key={_id}>
                        <Link href={`/tracks/${_id}`}>{title}</Link>
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
                Delete Artist (It will also delete all albums and tracks)
              </button>
            </>
          )}
        </>
      )}
    </main>
  );
}
