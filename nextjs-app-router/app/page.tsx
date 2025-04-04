import Image from "next/image";
import Link from 'next/link'

export default function Home() {
  return (
    <main>
    <div className="container mx-auto">
      <h1 className="font-bold text-2xl">Home Page</h1>
    </div>
    <Link href={`/about`}> go to about</Link>
    </main>
  );
}
