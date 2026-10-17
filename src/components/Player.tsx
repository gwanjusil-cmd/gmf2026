import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import type { Artist } from "../data/artists";
import {
  loadYoutubeApi,
  turnOffCaptions,
  youtubeId,
  type YoutubePlayer,
} from "../lib/youtube";

type PlayerProps = {
  artist: Artist;
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const whole = Math.floor(seconds);
  const minutes = Math.floor(whole / 60);
  const remain = whole % 60;
  return `${minutes}:${remain.toString().padStart(2, "0")}`;
}

function PlayIcon() {
  return (
    <svg
      className="icon-play"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path d="M6.2 3.6v12.8L16.4 10 6.2 3.6z" fill="currentColor" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M5 3.5h3.1v13H5v-13zm6.9 0H15v13h-3.1v-13z"
        fill="currentColor"
      />
    </svg>
  );
}

function SkipIcon({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d={direction === "prev" ? "M12.8 4.8 7.2 10l5.6 5.2" : "M7.2 4.8 12.8 10 7.2 15.2"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Eq() {
  return (
    <span className="eq" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

const missingLink = "유튜브 링크를 넣어 주세요.";
const playbackError = "이 곡을 재생할 수 없습니다.";

export function Player({ artist }: PlayerProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YoutubePlayer | null>(null);
  const readyRef = useRef(false);
  const pendingRef = useRef<number | null>(null);
  const loadedIdRef = useRef<string | null>(null);
  const trackIndexRef = useRef(0);
  const tracksRef = useRef(artist.tracks);
  const beginRef = useRef<(index: number) => void>(() => {});
  const wantPlayRef = useRef(false);
  const heardPlayRef = useRef(false);
  const resumeRef = useRef(0);
  const [trackIndex, setTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const track = artist.tracks[trackIndex];
  tracksRef.current = artist.tracks;

  beginRef.current = (index: number) => {
    const next = tracksRef.current[index];
    const id = next ? youtubeId(next.src) : null;
    trackIndexRef.current = index;
    setTrackIndex(index);
    setError(null);

    if (!id) {
      pendingRef.current = null;
      loadedIdRef.current = null;
      wantPlayRef.current = false;
      playerRef.current?.pauseVideo();
      setPlaying(false);
      setCurrent(0);
      setDuration(0);
      setError(missingLink);
      return;
    }

    const player = playerRef.current;
    wantPlayRef.current = true;
    heardPlayRef.current = false;
    resumeRef.current = 0;
    if (!player || !readyRef.current) {
      pendingRef.current = index;
      setPlaying(true);
      return;
    }

    if (loadedIdRef.current === id) {
      player.playVideo();
      setPlaying(true);
      return;
    }

    loadedIdRef.current = id;
    setCurrent(0);
    setDuration(0);
    player.loadVideoById(id);
    setPlaying(true);
  };

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    let created: YoutubePlayer | null = null;

    void loadYoutubeApi()
      .then(() => {
        if (cancelled || !hostRef.current || !window.YT) return;
        created = new window.YT.Player(hostRef.current, {
          width: 200,
          height: 200,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            iv_load_policy: 3,
            cc_load_policy: 0,
            origin: window.location.origin,
          },
          events: {
            onReady: () => {
              if (cancelled || !created) return;
              readyRef.current = true;
              playerRef.current = created;
              if (pendingRef.current === null) return;
              const index = pendingRef.current;
              pendingRef.current = null;
              beginRef.current(index);
            },
            onStateChange: (event) => {
              if (cancelled) return;
              turnOffCaptions(event.target);
              if (event.data === 1) {
                heardPlayRef.current = true;
                setPlaying(true);
                setError(null);
                const length = event.target.getDuration();
                if (Number.isFinite(length) && length > 0) setDuration(length);
              }
              if (event.data === 2) {
                const shouldResume =
                  wantPlayRef.current &&
                  heardPlayRef.current &&
                  resumeRef.current < 2;
                if (shouldResume) {
                  resumeRef.current += 1;
                  event.target.playVideo();
                  return;
                }
                setPlaying(false);
              }
              if (event.data === 0) {
                const next = (trackIndexRef.current + 1) % tracksRef.current.length;
                if (next === trackIndexRef.current) {
                  setPlaying(false);
                  return;
                }
                beginRef.current(next);
              }
            },
            onError: () => {
              if (cancelled) return;
              loadedIdRef.current = null;
              setPlaying(false);
              setError(playbackError);
            },
          },
        });
      })
      .catch(() => {
        if (!cancelled) setError(playbackError);
      });

    const timer = window.setInterval(() => {
      const player = playerRef.current;
      if (!readyRef.current || !player) return;
      try {
        const time = player.getCurrentTime();
        const length = player.getDuration();
        if (Number.isFinite(time)) setCurrent(time);
        if (Number.isFinite(length) && length > 0) setDuration(length);
      } catch {
        // Reads can fail while the next video is loading.
      }
    }, 250);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
      readyRef.current = false;
      playerRef.current = null;
      loadedIdRef.current = null;
      created?.destroy();
    };
  }, [artist.id]);

  const toggle = () => {
    if (playing) {
      pendingRef.current = null;
      wantPlayRef.current = false;
      playerRef.current?.pauseVideo();
      setPlaying(false);
      return;
    }
    beginRef.current(trackIndexRef.current);
  };

  const choose = (index: number) => {
    if (index === trackIndexRef.current && playing) {
      toggle();
      return;
    }
    beginRef.current(index);
  };

  const step = (direction: -1 | 1) => {
    const count = tracksRef.current.length;
    if (count === 0) return;
    const next = (trackIndexRef.current + direction + count) % count;
    beginRef.current(next);
  };

  const seek = (value: number) => {
    const player = playerRef.current;
    if (!player || !readyRef.current || !Number.isFinite(value)) return;
    player.seekTo(value, true);
    setCurrent(value);
  };

  const progress = duration > 0 ? Math.min(100, (current / duration) * 100) : 0;
  const seekStyle = { "--progress": `${progress}%` } as CSSProperties;

  if (!track) return null;

  return (
    <section className="player" aria-label={`${artist.name} 대표곡`}>
      {createPortal(
        <div className="player__yt" aria-hidden="true">
          <div ref={hostRef} />
        </div>,
        document.body,
      )}

      <div className="player__now">
        <button
          type="button"
          className="player__play"
          onClick={toggle}
          aria-label={playing ? "일시정지" : "재생"}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>
        <div className="player__meta">
          <p className="player__title">{track.title}</p>
          <p className="player__sub">
            {artist.name}
            <span aria-hidden="true"> · </span>
            {artist.role}
          </p>
          {error ? <p className="player__note">{error}</p> : null}
          <div className="player__times">
            <span>{formatTime(current)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        <div className="player__skip">
          <button type="button" onClick={() => step(-1)} aria-label="이전 곡">
            <SkipIcon direction="prev" />
          </button>
          <button type="button" onClick={() => step(1)} aria-label="다음 곡">
            <SkipIcon direction="next" />
          </button>
        </div>
      </div>
      <input
        className="player__seek"
        type="range"
        min={0}
        max={duration || 0}
        step={0.1}
        value={duration ? Math.min(current, duration) : 0}
        disabled={!duration}
        aria-label="재생 위치"
        style={seekStyle}
        onChange={(event) => seek(Number(event.target.value))}
      />

      <ol className="player__tracks">
        {artist.tracks.map((item, index) => {
          const active = index === trackIndex;
          return (
            <li key={item.id}>
              <button
                type="button"
                className={active ? "player__track is-active" : "player__track"}
                aria-pressed={active}
                onClick={() => choose(index)}
              >
                <span className="player__track-no">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="player__track-title">{item.title}</span>
                {active && playing ? <Eq /> : null}
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
