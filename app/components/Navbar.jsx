import Link from "next/link";
import Image from "next/image";
import Logo from "./yoda.png";
export default function Navbar() {
  return (
    <nav>
      {/* <Image
        src={Logo}
        alt="Yoda Ticketing logo"
        width={75}
        placeholder="blur"
        quality={100}
      /> */}

      <h1>Next.js 14 Headless WP </h1>
      <Link href="/">Home</Link>
      <Link href="/login">Login</Link>
    </nav>
  );
}
