'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import getAllAlbums from '../lib/album/getAllAlbums';

export default function Albums() {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [allAlbums, setAllAlbums] = useState<
    [{ title: string; _id: string }] | []
  >([]);

  useEffect(() => {
    getAllAlbums()
      .then(setAllAlbums)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <>
          {error ? (
            <h1>{error}</h1>
          ) : (
            <>
              <h1>Albums:</h1>
              {allAlbums.length < 1 ? (
                <p>No albums</p>
              ) : (
                <ul className="items-list">
                  {allAlbums.map(({ title, _id }) => (
                    <li key={_id}>
                      <Link href={`/albums/${_id}`}>{title}</Link>
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
