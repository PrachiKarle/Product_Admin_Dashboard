"use client";

import { useEffect, useState } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import { isAxiosError } from "axios";

import { getProduct } from "../../services/productService";
import {Product} from "../../types/product"

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProduct(id);

        setProduct(data);
      } catch (error) {
        console.error(error);

        if (
          isAxiosError(error) &&
          error.response?.status === 404
        ) {
          notFound();
          
        }

        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, router]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-500">
          Loading product...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
        <div className="rounded-lg bg-white p-8 text-center shadow-sm">
          <p className="mb-4 text-red-600">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-black px-5 py-2 text-sm text-white"
          >
            Retry
          </button>
        </div>
      </main>
    );
  }

  if (!product) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Product Admin
          </h1>

          <button
            onClick={() => router.push("/products")}
            className="rounded-lg border px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Back to Products
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Product Image */}
            <div>
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-80 w-full rounded-xl object-cover"
              />

              {product.images?.length > 0 && (
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {product.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="h-20 w-full rounded-lg object-cover"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Product Information */}
            <div>
              <p className="text-sm font-medium capitalize text-gray-500">
                {product.category}
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                {product.title}
              </h2>

              <p className="mt-4 text-gray-600">
                {product.description}
              </p>

              <div className="mt-6">
                <p className="text-3xl font-bold text-gray-900">
                  ${product.price}
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">
                    Rating
                  </p>

                  <p className="mt-1 font-semibold">
                    ⭐ {product.rating}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">
                    Stock
                  </p>

                  <p className="mt-1 font-semibold">
                    {product.stock}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="mt-10 border-t pt-8">
            <h3 className="text-xl font-bold text-gray-900">
              Reviews
            </h3>

            {product.reviews &&
            product.reviews.length > 0 ? (
              <div className="mt-4 space-y-4">
                {product.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="rounded-lg border p-4"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-900">
                        {review.reviewerName}
                      </p>

                      <p className="text-sm">
                        ⭐ {review.rating}
                      </p>
                    </div>

                    <p className="mt-2 text-gray-600">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-gray-500">
                No reviews available.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}