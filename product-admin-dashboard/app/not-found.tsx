export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="rounded-xl bg-white p-8 text-center shadow-sm">
        <h1 className="text-4xl font-bold text-gray-900">
          404
        </h1>

        <h2 className="mt-2 text-xl font-semibold text-gray-800">
          Page Not Found
        </h2>

        <p className="mt-2 text-gray-500">
          The page you are looking for does not exist.
        </p>

        <a
          href="/products"
          className="mt-6 inline-block rounded-lg bg-black px-5 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Back to products
        </a>
      </div>
    </main>
  );
}