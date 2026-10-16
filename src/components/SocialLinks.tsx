import type { ArtistLinks } from "../data/artists";

type SocialLinksProps = {
  links?: ArtistLinks;
};

const services = [
  { key: "soundcloud", label: "SoundCloud" },
  { key: "instagram", label: "Instagram" },
  { key: "youtube", label: "YouTube" },
] as const;

function SoundCloudIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7.2 17.2h9.4a2.7 2.7 0 0 0 .3-5.4 4.7 4.7 0 0 0-9-1.3 3.2 3.2 0 0 0-.7 6.7z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="5" width="14" height="14" rx="4" />
      <circle cx="12" cy="12" r="3.15" />
      <circle cx="16.5" cy="7.6" r="0.7" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="6.5" width="17" height="11" rx="2.5" />
      <path d="M10.6 9.6v4.8L14.8 12l-4.2-2.4z" />
    </svg>
  );
}

const icons = {
  soundcloud: SoundCloudIcon,
  instagram: InstagramIcon,
  youtube: YouTubeIcon,
};

export function SocialLinks({ links }: SocialLinksProps) {
  return (
    <div className="socials">
      {services.map((service) => {
        const Icon = icons[service.key];
        const href = links?.[service.key]?.trim();
        const icon = <Icon />;

        if (!href) {
          return (
            <span key={service.key} className="social" aria-label={service.label}>
              {icon}
            </span>
          );
        }

        return (
          <a
            key={service.key}
            className="social"
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={service.label}
          >
            {icon}
          </a>
        );
      })}
    </div>
  );
}
