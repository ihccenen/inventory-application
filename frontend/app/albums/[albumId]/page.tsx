'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import deleteAlbum from '@/app/lib/album/deleteAlbum';
import getSingleAlbum from '@/app/lib/album/getSingleAlbum';

export default function Album({
  params: { albumId },
}: {
  params: { albumId: string };
}) {
  const [album, setAlbum] = useState<{
    title: string;
    artist: { name: string; _id: string };
    tracks: [{ title: string; _id: string }];
    genre: [{ name: string; _id: string }];
  } | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleClick = () => {
    deleteAlbum(albumId)
      .then(() => router.push('/albums'))
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    getSingleAlbum(albumId)
      .then(setAlbum)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [albumId]);

  return (
    <main className="main">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {album == null ? (
            <div>
              <h1>{error}</h1>
              <p>
                <Link href={`/albums/update/${albumId}`}>Update</Link>
              </p>
            </div>
          ) : (
            <>
              <div>
                <h1>{album.title}</h1>
                <p>
                  <Link href={`/albums/update/${albumId}`}>Update</Link>
                </p>
              </div>
              <div>
                <h2>Tracks:</h2>
                {album.tracks.length < 1 ? (
                  <p>No tracks</p>
                ) : (
                  <ul className="items-list">
                    {album.tracks.map(({ title, _id }) => (
                      <li key={_id}>
                        <Link href={`/tracks/${_id}`}>{title}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <h2>Genres:</h2>
                {album.genre.length < 1 ? (
                  <p>No genres</p>
                ) : (
                  <ul className="items-list">
                    {album.genre.map(({ name, _id }) => (
                      <li key={_id}>
                        <Link href={`/genres/${_id}`}>{name}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <p>
                Artist:{' '}
                <Link href={`/artists/${album.artist._id}`}>
                  {album.artist.name}
                </Link>
              </p>
              <button
                className="delete-btn"
                type="button"
                onClick={handleClick}
              >
                Delete Album
              </button>
            </>
          )}
        </>
      )}
    </main>
  );
}
