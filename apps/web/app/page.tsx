import Link from "next/link";

function NavButton({ href, label, color }: { href: string; label: string; color: string }) {
  return (
    <Link href={href}>
      <span
        className={`block w-full text-center ${color} text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition duration-200`}
      >
        {label}
      </span>
    </Link>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center px-6 py-12">
      <main className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-10 w-full max-w-lg text-center border border-blue-200">
        <h1 className="text-4xl font-extrabold text-blue-800 mb-4">Full Stack Playwright Demo</h1>
        <p className="text-gray-600 mb-8">
          Navigate through the app using the buttons below.
        </p>
        <nav role="navigation" aria-label="Main Navigation">
          <div className="flex flex-col gap-4">
            <NavButton href="/users" label="Manage Users" color="bg-blue-600" />
            <NavButton href="/posts" label="View Posts" color="bg-green-600" />
          </div>
        </nav>
      </main>
    </div>
  );
}
