import React, { useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Music2, Disc3, Volume2 } from "lucide-react";
import { cn } from "@lib/utils";
import { Layout } from "@components/Layout";
import { Loading } from "@components/Loading";
import { usePlayer } from "@components/SmokeyBox";
import type { Track } from "@components/SmokeyBox/types";
import { useProducts } from "@hooks/useProducts";
import { ReleaseCard } from "./ReleaseCard";
import { ReleaseGrid } from "./ReleaseGrid";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const defaultImg =
  "https://static-assets.strikinglycdn.com/images/ecommerce/ecommerce-default-image.png";

/** Resolve the primary image URL for a product from the included data. */
function resolveImageUrl(product: any, included: any[]): string {
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

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const Music: React.FC = () => {
  const { state, dispatch } = usePlayer();
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: productsData, isLoading, error } = useProducts(1);

  const handleListen = useCallback(
    (track: Track) => {
      dispatch({ type: "QUEUE_TRACK", payload: track });
      if (!state.isPlaying) {
        dispatch({ type: "SET_PLAYING", payload: true });
      }
    },
    [dispatch, state.isPlaying]
  );

  if (isLoading) {
    return (
      <Layout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loading />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-5">
          <Music2 className="h-12 w-12 text-muted-foreground" />
          <p className="font-body text-sm text-muted-foreground">
            Unable to load releases. Please try again later.
          </p>
        </div>
      </Layout>
    );
  }

  const products = productsData?.data ?? [];
  const included = productsData?.included ?? [];
  const featuredProduct = products[0];
  const newReleases = products.slice(0, 8);

  return (
    <Layout>
      <div className="min-h-screen w-full">
        {/* ---------------------------------------------------------------- */}
        {/* Hero Section                                                      */}
        {/* ---------------------------------------------------------------- */}
        <section className="relative flex flex-col items-center justify-center px-5 pb-12 pt-20 text-center sm:pt-28">
          <h1 className="font-display text-title-xxl tracking-tight text-foreground sm:text-[96px] sm:leading-[1]">
            Music
          </h1>
          <p className="mt-4 max-w-md font-body text-base text-muted-foreground sm:text-lg">
            Explore releases, queue tracks to SmokeyBox, and shop exclusive
            pressings.
          </p>

          {/* Decorative ambient glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-[120px]" />
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Now Playing Indicator                                             */}
        {/* ---------------------------------------------------------------- */}
        {state.isPlaying && state.currentTrack && (
          <div className="mx-auto mb-8 flex max-w-[1400px] items-center gap-3 rounded-xl border border-brand/20 bg-brand/5 px-5 py-3 backdrop-blur-lg sm:mx-5 md:mx-10 lg:mx-auto">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/20">
              <Volume2 className="h-4 w-4 animate-live-pulse text-brand" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-title text-xs font-semibold text-brand">
                Now Playing
              </p>
              <p className="truncate font-body text-xs text-foreground">
                {state.currentTrack.title}{" "}
                <span className="text-muted-foreground">
                  &mdash; {state.currentTrack.artist}
                </span>
              </p>
            </div>
          </div>
        )}

        <div className="mx-auto max-w-[1400px] space-y-16 px-5 pb-20 sm:px-5 md:px-10">
          {/* ---------------------------------------------------------------- */}
          {/* Featured Release Spotlight                                       */}
          {/* ---------------------------------------------------------------- */}
          {featuredProduct && (
            <section>
              <h2 className="mb-6 font-title text-title-md text-foreground">
                Featured Release
              </h2>
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20 backdrop-blur-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  {/* Large artwork */}
                  <div className="relative aspect-square">
                    <Image
                      src={resolveImageUrl(featuredProduct, included)}
                      alt={
                        featuredProduct.attributes?.name ?? "Featured Release"
                      }
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      priority
                    />
                  </div>

                  {/* Details */}
                  <div className="flex flex-col justify-center space-y-5 p-6 sm:p-10">
                    <div>
                      <p className="mb-1 font-mono text-xs uppercase tracking-widest text-brand">
                        Featured
                      </p>
                      <h3 className="font-display text-title-xl text-foreground">
                        {featuredProduct.attributes?.name}
                      </h3>
                      <p className="mt-1 font-body text-sm text-muted-foreground">
                        Smokey
                      </p>
                    </div>

                    {featuredProduct.attributes?.description && (
                      <p className="line-clamp-3 font-body text-sm leading-relaxed text-muted-foreground">
                        {featuredProduct.attributes.description.replace(
                          /<[^>]*>/g,
                          ""
                        )}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() =>
                          handleListen({
                            id: featuredProduct.id,
                            title:
                              featuredProduct.attributes?.name ?? "Untitled",
                            artist: "Smokey",
                            streamUrl: "",
                            artworkUrl: resolveImageUrl(
                              featuredProduct,
                              included
                            ),
                            duration: 0
                          })
                        }
                        className="flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 font-title text-sm font-semibold text-white transition-all hover:bg-brand-bright cursor-pointer border-none outline-none"
                      >
                        <Play className="h-4 w-4 fill-white" />
                        Listen Now
                      </button>
                      <Link
                        href={`/${featuredProduct.attributes?.slug ?? ""}`}
                        className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-2.5 font-title text-sm font-semibold text-foreground transition-all hover:bg-white/10 no-underline"
                      >
                        <Disc3 className="h-4 w-4" />
                        View Release
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ---------------------------------------------------------------- */}
          {/* New Releases Carousel                                            */}
          {/* ---------------------------------------------------------------- */}
          {newReleases.length > 0 && (
            <section>
              <h2 className="mb-6 font-title text-title-md text-foreground">
                New Releases
              </h2>
              <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto pb-4 scrollbar-none"
              >
                {newReleases.map((product: any) => (
                  <div key={product.id} className="w-52 flex-shrink-0">
                    <ReleaseCard
                      product={product}
                      imgSrc={resolveImageUrl(product, included)}
                      onListen={handleListen}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ---------------------------------------------------------------- */}
          {/* Full Catalog Grid                                                */}
          {/* ---------------------------------------------------------------- */}
          <section>
            <h2 className="mb-6 font-title text-title-md text-foreground">
              All Releases
            </h2>
            <ReleaseGrid products={productsData} onListen={handleListen} />
          </section>
        </div>
      </div>
    </Layout>
  );
};
