"use client";

import { useEffect, useState } from "react";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import { useAuth } from "../context/AuthContext";
import { getProducts } from "../services/productService";
import { Product } from "../types/product";

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    isAuthenticated,
    loading: authLoading,
    logout,
  } = useAuth();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [invalidUrl, setInvalidUrl] = useState(false);

  const [total, setTotal] = useState(0);

  /*
   * Get page from URL
   *
   * /products              -> page 1
   * /products?page=2       -> page 2
   * /products?page=abc     -> invalid
   * /products?page=-1      -> invalid
   */
  const rawPage = searchParams.get("page");

  const pageParam =
    rawPage === null ? 1 : Number(rawPage);

  const isInvalidPage =
    rawPage !== null &&
    (!Number.isInteger(pageParam) || pageParam < 1);

  const page = pageParam;

  /*
   * Get page size from URL
   *
   * Allowed values: 10, 20, 50
   */
  const rawPageSize = searchParams.get("pageSize");

  const pageSizeParam =
    rawPageSize === null
      ? 10
      : Number(rawPageSize);

  const isInvalidPageSize =
    rawPageSize !== null &&
    ![10, 20, 50].includes(pageSizeParam);

  const pageSize = pageSizeParam;

  const totalPages = Math.ceil(
    total / pageSize
  );

  // Calculate API skip value
  const skip = (page - 1) * pageSize;

  // Fetch products
  const fetchProducts = async () => {
    // Don't call API if URL itself is invalid
    if (isInvalidPage || isInvalidPageSize) {
      setInvalidUrl(true);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setInvalidUrl(false);

      const data = await getProducts(
        pageSize,
        skip
      );

      setProducts(data.products);
      setTotal(data.total);

      /*
       * Check if page exists.
       *
       * Example:
       * total = 194
       * pageSize = 10
       * totalPages = 20
       *
       * ?page=999 -> invalid
       */
      const calculatedTotalPages = Math.ceil(
        data.total / pageSize
      );

      if (
        calculatedTotalPages > 0 &&
        page > calculatedTotalPages
      ) {
        setInvalidUrl(true);
        setProducts([]);
        return;
      }

      setInvalidUrl(false);
    } catch (error) {
      console.error(error);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch when URL values change
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      fetchProducts();
    }
  }, [
    authLoading,
    isAuthenticated,
    page,
    pageSize,
  ]);

  // Protect products page
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [
    authLoading,
    isAuthenticated,
    router,
  ]);

  // Update page in URL
  const handlePageChange = (
    newPage: number
  ) => {
    if (
      newPage < 1 ||
      (totalPages > 0 &&
        newPage > totalPages)
    ) {
      return;
    }

    const params = new URLSearchParams(
      searchParams.toString()
    );

    params.set("page", String(newPage));
    params.set("pageSize", String(pageSize));

    router.push(
      `/products?${params.toString()}`
    );
  };

  // Update page size in URL
  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newPageSize = Number(
      event.target.value
    );

    const params = new URLSearchParams(
      searchParams.toString()
    );

    // Reset to page 1
    params.set("page", "1");
    params.set(
      "pageSize",
      String(newPageSize)
    );

    router.push(
      `/products?${params.toString()}`
    );
  };

  // Logout
  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  // Showing range
  const startItem =
    products.length === 0
      ? 0
      : (page - 1) * pageSize + 1;

  const endItem = Math.min(
    page * pageSize,
    total
  );

  // Authentication loading
  if (authLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">
          Checking authentication...
        </p>
      </main>
    );
  }

  // Don't show products if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Invalid URL fallback
  if (invalidUrl) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-5xl font-bold text-gray-900">
            404
          </h1>

          <h2 className="mt-3 text-xl font-semibold text-gray-800">
            Page Not Found
          </h2>

          <p className="mt-2 text-gray-500">
            The page or URL parameter you entered
            is invalid.
          </p>

          <button
            onClick={() =>
              router.push("/products")
            }
            className="mt-6 rounded-lg bg-black px-5 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Back to Products
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Product Admin
          </h1>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Logout
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-8">
        {/* Heading */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Products
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Manage your products
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <p className="text-gray-500">
              Loading products...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-lg bg-white p-8 text-center shadow-sm">
            <p className="mb-4 text-red-600">
              {error}
            </p>

            <button
              onClick={fetchProducts}
              className="rounded-lg bg-black px-5 py-2 text-sm text-white hover:bg-gray-800"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading &&
          !error &&
          products.length === 0 && (
            <div className="rounded-lg bg-white p-8 text-center shadow-sm">
              <p className="text-gray-500">
                No products found.
              </p>
            </div>
          )}

        {/* Products */}
        {!loading &&
          !error &&
          products.length > 0 && (
            <>
              {/* Desktop table */}
              <div className="hidden overflow-x-auto rounded-lg bg-white shadow-sm md:block">
                <table className="w-full">
                  <thead className="border-b bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-black">
                        Product
                      </th>

                      <th className="px-6 py-4 text-left text-sm font-semibold text-black">
                        Category
                      </th>

                      <th className="px-6 py-4 text-left text-sm font-semibold text-black">
                        Price
                      </th>

                      <th className="px-6 py-4 text-left text-sm font-semibold text-black">
                        Rating
                      </th>

                      <th className="px-6 py-4 text-left text-sm font-semibold text-black">
                        Stock
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {products.map((product) => (
                      <tr
                        key={product.id}
                        className="border-b last:border-b-0 hover:bg-gray-50"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={product.thumbnail}
                              alt={product.title}
                              className="h-14 w-14 rounded-lg object-cover"
                            />

                            <span className="font-medium text-gray-900">
                              {product.title}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {product.category}
                        </td>

                        <td className="px-6 py-4 text-sm font-medium text-black">
                          ${product.price}
                        </td>

                        <td className="px-6 py-4 text-sm text-black">
                          ⭐ {product.rating}
                        </td>

                        <td className="px-6 py-4 text-sm text-black">
                          {product.stock}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="space-y-4 md:hidden">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="rounded-lg bg-white p-4 shadow-sm"
                  >
                    <div className="flex gap-4">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="h-20 w-20 rounded-lg object-cover"
                      />

                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {product.title}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          {product.category}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-3 border-t pt-4">
                      <div>
                        <p className="text-xs text-gray-500">
                          Price
                        </p>

                        <p className="font-medium text-black">
                          ${product.price}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">
                          Rating
                        </p>

                        <p className="font-medium">
                          ⭐ {product.rating}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">
                          Stock
                        </p>

                        <p className="font-medium">
                          {product.stock}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-6 flex flex-col gap-4 rounded-lg bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-gray-600">
                  Showing {startItem}–{endItem} of{" "}
                  {total}
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Page size */}
                  <select
                    value={pageSize}
                    onChange={
                      handlePageSizeChange
                    }
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600"
                  >
                    <option value={10}>
                      10
                    </option>

                    <option value={20}>
                      20
                    </option>

                    <option value={50}>
                      50
                    </option>
                  </select>

                  {/* Previous */}
                  <button
                    onClick={() =>
                      handlePageChange(
                        page - 1
                      )
                    }
                    disabled={page === 1}
                    className="rounded-lg border px-3 py-2 text-sm text-gray-600 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Previous
                  </button>

                  {/* Page numbers */}
                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() =>
                        handlePageChange(
                          pageNumber
                        )
                      }
                      className={`rounded-lg px-3 py-2 text-sm ${
                        pageNumber === page
                          ? "bg-black text-white"
                          : "border bg-white hover:bg-gray-50"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ))}

                  {/* Next */}
                  <button
                    onClick={() =>
                      handlePageChange(
                        page + 1
                      )
                    }
                    disabled={
                      page === totalPages
                    }
                    className="rounded-lg border px-3 py-2 text-sm text-gray-600 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
      </section>
    </main>
  );
}