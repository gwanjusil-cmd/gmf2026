import { useEffect, useRef, type CSSProperties, type TouchEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Player } from "../components/Player";
import { SocialLinks } from "../components/SocialLinks";
import { VideoBackground } from "../components/VideoBackground";
import { artists, getArtist, getNeighbors } from "../data/artists";

export function ArtistPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const frameRef = useRef<HTMLDivElement>(null);
  const tracking = useRef(false);
  const start = useRef({ x: 0, y: 0 });
  const artist = getArtist(id ?? "");

  useEffect(() => {
    frameRef.current?.scrollTo(0, 0);
    document.title = artist ? `${artist.name} · GMF` : "GMF";
  }, [artist]);

  if (!artist) {
    return (
      <main className="missing">
        <p>소개 페이지를 찾지 못했습니다.</p>
        <Link to="/" className="text-btn">
          목록
        </Link>
      </main>
    );
  }

  const { prev, next } = getNeighbors(artist.id);

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest("a, button, input, .player")) {
      tracking.current = false;
      return;
    }
    const touch = event.touches[0];
    if (!touch) return;
    tracking.current = true;
    start.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (!tracking.current) return;
    tracking.current = false;
    const touch = event.changedTouches[0];
    if (!touch) return;
    const dx = touch.clientX - start.current.x;
    const dy = touch.clientY - start.current.y;
    if (Math.abs(dx) < 56 || Math.abs(dx) < Math.abs(dy)) return;
    navigate(dx < 0 ? `/artists/${next.id}` : `/artists/${prev.id}`);
  };

  return (
    <div className="stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <VideoBackground
        className="is-fixed"
        src={artist.video}
        tone={artist.tone}
        frame={artist.videoFrame}
      />
      <div
        className="stage__veil"
        style={artist.theme ? { background: artist.theme.card } : undefined}
      />

      <div className="stage__frame" ref={frameRef}>
        <header className="stage__bar">
          <div className="stage__lead">
            <Link to="/" className="text-btn">
              HOME
            </Link>
            <nav className="stage__index" aria-label="뮤지션">
              {artists.map((item) => (
                <Link
                  key={item.id}
                  to={`/artists/${item.id}`}
                  className={item.id === artist.id ? "is-current" : undefined}
                  aria-label={item.name}
                  aria-current={item.id === artist.id ? "page" : undefined}
                >
                  {item.index}
                </Link>
              ))}
            </nav>
          </div>
          <p className="stage__brand">nib.archive x UNPLUGGED</p>
          <div className="stage__moves">
            <Link
              to={`/artists/${prev.id}`}
              className="text-btn stage__move"
              aria-label="이전"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  d="M12.6 4.6 7 10l5.6 5.4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link
              to={`/artists/${next.id}`}
              className="text-btn stage__move"
              aria-label="다음"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  d="M7.4 4.6 13 10l-5.6 5.4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </header>

        <div className="stage__main" key={artist.id}>
          <div
            className={artist.theme ? "identity identity--toned" : "identity"}
            style={
              artist.theme
                ? ({
                    color: artist.theme.ink,
                    "--ink": artist.theme.ink,
                    "--muted": artist.theme.muted,
                    "--faint": artist.theme.muted,
                  } as CSSProperties)
                : undefined
            }
          >
            <p className="identity__index">
              {artist.index}
              <span aria-hidden="true"> / 05</span>
            </p>
            <p className="identity__role">{artist.role}</p>
            <div className="identity__heading">
              <h1>{artist.name}</h1>
              <SocialLinks links={artist.links} />
            </div>
            <p className="identity__en">{artist.nameEn}</p>
            <p className="identity__bio">{artist.bio}</p>
          </div>
          <Player key={artist.id} artist={artist} />
        </div>
      </div>
    </div>
  );
}
