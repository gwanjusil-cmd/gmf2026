import { useEffect, useRef, type CSSProperties, type TouchEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Player } from '../components/Player'
import { SocialLinks } from '../components/SocialLinks'
import { VideoBackground } from '../components/VideoBackground'
import { artists, getArtist, getNeighbors } from '../data/artists'

export function ArtistPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const frameRef = useRef<HTMLDivElement>(null)
  const tracking = useRef(false)
  const start = useRef({ x: 0, y: 0 })
  const artist = getArtist(id ?? '')

  useEffect(() => {
    frameRef.current?.scrollTo(0, 0)
    document.title = artist ? `${artist.name} · GMF` : 'GMF'
  }, [artist])

  if (!artist) {
    return (
      <main className="missing">
        <p>소개 페이지를 찾지 못했습니다.</p>
        <Link to="/" className="text-btn">
          목록
        </Link>
      </main>
    )
  }

  const { prev, next } = getNeighbors(artist.id)

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const target = event.target
    if (!(target instanceof Element)) return
    if (target.closest('a, button, input, .player')) {
      tracking.current = false
      return
    }
    const touch = event.touches[0]
    if (!touch) return
    tracking.current = true
    start.current = { x: touch.clientX, y: touch.clientY }
  }

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (!tracking.current) return
    tracking.current = false
    const touch = event.changedTouches[0]
    if (!touch) return
    const dx = touch.clientX - start.current.x
    const dy = touch.clientY - start.current.y
    if (Math.abs(dx) < 56 || Math.abs(dx) < Math.abs(dy)) return
    navigate(dx < 0 ? `/artists/${next.id}` : `/artists/${prev.id}`)
  }

  return (
    <div className="stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <VideoBackground className="is-fixed" src={artist.video} tone={artist.tone} />
      <div
        className="stage__veil"
        style={artist.theme ? { background: artist.theme.card } : undefined}
      />

      <div className="stage__frame" ref={frameRef}>
        <header className="stage__bar">
          <Link to="/" className="text-btn">
            목록
          </Link>
          <nav className="stage__index" aria-label="뮤지션">
            {artists.map((item) => (
              <Link
                key={item.id}
                to={`/artists/${item.id}`}
                className={item.id === artist.id ? 'is-current' : undefined}
                aria-label={item.name}
                aria-current={item.id === artist.id ? 'page' : undefined}
              >
                {item.index}
              </Link>
            ))}
          </nav>
          <div className="stage__moves">
            <Link to={`/artists/${prev.id}`} className="text-btn">
              이전
            </Link>
            <Link to={`/artists/${next.id}`} className="text-btn">
              다음
            </Link>
          </div>
        </header>

        <div className="stage__main" key={artist.id}>
          <div
            className={artist.theme ? 'identity identity--toned' : 'identity'}
            style={
              artist.theme
                ? ({
                    color: artist.theme.ink,
                    '--ink': artist.theme.ink,
                    '--muted': artist.theme.muted,
                    '--faint': artist.theme.muted,
                  } as CSSProperties)
                : undefined
            }
          >
            <p className="identity__index">
              {artist.index}
              <span aria-hidden="true"> / 05</span>
            </p>
            <p className="identity__role">{artist.role}</p>
            <h1>{artist.name}</h1>
            <p className="identity__en">{artist.nameEn}</p>
            <p className="identity__bio">{artist.bio}</p>
            <SocialLinks links={artist.links} />
          </div>
          <Player key={artist.id} artist={artist} />
        </div>
      </div>
    </div>
  )
}
