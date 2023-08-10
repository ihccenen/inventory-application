'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ArtistForm from '@/app/components/ArtistForm';
import getSingleArtist from '@/app/lib/artist/getSingleArtist';
import updateArtist from '@/app/lib/artist/updateArtist';

export default function CreateArtist({
  params: { artistId },
}: {
  params: { artistId: string };
}) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const { push } = useRouter();

  const handleChage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    updateArtist(artistId, value)
      .then(() => push('/artists'))
      .catch((err) => setError('Failed to update artist, please try again'));
  };

  useEffect(() => {
    getSingleArtist(artistId).then((res) => {
      setValue(res.name);
    });
  }, [artistId]);

  return (
    <main className="main">
      {value === '' ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1>Update Artist</h1>
          {error && <p>{error}</p>}
          <ArtistForm
            value={value}
            handleChange={handleChage}
            handleSubmit={handleSubmit}
          />
        </>
      )}
    </main>
  );
}
