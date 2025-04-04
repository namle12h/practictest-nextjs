import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-md py-1 fixed top-0 left-0 right-0 z-90 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-2xl font-semibold text-gray-800">
          <Link href="/"> <span className="text-amber-300 text-2xl">Q</span>TECH</Link>
        </div>
        <nav>
          <ul className="flex gap-x-6 text-gray-600">
            <li >
              <Link className="hover:to-blue-500" href="/">Home</Link>
            </li>
            <li >
              <Link className="hover:to-blue-500" href="/about">About</Link>
            </li>
            <li >
              <Link className="hover:to-blue-500" href="/blog">Blog</Link>
            </li>
           
            <li  >
              <Link  className="hover:to-blue-500" href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
