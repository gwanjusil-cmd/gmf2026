import { useEffect, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { VideoBackground } from "../components/VideoBackground";
import { artists } from "../data/artists";

export function HomePage() {
  useEffect(() => {
    document.title = "GMF 뮤지션";
  }, []);

  return (
    <main className="home">
      <header className="home__bar">
        <p className="mark">nib.archive x UNPLUGGED</p>
        <p className="home__count">GMF2026</p>
      </header>

      <div className="home__intro">
        <h1>
          <span className="home__title">
            <span>좋은</span>
            <span>음악을</span>
            <span className="home__bridge">만나는</span>
          </span>
          <span className="home__place">또 하나의 자리</span>
        </h1>
        <p>
          이곳은 독립적으로 활동하는 인디 뮤지션들이 더 많은 사람에게 닿을 수
          있도록 음반과 굿즈를 함께 소개하는 공간입니다.
        </p>
      </div>

      <div className="home__rail">
        {artists.map((artist) => (
          <Link
            key={artist.id}
            className={artist.theme ? "card card--toned" : "card"}
            to={`/artists/${artist.id}`}
            style={
              artist.theme
                ? ({
                    background: artist.theme.base,
                    color: artist.theme.ink,
                    "--ink": artist.theme.ink,
                    "--muted": artist.theme.muted,
                    "--faint": artist.theme.muted,
                  } as CSSProperties)
                : undefined
            }
          >
            <VideoBackground
              src={artist.video}
              tone={artist.tone}
              playback="visible"
              frame={artist.videoFrame}
            />
            <span
              className="card__veil"
              style={
                artist.theme ? { background: artist.theme.card } : undefined
              }
            />
            <span className="card__copy">
              <span className="card__meta">
                <span>{artist.index}</span>
                <span>{artist.role}</span>
              </span>
              <span className="card__name">{artist.name}</span>
              <span className="card__en">{artist.nameEn}</span>
              <span className="card__listen">듣기</span>
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
