'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import getAllTracks from '../lib/track/getAllTracks';

export default function Tracks() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [allTracks, setAllTracks] = useState<
    [{ title: string; _id: string }] | []
  >([]);

  useEffect(() => {
    getAllTracks()
      .then(setAllTracks)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {error ? (
            <h1>{error}</h1>
          ) : (
            <>
              <h1>Tracks</h1>
              {allTracks.length < 1 ? (
                <p>No tracks</p>
              ) : (
                <ul className="items-list">
                  {allTracks.map(({ title, _id }) => (
                    <li key={_id}>
                      <Link href={`/tracks/${_id}`}>{title}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </>
      )}
    </main>
  );
}
