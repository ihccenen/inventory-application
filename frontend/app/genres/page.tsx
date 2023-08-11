'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import getAllGenres from '../lib/genre/getAllGenres';

export default function Genre() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [genres, setGenres] = useState<[{ name: string; _id: string }] | null>(
    null
  );

  useEffect(() => {
    getAllGenres()
      .then(setGenres)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {genres == null ? (
            <h1>error</h1>
          ) : (
            <>
              <h1>Genres:</h1>
              <ul className="items-list">
                {genres.length < 1 ? (
                  <p>There is no artist in the database.</p>
                ) : (
                  genres.map((genre) => (
                    <li key={genre._id}>
                      <Link href={`/genres/${genre._id}`}>{genre.name}</Link>
                    </li>
                  ))
                )}
              </ul>
            </>
          )}
        </>
      )}
    </main>
  );
}
