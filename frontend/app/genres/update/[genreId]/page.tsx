'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import GenreForm from '@/app/components/GenreForm';
import updateGenre from '@/app/lib/genre/updateGenre';
import getSingleGenre from '@/app/lib/genre/getSingleGenre';

export default function CreateArtist({
  params: { genreId },
}: {
  params: { genreId: string };
}) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const { push } = useRouter();

  const handleChage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    updateGenre(genreId, value)
      .then(() => push('/genres'))
      .catch((err) => setError('Failed to update genre, please try again'));
  };

  useEffect(() => {
    getSingleGenre(genreId).then((res) => {
      setValue(res.name);
    });
  }, [genreId]);

  return (
    <main className="main">
      {value === '' ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1>Update Genre</h1>
          {error && <p>{error}</p>}
          <GenreForm
            value={value}
            handleChange={handleChage}
            handleSubmit={handleSubmit}
          />
        </>
      )}
    </main>
  );
}
