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

/**
 * Fetch all playlists for the configured SoundCloud user and flatten their
 * tracks into a single array mapped to the SmokeyBox `Track` type.
 */
const fetchSoundCloudTracks = async (): Promise<Track[]> => {
  const url = `${SC_CONFIG.apiBase}/users/${SC_CONFIG.userId}/playlists?client_id=${SC_CONFIG.clientId}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`SoundCloud API error: ${response.status}`);
  }

  const playlists: SCPlaylist[] = await response.json();

  const tracks: Track[] = playlists.flatMap((playlist) =>
    playlist.tracks.map((t) => ({
      id: String(t.id),
      title: t.title,
      artist: t.user.username,
      streamUrl: `${t.stream_url}?client_id=${SC_CONFIG.clientId}`,
      artworkUrl: t.artwork_url ?? undefined,
      duration: Math.round(t.duration / 1000) // convert ms -> seconds
    }))
  );

  return tracks;
};

/**
 * Custom hook that fetches SoundCloud playlist tracks for the configured user.
 *
 * Returns the tracks mapped to the SmokeyBox `Track` type, along with loading
 * and error state.
 */
export const useSoundCloudPlaylist = () => {
  const { data, isLoading, error } = useQuery<Track[], Error>(
    [QueryKeys.SOUNDCLOUD_TRACKS],
    fetchSoundCloudTracks,
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false
    }
  );

  return {
    tracks: data ?? [],
    isLoading,
    error: error?.message ?? null
  };
};
