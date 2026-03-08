import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, ShoppingCart } from "lucide-react";
import { cn } from "@lib/utils";
import type { Track } from "@components/SmokeyBox/types";

interface ReleaseCardProps {
  product: any;
  imgSrc: string;
  onListen?: (track: Track) => void;
  className?: string;
}

/** Determine format badges from product taxon names or option values. */
function getFormatBadges(product: any): string[] {
  const badges: string[] = [];
  const taxons: string[] = product.attributes?.taxon_names ?? [];
  const name: string = (product.attributes?.name ?? "").toLowerCase();
  const description: string = (
    product.attributes?.description ?? ""
  ).toLowerCase();

  const combined = [...taxons.map((t) => t.toLowerCase()), name, description];
  const text = combined.join(" ");

  if (text.includes("vinyl") || text.includes("lp") || text.includes('12"')) {
    badges.push("Vinyl");
  }
  if (text.includes("cd") || text.includes("compact disc")) {
    badges.push("CD");
  }
  if (
    text.includes("digital") ||
    text.includes("download") ||
    text.includes("mp3") ||
    text.includes("wav") ||
    text.includes("flac")
  ) {
    badges.push("Digital");
  }

  // Default to Digital if nothing matched
  if (badges.length === 0) {
    badges.push("Digital");
  }

  return badges;
}

export const ReleaseCard: React.FC<ReleaseCardProps> = ({
  product,
  imgSrc,
  onListen,
  className
}) => {
  const title = product.attributes?.name ?? "Untitled";
  const slug = product.attributes?.slug ?? "";
  const price = product.attributes?.display_price ?? product.attributes?.price;
  const badges = getFormatBadges(product);

  const handleListen = () => {
    if (!onListen) return;

    const track: Track = {
      id: product.id,
      title,
      artist: "Smokey",
      streamUrl: "",
      artworkUrl: imgSrc,
      duration: 0
    };
    onListen(track);
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-white/10 bg-black/20 backdrop-blur-lg transition-all duration-300",
        "hover:scale-[1.02] hover:border-brand/30 hover:shadow-[0_0_30px_rgba(235,139,139,0.15)]",
        className
      )}
    >
      {/* Album Art */}
      <button
        onClick={handleListen}
        className="relative aspect-square w-full cursor-pointer overflow-hidden border-none bg-transparent p-0 outline-none"
        aria-label={`Listen to ${title}`}
      >
        <Image
          src={imgSrc}
          alt={title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/40">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/90 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 scale-75">
            <Play className="h-5 w-5 fill-white text-white" />
          </div>
        </div>
      </button>

      {/* Info */}
      <div className="space-y-3 p-4">
        {/* Title & Artist */}
        <div>
          <h3 className="truncate font-title text-sm font-semibold text-foreground">
            {title}
          </h3>
          <p className="mt-0.5 truncate font-body text-xs text-muted-foreground">
            Smokey
          </p>
        </div>

        {/* Format Badges */}
        <div className="flex flex-wrap gap-1.5">
          {badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleListen}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand/20 px-3 py-2 font-title text-xs font-semibold text-brand transition-all hover:bg-brand/30 cursor-pointer border-none outline-none"
          >
            <Play className="h-3.5 w-3.5" />
            Listen
          </button>
          <Link
            href={`/${slug}`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-title text-xs font-semibold text-foreground transition-all hover:bg-white/10 no-underline"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            {price ? `Buy ${price}` : "Buy"}
          </Link>
        </div>
      </div>
    </div>
  );
};
