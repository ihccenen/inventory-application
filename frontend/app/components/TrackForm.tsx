import { useState, useEffect } from 'react';
import getAllArtists from '../lib/artist/getAllArtists';
import getAlbumsByArtist from '../lib/album/getAlbumsByArtist';
import getAllGenres from '../lib/genre/getAllGenres';

type TrackFormProps = {
  titleValue: string;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  artistValue: string;
  handleArtistChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  albumValue: string;
  handleAlbumChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  genreValues: string[];
  handleGenreChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
};

export default function TrackForm({
  titleValue,
  handleTitleChange,
  artistValue,
  handleArtistChange,
  albumValue,
  handleAlbumChange,
  genreValues,
  handleGenreChange,
  handleSubmit,
}: TrackFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [allArtists, setAllArtists] = useState<
    | [
        {
          name: string;
          _id: string;
        }
      ]
    | null
  >(null);
  const [allAlbums, setAllAlbums] = useState<{
    albums: [{ title: string; _id: string }];
  } | null>(null);
  const [allGenre, setAllGenre] = useState<
    [{ name: string; _id: string }] | null
  >(null);

  if (allAlbums != null && artistValue == '') {
    setAllAlbums(null);
  }

  useEffect(() => {
    getAllArtists()
      .then(setAllArtists)
      .catch((err) => {
        setError(err.message);
      });

    if (artistValue != '') {
      getAlbumsByArtist(artistValue)
        .then(setAllAlbums)
        .catch((err) => {
          setError(err.message);
        });
    }

    getAllGenres()
      .then(setAllGenre)
      .catch((err) => setError(err.message));
  }, [artistValue]);

  return (
    <div>
      {error && <h2>{error}</h2>}
      <form className="form" onSubmit={handleSubmit}>
        <label className="label" htmlFor="name">
          Title (required):
          <input
            className="input"
            type="text"
            name="title"
            id="title"
            required
            value={titleValue}
            onChange={handleTitleChange}
          />
        </label>
        <label className="select" htmlFor="artist">
          Artist (required):
          <select
            name="artist"
            id="artist"
            value={artistValue}
            onChange={handleArtistChange}
            required
          >
            <option value={''}>Select artist</option>
            {allArtists && (
              <>
                {allArtists.map(({ name, _id }) => (
                  <option key={_id} value={_id}>
                    {name}
                  </option>
                ))}
              </>
            )}
          </select>
        </label>
        {artistValue != '' && allAlbums && allAlbums.albums.length > 0 && (
          <label className="select" htmlFor="album">
            Album (optional):
            <select
              name="album"
              id="album"
              value={albumValue}
              onChange={handleAlbumChange}
            >
              <option value={''}>Select album</option>
              {allAlbums.albums.map(({ title, _id }) => (
                <option key={_id} value={_id}>
                  {title}
                </option>
              ))}
            </select>
          </label>
        )}
        {allGenre && (
          <fieldset className="fieldset">
            <legend>Genre</legend>
            {allGenre.map(({ name, _id }) => (
              <label key={_id} htmlFor={_id}>
                <input
                  type="checkbox"
                  name={name}
                  id={_id}
                  checked={genreValues.includes(_id)}
                  onChange={(e) => handleGenreChange(e, _id)}
                />
                {name}
              </label>
            ))}
          </fieldset>
        )}
        <button className="submit-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
