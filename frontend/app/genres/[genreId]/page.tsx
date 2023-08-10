'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import getSingleGenre from '@/app/lib/genre/getSingleGenre';
import deleteGenre from '@/app/lib/genre/deleteGenre';

export default function List({
  params: { genreId },
}: {
  params: { genreId: string };
}) {
  const [error, setError] = useState('');
  const [genre, setGenre] = useState<{
    name: string;
    albums: [{ title: string; _id: string }];
    tracks: [{ title: string; _id: string }];
  } | null>(null);
  const { push } = useRouter();

  const handleClick = () => {
    deleteGenre(genreId).finally(() => push('/genres'));
  };

  useEffect(() => {
    getSingleGenre(genreId)
      .then(setGenre)
      .catch((err) => setError(err.message));
  }, [genreId]);

  return (
    <main className="main">
      <div>
        <h1>{genre?.name}</h1>
        <Link href={`/genres/update/${genreId}`}>Update</Link>
      </div>
      {genre && (
        <>
          <div>
            <h2>Albums:</h2>
            {genre.albums.length < 1 ? (
              <h3>No albums yet</h3>
            ) : (
              <ul className="items-list">
                {genre.albums.map(({ title, _id }) => (
                  <li key={_id}>
                    <Link href={`/albums/${_id}`}>{title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h2>Tracks:</h2>
            {genre.tracks.length < 1 ? (
              <h3>No tracks yet</h3>
            ) : (
              <ul className="items-list">
                {genre.tracks.map(({ title, _id }) => (
                  <li key={_id}>
                    <Link href={`/tracks/${_id}`}>{title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
      <button className="delete-btn" type="button" onClick={handleClick}>
        Delete genre
      </button>
    </main>
  );
}
