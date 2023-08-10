'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ArtistForm from '@/app/components/ArtistForm';
import createArtist from '@/app/lib/artist/createArtist';

export default function CreateArtist() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const { push } = useRouter();

  const handleChage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    createArtist(value)
      .then(() => push('/artists'))
      .catch((err) => setError('Failed to create artist'));
  };

  return (
    <main className="main">
      <h1>Create Artist</h1>
      {error && <p>{error}</p>}
      <ArtistForm
        value={value}
        handleChange={handleChage}
        handleSubmit={handleSubmit}
      />
    </main>
  );
}
