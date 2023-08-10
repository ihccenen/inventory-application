import { useState, useEffect } from 'react';
import getAllArtists from '../lib/artist/getAllArtists';
import getAllGenres from '../lib/genre/getAllGenres';

type AlbumFormProps = {
  titleValue: string;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  artistValue: string;
  handleArtistChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  genreValues: string[];
  handleGenreChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
};

export default function AlbumForm({
  titleValue,
  handleTitleChange,
  artistValue,
  handleArtistChange,
  genreValues,
  handleGenreChange,
  handleSubmit,
}: AlbumFormProps) {
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
  const [allGenre, setAllGenre] = useState<
    [{ name: string; _id: string }] | null
  >(null);

  useEffect(() => {
    getAllArtists()
      .then(setAllArtists)
      .catch((err) => setError(err.message));

    getAllGenres()
      .then(setAllGenre)
      .catch((err) => setError(err.message));
  }, []);

  return (
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
          required
          value={artistValue}
          onChange={handleArtistChange}
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
  );
}
