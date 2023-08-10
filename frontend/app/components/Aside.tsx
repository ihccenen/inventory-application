import Link from 'next/link';
import styles from './Aside.module.css';

export default function Aside() {
  return (
    <aside className="aside">
      <Link href="/">Home</Link>
      <ul className="aside-links">
        <li>
          <Link href="/artists">Artists</Link>
        </li>
        <li>
          <Link href="/albums">Albums</Link>
        </li>
        <li>
          <Link href="/tracks">Tracks</Link>
        </li>
        <li>
          <Link href="/genres">Genres</Link>
        </li>
      </ul>
      <ul className="aside-links">
        <li>
          <Link href="/artists/create">Create Artist</Link>
        </li>
        <li>
          <Link href="/albums/create">Create Album</Link>
        </li>
        <li>
          <Link href="/tracks/create">Create Track</Link>
        </li>
        <li>
          <Link href="/genres/create">Create Genre</Link>
        </li>
      </ul>
    </aside>
  );
}
