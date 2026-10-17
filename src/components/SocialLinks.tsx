import type { ArtistLinks } from "../data/artists";

type SocialLinksProps = {
  links?: ArtistLinks;
};

const services = [
  { key: "soundcloud", label: "SoundCloud" },
  { key: "instagram", label: "Instagram" },
  { key: "youtube", label: "YouTube" },
  { key: "linktree", label: "Linktree" },
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

function LinktreeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="4.3" r="1.45" />
      <circle cx="6.2" cy="11.4" r="1.45" />
      <circle cx="17.8" cy="11.4" r="1.45" />
      <circle cx="6.2" cy="18.4" r="1.45" />
      <circle cx="17.8" cy="18.4" r="1.45" />
      <path d="M12 5.8v12M12 9.2 7.4 10.6M12 9.2l4.6 1.4M12 14.4 7.4 17.2M12 14.4l4.6 2.8" />
    </svg>
  );
}

const icons = {
  soundcloud: SoundCloudIcon,
  instagram: InstagramIcon,
  youtube: YouTubeIcon,
  linktree: LinktreeIcon,
};

export function SocialLinks({ links }: SocialLinksProps) {
  const visible = services.filter((service) => links?.[service.key]?.trim());
  if (visible.length === 0) return null;

  return (
    <div className="socials">
      {visible.map((service) => {
        const Icon = icons[service.key];
        const href = links?.[service.key]?.trim() ?? "";

        return (
          <a
            key={service.key}
            className="social"
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={service.label}
          >
            <Icon />
          </a>
        );
      })}
    </div>
  );
}
