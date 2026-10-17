import { useEffect, useRef, useState, type CSSProperties } from "react";
import { loadYoutubeApi, turnOffCaptions, youtubeId } from "../lib/youtube";

type VideoBackgroundProps = {
  src: string;
  tone: string;
  className?: string;
  playback?: "always" | "visible";
  frame?: {
    scale: number;
    raise: number;
  };
};

function youtubeEmbedUrl(id: string) {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    controls: "0",
    playsinline: "1",
    rel: "0",
    iv_load_policy: "3",
    disablekb: "1",
    fs: "0",
    cc_load_policy: "0",
    enablejsapi: "1",
    origin: window.location.origin,
  });

  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
}

export function VideoBackground({
  src,
  tone,
  className,
  playback = "always",
  frame,
}: VideoBackgroundProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const id = youtubeId(src);
  const embed = id ? youtubeEmbedUrl(id) : null;
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [visible, setVisible] = useState(playback === "always");

  useEffect(() => {
    setReady(false);
    setFailed(false);
  }, [src]);

  useEffect(() => {
    if (playback === "always") {
      setVisible(true);
      return;
    }

    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = Boolean(entry?.isIntersecting);
        setVisible(inView);
        if (embed || !videoRef.current) return;
        if (inView) void videoRef.current.play().catch(() => undefined);
        else videoRef.current.pause();
      },
      { threshold: 0.45 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [embed, playback, src]);

  useEffect(() => {
    if (!embed || !visible) return;
    const frame = frameRef.current;
    if (!frame) return;

    let cancelled = false;
    let resumes = 0;
    let rewinding = false;
    let player: Parameters<typeof turnOffCaptions>[0] | null = null;

    const timer = window.setInterval(() => {
      if (!player) return;
      try {
        const duration = player.getDuration();
        const time = player.getCurrentTime();
        if (rewinding) {
          if (time < 1) rewinding = false;
          return;
        }
        if (duration > 1 && duration - time < 0.45) {
          rewinding = true;
          player.seekTo(0, true);
        }
      } catch {
        // The player is not ready to report a time yet.
      }
    }, 250);

    void loadYoutubeApi()
      .then(() => {
        if (cancelled || !frameRef.current || !window.YT) return;
        new window.YT.Player(frameRef.current, {
          events: {
            onReady: (event) => {
              player = event.target;
              try {
                event.target.mute();
                event.target.playVideo();
              } catch {
                // Playback can start only after the player is ready.
              }
            },
            onStateChange: (event) => {
              player = event.target;
              turnOffCaptions(event.target);
              if (event.data === 1) {
                resumes = 0;
                return;
              }
              if (event.data === 0) {
                try {
                  event.target.seekTo(0, true);
                  event.target.playVideo();
                } catch {
                  // The player can reject a seek before it has metadata.
                }
                return;
              }
              if (event.data !== 2 && event.data !== 5 && event.data !== -1) return;
              if (resumes > 8) return;
              resumes += 1;
              try {
                event.target.mute();
                event.target.playVideo();
              } catch {
                // Playback can start only after the player is ready.
              }
            },
            onApiChange: (event) => turnOffCaptions(event.target),
          },
        });
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [embed, visible]);

  const layerClass = ["video-layer", embed ? "has-embed" : "", className ?? ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={rootRef}
      className={layerClass}
      style={
        {
          backgroundImage: tone,
          "--video-scale": frame?.scale ?? 1.55,
          "--video-raise": `${frame?.raise ?? 0}%`,
        } as CSSProperties
      }
      aria-hidden="true"
    >
      {embed && visible ? (
        <iframe
          ref={frameRef}
          className="video-layer__youtube"
          src={embed}
          title="배경 영상"
          allow="autoplay; encrypted-media"
          referrerPolicy="strict-origin-when-cross-origin"
          tabIndex={-1}
        />
      ) : null}
      {!embed && !failed ? (
        <video
          ref={videoRef}
          className={
            ready ? "video-layer__media is-ready" : "video-layer__media"
          }
          src={src}
          autoPlay={playback === "always"}
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setReady(true)}
          onError={() => setFailed(true)}
        />
      ) : null}
    </div>
  );
}
