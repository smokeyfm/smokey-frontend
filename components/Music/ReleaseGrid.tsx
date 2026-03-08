import React, { useState, useMemo } from "react";
import { cn } from "@lib/utils";
import { ReleaseCard } from "./ReleaseCard";
import type { Track } from "@components/SmokeyBox/types";

type FilterOption = "all" | "vinyl" | "cd" | "digital";
type SortOption = "newest" | "featured";

interface ReleaseGridProps {
  products: any;
  onListen?: (track: Track) => void;
}

const FILTER_OPTIONS: { key: FilterOption; label: string }[] = [
  { key: "all", label: "All" },
  { key: "vinyl", label: "Vinyl" },
  { key: "cd", label: "CD" },
  { key: "digital", label: "Digital" }
];

const SORT_OPTIONS: { key: SortOption; label: string }[] = [
  { key: "newest", label: "Newest" },
  { key: "featured", label: "Featured" }
];

/** Resolve the primary image URL for a product from the included data. */
function resolveImageUrl(product: any, included: any[]): string {
  const defaultImg =
    "https://static-assets.strikinglycdn.com/images/ecommerce/ecommerce-default-image.png";

  const imageId = product.relationships?.images?.data?.[0]?.id;
  if (!imageId) return defaultImg;

  const allImages = included?.filter((e: any) => e.type === "image") ?? [];
  const found = allImages.find((e: any) => e.id === imageId);
  if (!found) return defaultImg;

  const imgUrl = found.attributes?.styles?.[4]?.url;
  return imgUrl
    ? `${process.env.NEXT_PUBLIC_SPREE_API_URL}${imgUrl}`
    : defaultImg;
}

/** Check if a product matches a format filter. */
function matchesFilter(product: any, filter: FilterOption): boolean {
  if (filter === "all") return true;

  const taxons: string[] = product.attributes?.taxon_names ?? [];
  const name: string = (product.attributes?.name ?? "").toLowerCase();
  const description: string = (
    product.attributes?.description ?? ""
  ).toLowerCase();
  const combined = [
    ...taxons.map((t: string) => t.toLowerCase()),
    name,
    description
  ].join(" ");

  switch (filter) {
    case "vinyl":
      return (
        combined.includes("vinyl") ||
        combined.includes("lp") ||
        combined.includes('12"')
      );
    case "cd":
      return combined.includes("cd") || combined.includes("compact disc");
    case "digital":
      return (
        combined.includes("digital") ||
        combined.includes("download") ||
        combined.includes("mp3") ||
        combined.includes("wav") ||
        combined.includes("flac")
      );
    default:
      return true;
  }
}

export const ReleaseGrid: React.FC<ReleaseGridProps> = ({
  products,
  onListen
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("all");
  const [activeSort, setActiveSort] = useState<SortOption>("newest");

  const productList = products?.data ?? [];
  const included = products?.included ?? [];

  const filteredProducts = useMemo(() => {
    let result = productList.filter((p: any) => matchesFilter(p, activeFilter));

    if (activeSort === "newest") {
      result = [...result].sort(
        (a: any, b: any) =>
          new Date(b.attributes?.created_at ?? 0).getTime() -
          new Date(a.attributes?.created_at ?? 0).getTime()
      );
    }
    // "featured" keeps the default API order

    return result;
  }, [productList, activeFilter, activeSort]);

  return (
    <section className="w-full">
      {/* Filter + Sort Bar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Format Filters */}
        <div className="flex flex-wrap gap-2">
          {FILTER_OPTIONS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={cn(
                "cursor-pointer rounded-full border px-4 py-1.5 font-title text-xs font-semibold transition-all outline-none",
                activeFilter === key
                  ? "border-brand bg-brand/20 text-brand"
                  : "border-white/10 bg-white/5 text-muted-foreground hover:border-white/20 hover:text-foreground"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="font-body text-xs text-muted-foreground">Sort:</span>
          {SORT_OPTIONS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveSort(key)}
              className={cn(
                "cursor-pointer rounded-full border px-3 py-1 font-title text-xs transition-all outline-none",
                activeSort === key
                  ? "border-brand/50 bg-brand/10 text-brand"
                  : "border-white/10 bg-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {filteredProducts.map((product: any) => (
            <ReleaseCard
              key={product.id}
              product={product}
              imgSrc={resolveImageUrl(product, included)}
              onListen={onListen}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-black/20 px-5 py-16 text-center backdrop-blur-lg">
          <h3 className="mb-2 font-title text-base text-foreground">
            No releases found
          </h3>
          <p className="font-body text-sm text-muted-foreground">
            Try a different filter.
          </p>
        </div>
      )}
    </section>
  );
};
