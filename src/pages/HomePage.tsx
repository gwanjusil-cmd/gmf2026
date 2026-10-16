import { useEffect, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { VideoBackground } from '../components/VideoBackground'
import { artists } from '../data/artists'

export function HomePage() {
  useEffect(() => {
    document.title = 'GMF 뮤지션'
  }, [])

  return (
    <main className="home">
      <header className="home__bar">
        <p className="mark">GMF</p>
        <p className="home__count">다섯 명</p>
      </header>

      <div className="home__intro">
        <h1>뮤지션</h1>
        <p>카드를 누르면 영상을 배경으로 대표곡을 들을 수 있습니다.</p>
      </div>

      <div className="home__rail">
        {artists.map((artist) => (
          <Link
            key={artist.id}
            className={artist.theme ? 'card card--toned' : 'card'}
            to={`/artists/${artist.id}`}
            style={
              artist.theme
                ? ({
                    background: artist.theme.base,
                    color: artist.theme.ink,
                    '--ink': artist.theme.ink,
                    '--muted': artist.theme.muted,
                    '--faint': artist.theme.muted,
                  } as CSSProperties)
                : undefined
            }
          >
            <VideoBackground src={artist.video} tone={artist.tone} playback="visible" />
            <span
              className="card__veil"
              style={artist.theme ? { background: artist.theme.card } : undefined}
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
  )
}
