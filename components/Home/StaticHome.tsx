import React from "react";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import Link from "next/link";
import { Volume2, Radio, ArrowRight } from "lucide-react";
import { Layout } from "../Layout";
import { NotifyForm } from "../NotifyForm";
import { StreamList } from "../StreamList";
import { BlurFade } from "@components/ui";
import {
  fetchStreams,
  fetchProducts,
  useProducts,
  useStreams
} from "../../hooks/index";
import { usePlayer } from "@components/SmokeyBox";
import Hero from "./Hero";
import Products from "./Products";
import { Loading } from "../Loading";

export const StaticHome = (props: any) => {
  const { state, dispatch } = usePlayer();

  const {
    error: productsError,
    data: productsData,
    isLoading: productsAreLoading
  }: any = useProducts(1);

  const {
    error: streamsError,
    data: streamsData,
    isLoading: streamsAreLoading
  }: any = useStreams(1);

  if (productsAreLoading || streamsAreLoading) return <Loading />;
  if (productsError || streamsError) return <Loading />;

  const streams = streamsData?.response_data || [];

  return (
    <Layout>
      {/* ------------------------------------------------------------------ */}
      {/* 1. Hero  --  minimal logo + tagline, CityMorph breathes through    */}
      {/* ------------------------------------------------------------------ */}
      <Hero />

      <div className="section-container space-y-12 pb-20 pt-4 sm:space-y-16">
        {/* ---------------------------------------------------------------- */}
        {/* 2. Now Playing  --  glass card with current track info            */}
        {/* ---------------------------------------------------------------- */}
        {state.currentTrack && (
          <BlurFade delay={0.1} inView>
            <div className="glass-card mx-auto max-w-2xl px-5 py-4 sm:px-6">
              <div className="flex items-center gap-4">
                {/* Artwork thumbnail */}
                {state.currentTrack.artworkUrl && (
                  <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg">
                    <img
                      src={state.currentTrack.artworkUrl}
                      alt={state.currentTrack.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                {/* Pulsing icon */}
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand/20">
                  <Volume2 className="h-5 w-5 animate-live-pulse text-brand" />
                </div>

                {/* Track details */}
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-xs uppercase tracking-widest text-brand">
                    Now Playing
                  </p>
                  <p className="mt-0.5 truncate font-title text-sm text-foreground">
                    {state.currentTrack.title}
                  </p>
                  <p className="truncate font-body text-xs text-muted-foreground">
                    {state.currentTrack.artist}
                  </p>
                </div>

                {/* Listen / expand player */}
                <button
                  onClick={() => dispatch({ type: "TOGGLE_EXPANDED" })}
                  className="flex-shrink-0 rounded-lg border border-white/10 bg-white/5 px-4 py-2 font-title text-xs font-semibold text-foreground transition-all hover:bg-white/10 cursor-pointer"
                >
                  Listen
                </button>
              </div>
            </div>
          </BlurFade>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* 3. Featured Music                                                */}
        {/* ---------------------------------------------------------------- */}
        {productsData && (
          <BlurFade delay={0.15} inView>
            <section className="glass-card p-5 sm:p-8">
              <Products
                products={productsData}
                title="New Music"
                limit={4}
                href="/music"
                ctaLabel="View All Music"
              />
            </section>
          </BlurFade>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* 4. Featured Merch                                                */}
        {/* ---------------------------------------------------------------- */}
        {productsData && (
          <BlurFade delay={0.2} inView>
            <section className="glass-card p-5 sm:p-8">
              <Products
                products={productsData}
                title="Merch & Swag"
                limit={6}
                href="/browse"
                ctaLabel="Shop All"
              />
            </section>
          </BlurFade>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* 5. Live Stream                                                   */}
        {/* ---------------------------------------------------------------- */}
        {streams.length > 0 && (
          <BlurFade delay={0.25} inView>
            <section className="glass-card overflow-hidden p-5 sm:p-8">
              <div className="mb-6 flex items-baseline justify-between">
                <h2 className="font-display text-title-lg text-foreground sm:text-title-xl">
                  Live Streams
                </h2>
                <Link
                  href={`/tv/${streams[0]?.playback_ids?.[0] || ""}`}
                  className="flex items-center gap-1 text-sm text-brand no-underline transition-colors hover:underline"
                >
                  Watch Now
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Featured stream banner */}
              <Link
                href={`/tv/${streams[0]?.playback_ids?.[0] || ""}`}
                className="group relative flex items-center gap-4 rounded-xl border border-brand/20 bg-brand/5 p-5 no-underline transition-all hover:border-brand/30 hover:bg-brand/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/20">
                  <Radio className="h-6 w-6 text-brand" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-title text-sm font-semibold text-foreground">
                    {streams[0]?.title || "Live Stream"}
                  </p>
                  <p className="mt-0.5 font-body text-xs text-muted-foreground">
                    {streams[0]?.description || "Tune in now"}
                  </p>
                </div>
                <span className="flex-shrink-0 rounded-full bg-brand px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-white">
                  Live
                </span>
              </Link>

              {/* Additional streams */}
              {streams.length > 1 && (
                <div className="mt-4">
                  <StreamList
                    data={streams}
                    title=""
                  />
                </div>
              )}
            </section>
          </BlurFade>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* 6. Newsletter                                                    */}
        {/* ---------------------------------------------------------------- */}
        <BlurFade delay={0.3} inView>
          <section className="glass-card py-8">
            <div className="text-center">
              <h2 className="font-display text-title-lg text-foreground sm:text-title-xl">
                Stay in the Loop
              </h2>
              <p className="mt-2 font-body text-sm text-muted-foreground">
                Get notified about new releases, merch drops, and live streams.
              </p>
            </div>
            <NotifyForm />
          </section>
        </BlurFade>
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["streams", 1], () => fetchStreams(1));
  await queryClient.prefetchQuery(["products", 1], () => fetchProducts(1));
  return { props: { dehydratedState: dehydrate(queryClient) } };
}
