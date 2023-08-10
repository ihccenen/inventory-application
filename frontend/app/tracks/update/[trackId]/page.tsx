'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TrackForm from '@/app/components/TrackForm';
import getSingleTrack from '@/app/lib/track/getSingleTrack';
import updateTrack from '@/app/lib/track/updateTrack';

export default function CreateTrack({
  params: { trackId },
}: {
  params: { trackId: string };
}) {
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
    setAlbum('');
  };

  const handleAlbumChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAlbum(e.currentTarget.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    updateTrack(trackId, title, artist, album, genre)
      .then(() => push(`/tracks/${trackId}`))
      .catch(() => setError('Failed to update track'));
  };

  const handleGenreChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    if (e.currentTarget.checked) setGenre((prev) => [id, ...prev]);
    else setGenre((prev) => prev.filter((genre) => genre !== id));
  };

  useEffect(() => {
    getSingleTrack(trackId)
      .then((res) => {
        setTitle(res.title);
        setArtist(res.artist._id);
        setAlbum(res?.album?._id || '');
        setGenre(
          res.genre.reduce(
            (acc: string[], curr: { _id: string }) => [curr._id, ...acc],
            []
          )
        );
      })
      .catch((err) => setError(err.message));
  }, [trackId]);

  return (
    <main className="main">
      <h1>Update Track</h1>
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
