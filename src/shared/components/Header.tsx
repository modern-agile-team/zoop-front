import { Link } from '@tanstack/react-router';

export default function Header() {
  return (
    <header className="p-4 flex gap-4 bg-white text-black justify-between">
      <nav className="flex flex-row">
        <div className="px-4 font-bold">
          <Link to="/">Home</Link>
        </div>
      </nav>
    </header>
  );
}
