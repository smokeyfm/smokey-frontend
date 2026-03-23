import { useQuery } from "react-query";

import { SC_CONFIG } from "../../config/soundcloud";
import { QueryKeys } from "../queryKeys";
import type { Track } from "../../components/SmokeyBox/types";

/** Shape of a track object returned by the SoundCloud API. */
interface SCTrack {
  id: number;
  title: string;
  user: { username: string };
  stream_url: string;
  artwork_url: string | null;
  duration: number; // milliseconds
}

/** Shape of a playlist object returned by the SoundCloud API. */
interface SCPlaylist {
  tracks: SCTrack[];
}

/** Map raw SC tracks to SmokeyBox Track type. */
function mapTracks(scTracks: SCTrack[]): Track[] {
  return scTracks.map((t) => ({
    id: String(t.id),
    title: t.title,
    artist: t.user.username,
    streamUrl: `${t.stream_url}?client_id=${SC_CONFIG.clientId}`,
    artworkUrl: t.artwork_url ?? undefined,
    duration: Math.round(t.duration / 1000)
  }));
}

/**
 * Fetch all playlists for the configured SoundCloud user and flatten their
 * tracks into a single array mapped to the SmokeyBox `Track` type.
 */
const fetchUserTracks = async (): Promise<Track[]> => {
  const url = `${SC_CONFIG.apiBase}/users/${SC_CONFIG.userId}/playlists?client_id=${SC_CONFIG.clientId}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`SoundCloud API error: ${response.status}`);
  }
  const playlists: SCPlaylist[] = await response.json();
  return playlists.flatMap((playlist) => mapTracks(playlist.tracks));
};

/**
 * Fetch a specific playlist by URL via the SoundCloud /resolve endpoint.
 */
const fetchPlaylistByUrl = async (playlistUrl: string): Promise<Track[]> => {
  const resolveUrl = `${SC_CONFIG.apiBase}/resolve?url=${encodeURIComponent(
    playlistUrl
  )}&client_id=${SC_CONFIG.clientId}`;
  const response = await fetch(resolveUrl);
  if (!response.ok) {
    throw new Error(`SoundCloud API error: ${response.status}`);
  }
  const playlist: SCPlaylist = await response.json();
  return mapTracks(playlist.tracks);
};

/**
 * Custom hook that fetches SoundCloud playlist tracks.
 *
 * When called with no arguments, fetches all playlists for the configured user.
 * When called with a playlist URL, fetches that specific playlist via /resolve.
 */
export const useSoundCloudPlaylist = (playlistUrl?: string) => {
  const queryKey = playlistUrl
    ? [QueryKeys.SOUNDCLOUD_SPOKEN_WORD, playlistUrl]
    : [QueryKeys.SOUNDCLOUD_TRACKS];

  const fetcher = playlistUrl
    ? () => fetchPlaylistByUrl(playlistUrl)
    : fetchUserTracks;

  const { data, isLoading, error } = useQuery<Track[], Error>(
    queryKey,
    fetcher,
    {
      staleTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
      enabled: playlistUrl !== "" // don't fetch if empty string passed
    }
  );

  return {
    tracks: data ?? [],
    isLoading,
    error: error?.message ?? null
  };
};
