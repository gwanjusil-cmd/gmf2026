import { useEffect, useRef, useState } from "react";
import { loadYoutubeApi, turnOffCaptions, youtubeId } from "../lib/youtube";

type VideoBackgroundProps = {
  src: string;
  tone: string;
  className?: string;
  playback?: "always" | "visible";
};

function youtubeEmbedUrl(src: string) {
  const id = youtubeId(src);
  if (!id) return null;

  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    controls: "0",
    loop: "1",
    playlist: id,
    playsinline: "1",
    rel: "0",
    modestbranding: "1",
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
}: VideoBackgroundProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const embed = youtubeEmbedUrl(src);
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

    void loadYoutubeApi()
      .then(() => {
        if (cancelled || !frameRef.current || !window.YT) return;
        new window.YT.Player(frameRef.current, {
          events: {
            onReady: (event) => turnOffCaptions(event.target),
            onStateChange: (event) => turnOffCaptions(event.target),
            onApiChange: (event) => turnOffCaptions(event.target),
          },
        });
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, [embed, visible]);

  const layerClass = ["video-layer", embed ? "has-embed" : "", className ?? ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={rootRef}
      className={layerClass}
      style={{ backgroundImage: tone }}
      aria-hidden="true"
    >
      {embed && visible ? (
        <iframe
          ref={frameRef}
          className="video-layer__youtube"
          src={embed}
          title="배경 영상"
          allow="autoplay; encrypted-media; picture-in-picture"
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
