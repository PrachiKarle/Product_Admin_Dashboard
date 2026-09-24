import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="rounded-xl bg-white p-8 text-center shadow-sm">
        <h1 className="text-4xl font-bold text-gray-900">
          Product Not Found
        </h1>

        <p className="mt-3 text-gray-500">
          The product you are looking for does not exist.
        </p>

        <Link
          href="/products"
          className="mt-6 inline-block rounded-lg bg-black px-5 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Back to Products
        </Link>
      </div>
    </main>
  );
}