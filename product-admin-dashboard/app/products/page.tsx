import { Suspense } from "react";
import ProductsPage from "./productPage";

export default function ProductsPageWrapper() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading products...
        </div>
      }
    >
      <ProductsPage />
    </Suspense>
  );
}