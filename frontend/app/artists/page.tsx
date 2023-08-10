'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import getAllArtists from '../lib/artist/getAllArtists';

export default function Artist() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [allArtists, setAllArtists] = useState<
    [{ name: string; _id: string }] | []
  >([]);

  useEffect(() => {
    getAllArtists()
      .then(setAllArtists)
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
              <h1>Artists:</h1>
              <ul className="items-list">
                {allArtists.length < 1 ? (
                  <p>There is no artist</p>
                ) : (
                  allArtists.map((arts) => (
                    <li key={arts._id}>
                      <Link href={`/artists/${arts._id}`}>{arts.name}</Link>
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
