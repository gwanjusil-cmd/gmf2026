export type Track = {
  id: string;
  title: string;
  src: string;
};

export type ArtistTheme = {
  base: string;
  card: string;
  ink: string;
  muted: string;
};

export type ArtistLinks = {
  soundcloud?: string;
  instagram?: string;
  youtube?: string;
};

export type Artist = {
  id: string;
  index: string;
  name: string;
  nameEn: string;
  role: string;
  bio: string;
  video: string;
  tone: string;
  tracks: Track[];
  links?: ArtistLinks;
  theme?: ArtistTheme;
};

// 이름, 소개, 영상, 음원은 이 파일에서 바꿉니다.
// 영상: public/videos/{id}.mp4 또는 유튜브 주소
// 음원 src: 유튜브 주소. 예) https://www.youtube.com/watch?v=영상ID
// links: 사운드클라우드, 인스타그램, 유튜브 주소
export const artists: Artist[] = [
  {
    id: "nib",
    index: "01",
    name: "닙아카이브",
    nameEn: "nib archieve",
    role: "Singer Songwriter",
    bio: "모든 여정의 기록, 닙아카이브 입니다.",
    video: "https://www.youtube.com/watch?v=PRwQ36Xddpw",
    tone: "radial-gradient(130% 100% at 18% 0%,rgba(255, 255, 255, 0.67) 0%, #f7f4ef 46%, #efe8df 100%)",
    theme: {
      base: "#A9A775",
      card: "linear-gradient(180deg, rgba(169, 167, 117, 0) 0%, rgba(169, 167, 117, 0.22) 42%, rgba(169, 167, 117, 0.92) 98%, #A9A775 95%)",
      ink: "#242116",
      muted: "#3d3a24",
    },
    links: {
      soundcloud: "",
      instagram: "",
      youtube: "",
    },
    tracks: [
      {
        id: "harin-1",
        title: "쓸모없긴",
        src: "https://www.youtube.com/watch?v=jfj4WeUjoPo&list=RDjfj4WeUjoPo&start_radio=1",
      },
      {
        id: "harin-2",
        title: "해넘이",
        src: "https://www.youtube.com/watch?v=1lsMNSuFm9U&list=OLAK5uy_kYKX-9RSfeFliKNrygYySqsupInjNdBMU&index=6",
      },
      {
        id: "harin-3",
        title: "나의작은모습",
        src: "https://www.youtube.com/watch?v=apm89gILMNU&list=OLAK5uy_kYKX-9RSfeFliKNrygYySqsupInjNdBMU&index=7",
      },
    ],
  },
  {
    id: "poet",
    index: "02",
    name: "시인을 위하여",
    nameEn: "For The Poet",
    role: "Band",
    bio: "보컬의 ’신경우‘가 통기타로 작사/작곡하고 메인 기타리스트 ‘신승헌’, 드러머 ‘이범희’와 함께 음악을 만들어가고 있는 포크 록 밴드입니다.일상의 감정과 순간들을 담담한 언어로 노래하며, 이야기 중심의 가사와 균형 잡힌 밴드 사운드를 바탕으로 무대 위에서 진심을 전하고자 합니다.",
    video:
      "https://www.youtube.com/watch?v=5DBsTEA6wlw&list=RD5DBsTEA6wlw&start_radio=1",
    tone: "radial-gradient(130% 100% at 82% 0%, #ffffff 0%, #f3f6f8 48%, #e6ebf0 100%)",
    links: {
      soundcloud: "",
      instagram: "",
      youtube: "",
    },
    tracks: [
      { id: "doyoon-1", title: "빈 의자", src: "/audio/doyoon-1.mp3" },
      { id: "doyoon-2", title: "느린 오후", src: "/audio/doyoon-2.mp3" },
      { id: "doyoon-3", title: "골목의 끝", src: "/audio/doyoon-3.mp3" },
    ],
  },
  {
    id: "onee",
    index: "03",
    name: "원니",
    nameEn: "onee",
    role: "Singer Songwriter",
    bio: "싱어송라이터 원니는 개인적인 이야기에서 출발해 누구에게나 닿는 감정과 질문을 노래한다. 2024년 EP <Eternal Panorama> 이후, 밴드 사운드를 거쳐 다시 말과 노래의 중심으로 돌아온 그는, 포크를 기반으로 한 새로운 작업을 이어가고 있다.",
    video:
      "https://www.youtube.com/watch?v=6mOfuxo1Z9Q&list=RD6mOfuxo1Z9Q&start_radio=1",
    tone: "radial-gradient(130% 100% at 30% 8%, #ffffff 0%, #f8f4f2 50%, #f0e6e1 100%)",
    links: {
      soundcloud: "",
      instagram: "",
      youtube: "",
    },
    tracks: [
      { id: "ian-1", title: "잔상", src: "/audio/ian-1.mp3" },
      { id: "ian-2", title: "소프트 노이즈", src: "/audio/ian-2.mp3" },
      { id: "ian-3", title: "첫 소절", src: "/audio/ian-3.mp3" },
    ],
  },
  {
    id: "zzlleun",
    index: "04",
    name: "이재은",
    nameEn: "zzlleun",
    role: "Singer Songwriter",
    bio: "안녕하세요 들여다보고 싶은 이야기를 노래하는 싱어송라이터 이재은입니다!",
    video:
      "https://www.youtube.com/watch?v=M6zr0dtcZKw&list=RDM6zr0dtcZKw&start_radio=1",
    tone: "radial-gradient(130% 100% at 70% 0%, #ffffff 0%, #f4f7f5 50%, #e5eeea 100%)",
    links: {
      soundcloud: "",
      instagram: "",
      youtube: "",
    },
    tracks: [
      { id: "soyul-1", title: "사랑한대", src: "/audio/soyul-1.mp3" },
      { id: "soyul-2", title: "묘", src: "/audio/soyul-2.mp3" },
      { id: "soyul-3", title: "그냥 날", src: "/audio/soyul-3.mp3" },
    ],
  },
  {
    id: "gugu",
    index: "05",
    name: "구구",
    nameEn: "gugu",
    role: "Band",
    bio: "작은 편성으로 가까이에서 듣는 사운드를 연주합니다.",
    video: "https://www.youtube.com/watch?v=Lqkl9Y5A4Eo",
    tone: "radial-gradient(130% 100% at 40% 0%, #ffffff 0%, #f6f5f8 48%, #ebe8f0 100%)",
    links: {
      soundcloud: "",
      instagram: "",
      youtube: "",
    },
    tracks: [
      { id: "minjae-1", title: "나란히", src: "/audio/minjae-1.mp3" },
      { id: "minjae-2", title: "짧은 앙코르", src: "/audio/minjae-2.mp3" },
      { id: "minjae-3", title: "불 꺼진 홀", src: "/audio/minjae-3.mp3" },
    ],
  },
];

export function getArtist(id: string) {
  return artists.find((artist) => artist.id === id);
}

export function getNeighbors(id: string) {
  const current = artists.findIndex((artist) => artist.id === id);
  const total = artists.length;
  const prev = artists[(current - 1 + total) % total];
  const next = artists[(current + 1) % total];
  return { prev, next };
}
