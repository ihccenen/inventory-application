'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import createAlbum from '@/app/lib/album/createAlbum';
import AlbumForm from '@/app/components/AlbumForm';

export default function CreateAlbum() {
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [genre, setGenre] = useState<string[] | []>([]);
  const { push } = useRouter();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const handleArtistChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setArtist(e.currentTarget.value);
  };

  const handleGenreChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    if (e.currentTarget.checked) setGenre((prev) => [id, ...prev]);
    else setGenre((prev) => prev.filter((genre) => genre !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    createAlbum(title, artist, genre)
      .then(() => push('/albums'))
      .catch((err) => setError('Failed to create album'));
  };

  return (
    <main className="main">
      <h1>Create Album</h1>
      {error && <p>{error}</p>}
      <AlbumForm
        titleValue={title}
        artistValue={artist}
        genreValues={genre}
        handleGenreChange={handleGenreChange}
        handleTitleChange={handleTitleChange}
        handleArtistChange={handleArtistChange}
        handleSubmit={handleSubmit}
      />
    </main>
  );
}
