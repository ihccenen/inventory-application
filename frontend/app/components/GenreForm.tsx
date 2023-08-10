type GenreFormProps = {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
};

export default function GenreForm({
  value,
  handleChange,
  handleSubmit,
}: GenreFormProps) {
  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="label" htmlFor="name">
        Name (required):
        <input
          className="input"
          type="text"
          name="name"
          id="name"
          required
          value={value}
          onChange={handleChange}
        />
      </label>
      <button className="submit-btn" type="submit">
        Submit
      </button>
    </form>
  );
}
