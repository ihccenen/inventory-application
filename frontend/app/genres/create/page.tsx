'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import createGenre from '@/app/lib/genre/createGenre';
import GenreForm from '@/app/components/GenreForm';
import styles from './page.module.css';

export default function CreateGenre() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const { push } = useRouter();

  const handleChage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createGenre(value)
      .then(() => push('/genres'))
      .catch((err) => setError('Failed to create genre, please try again'));
  };

  return (
    <main className="main">
      <h1>Create Genre</h1>
      {error && <p>{error}</p>}
      <GenreForm
        value={value}
        handleChange={handleChage}
        handleSubmit={handleSubmit}
      />
    </main>
  );
}
