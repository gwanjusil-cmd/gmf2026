export function youtubeId(src: string) {
  if (!src) return null;

  try {
    const url = new URL(src);
    const host = url.hostname.replace(/^www\./, "");
    if (host === "youtu.be") {
      return url.pathname.split("/").filter(Boolean)[0] ?? null;
    }
    if (
      host === "youtube.com" ||
      host === "m.youtube.com" ||
      host === "music.youtube.com"
    ) {
      if (url.pathname === "/watch") return url.searchParams.get("v");
      const parts = url.pathname.split("/").filter(Boolean);
      if (parts[0] === "embed" || parts[0] === "shorts") return parts[1] ?? null;
    }
  } catch {
    return null;
  }

  return null;
}

export type YoutubePlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  loadVideoById: (videoId: string) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  destroy: () => void;
  unloadModule: (name: string) => void;
  setOption: (module: string, option: string, value: object) => void;
};

type YoutubePlayerOptions = {
  width?: number;
  height?: number;
  playerVars?: Record<string, string | number>;
  events?: {
    onReady?: (event: { target: YoutubePlayer }) => void;
    onStateChange?: (event: { data: number; target: YoutubePlayer }) => void;
    onApiChange?: (event: { target: YoutubePlayer }) => void;
    onError?: () => void;
  };
};

declare global {
  interface Window {
    YT?: {
      Player: new (
        element: HTMLElement,
        options: YoutubePlayerOptions,
      ) => YoutubePlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

let youtubeApi: Promise<void> | null = null;

export function loadYoutubeApi() {
  if (window.YT?.Player) return Promise.resolve();
  if (youtubeApi) return youtubeApi;

  youtubeApi = new Promise((resolve, reject) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve();
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.onerror = () => {
      youtubeApi = null;
      reject(new Error("youtube"));
    };
    document.head.appendChild(script);
  });

  return youtubeApi;
}

export function turnOffCaptions(player: YoutubePlayer) {
  try {
    player.setOption("captions", "track", {});
  } catch {
    // The captions module is not available yet.
  }
  try {
    player.unloadModule("captions");
  } catch {
    // The captions module is not available yet.
  }
}
