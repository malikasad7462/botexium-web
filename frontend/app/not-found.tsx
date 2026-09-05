export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#050816] text-white flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">

        <p className="text-cyan-400 uppercase tracking-[5px] text-sm font-semibold">
          BOTEXIUM Ecosystem
        </p>

        <h1 className="mt-6 text-8xl md:text-9xl font-black hero-title">
          404
        </h1>

        <h2 className="mt-6 text-3xl md:text-4xl font-bold">
          Page Not Found
        </h2>

        <p className="mt-5 text-gray-400 text-lg leading-8">
          The page you are looking for does not exist or may have been moved.
        </p>

        <a
          href="/"
          className="inline-flex premium-btn mt-10"
        >
          Back to Home
        </a>

      </div>
    </main>
  );
}