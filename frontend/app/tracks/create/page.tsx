'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import createTrack from '@/app/lib/track/createTrack';
import TrackForm from '@/app/components/TrackForm';

export default function CreateTrack() {
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [genre, setGenre] = useState<string[] | []>([]);
  const { push } = useRouter();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const handleArtistChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setArtist(e.currentTarget.value);
  };

  const handleAlbumChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAlbum(e.currentTarget.value);
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

    createTrack(title, artist, album, genre)
      .then(() => push('/tracks'))
      .catch(() => setError('Failed to create track, please try again'));
  };

  return (
    <main className="main">
      <h1>Create Track</h1>
      {error && <p>{error}</p>}
      <TrackForm
        titleValue={title}
        artistValue={artist}
        albumValue={album}
        genreValues={genre}
        handleGenreChange={handleGenreChange}
        handleTitleChange={handleTitleChange}
        handleArtistChange={handleArtistChange}
        handleAlbumChange={handleAlbumChange}
        handleSubmit={handleSubmit}
      />
    </main>
  );
}
