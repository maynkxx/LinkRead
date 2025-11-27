import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import { Button } from './ui/Button';

export default function Header() {
  return (
    <header className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-40 transition-colors duration-300">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 transition-colors"
        >
          LinkRead
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
          >
            About
          </Link>
          <Link
            to="/projects"
            className="text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
          >
            Projects
          </Link>

          <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-700 mx-2" />

          <DarkModeToggle />

          <Link to="/signin">
            <Button size="sm">Sign In</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
