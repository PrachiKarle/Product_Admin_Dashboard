"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "../../services/productService";

export default function AddProductPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const validateForm = () => {
    if (!title.trim()) {
      setError("Title is required.");
      return false;
    }

    if (!price || Number(price) <= 0) {
      setError("Price must be greater than 0.");
      return false;
    }

    if (!category.trim()) {
      setError("Category is required.");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (saving) return;

    setError("");

    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);

      await createProduct({
        title: title.trim(),
        price: Number(price),
        category: category.trim(),
        description: description.trim(),
      });

      router.push("/products");
    } catch (error) {
      console.error(error);
      setError("Failed to add product. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">
            Add Product
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Add a new product to your dashboard.
          </p>

          {error && (
            <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <div className="mt-6 space-y-4">
            {/* Title */}
            <div>
              <label className="mb-1 block text-sm font-medium text-black">
                Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Enter product title"
                className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 text-black"
              />
            </div>

            {/* Price */}
            <div>
              <label className="mb-1 block text-sm font-medium text-black">
                Price
              </label>

              <input
                type="number"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                placeholder="Enter price"
                min="0"
                className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 text-black"
              />
            </div>

            {/* Category */}
            <div>
              <label className="mb-1 block text-sm font-medium text-black">
                Category
              </label>

              <input
                type="text"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                placeholder="Enter category"
                className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 text-black"
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-1 block text-sm font-medium text-black">
                Description
              </label>

              <textarea
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                placeholder="Enter product description"
                rows={5}
                className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 text-black"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="rounded-lg bg-black px-5 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Product"}
              </button>

              <button
                onClick={() => router.push("/products")}
                disabled={saving}
                className="rounded-lg border px-5 py-2 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 texy-black"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}