'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AlbumForm from '@/app/components/AlbumForm';
import updateAlbum from '@/app/lib/album/updateAlbum';
import getSingleAlbum from '@/app/lib/album/getSingleAlbum';

export default function UpdateAlbum({
  params: { albumId },
}: {
  params: { albumId: string };
}) {
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

    updateAlbum(albumId, title, artist, genre)
      .then(() => push(`/albums/${albumId}`))
      .catch((err) => setError('Failed to update album, please try again'));
  };

  useEffect(() => {
    getSingleAlbum(albumId)
      .then((res) => {
        setTitle(res.title);
        setArtist(res.artist._id);
        setGenre(
          res.genre.reduce(
            (acc: string[], curr: { _id: string }) => [curr._id, ...acc],
            []
          )
        );
      })
      .catch((err) => setError(err.message));
  }, [albumId]);

  return (
    <main className="main">
      <h1>Update Album</h1>
      {error && <p>{error}</p>}
      <AlbumForm
        titleValue={title}
        artistValue={artist}
        genreValues={genre}
        handleTitleChange={handleTitleChange}
        handleArtistChange={handleArtistChange}
        handleGenreChange={handleGenreChange}
        handleSubmit={handleSubmit}
      />
    </main>
  );
}
