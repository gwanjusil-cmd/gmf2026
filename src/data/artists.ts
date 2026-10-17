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
  linktree?: string;
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
  videoFrame?: {
    scale: number;
    raise: number;
  };
};

// 이름, 소개, 영상, 음원은 이 파일에서 바꿉니다.
// 영상: public/videos/{id}.mp4 또는 유튜브 주소
// 음원 src: 유튜브 주소. 예) https://www.youtube.com/watch?v=영상ID
// links: 사운드클라우드, 인스타그램, 유튜브, 링크트리 주소. 비어 있으면 버튼이 나오지 않습니다.
export const artists: Artist[] = [
  {
    id: "nib",
    index: "01",
    name: "닙아카이브",
    nameEn: "nib archieve",
    role: "Singer Songwriter",
    bio: "모든 여정의 기록, 닙아카이브 입니다.",
    video: "https://www.youtube.com/watch?v=PRwQ36Xddpw",
    videoFrame: { scale: 2.7, raise: 58 },
    tone: "radial-gradient(130% 100% at 18% 0%,rgba(255, 255, 255, 0.67) 0%, #f7f4ef 46%, #efe8df 100%)",
    theme: {
      base: "#A9A775",
      card: "linear-gradient(180deg, rgba(169, 167, 117, 0) 0%, rgba(169, 167, 117, 0.42) 34%, rgba(169, 167, 117, 0.94) 64%, #A9A775 100%)",
      ink: "#242116",
      muted: "#3d3a24",
    },
    links: {
      soundcloud: "",
      instagram: "",
      youtube: "",
      linktree:
        "https://linktr.ee/nib.archive?utm_source=linktree_profile_share&ltsid=a1a53b67-54e6-49f3-83cd-889438ddfce6",
    },
    tracks: [
      {
        id: "nib-1",
        title: "쓸모없긴",
        src: "https://www.youtube.com/watch?v=jfj4WeUjoPo&list=RDjfj4WeUjoPo&start_radio=1",
      },
      {
        id: "nib-2",
        title: "해넘이",
        src: "https://www.youtube.com/watch?v=1lsMNSuFm9U&list=OLAK5uy_kYKX-9RSfeFliKNrygYySqsupInjNdBMU&start_radio=1",
      },
      {
        id: "nib-3",
        title: "나의작은모습",
        src: "https://www.youtube.com/watch?v=apm89gILMNU&list=OLAK5uy_kYKX-9RSfeFliKNrygYySqsupInjNdBMU&start_radio=1",
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
      "https://www.youtube.com/watch?v=brZbUmcku-E&list=RDbrZbUmcku-E&start_radio=1",
    tone: "radial-gradient(130% 100% at 82% 0%, #ffffff 0%, #f3f6f8 48%, #e6ebf0 100%)",
    links: {
      soundcloud: "",
      instagram: "https://www.instagram.com/for_the_poet.official",
      youtube: "",
      linktree: "",
    },
    tracks: [
      {
        id: "Poet-1",
        title: "사랑하네",
        src: "https://www.youtube.com/watch?v=UqTbCWr4N0Q&list=OLAK5uy_mQhSk6EjBnaC-PJ1w_FXFaB1_wfRlHD8k&start_radio=1",
      },
      {
        id: "Poet-2",
        title: "느린박자",
        src: "https://www.youtube.com/watch?v=q8f9ec817VY&list=OLAK5uy_n2Iqnek53xlboidc31t1tmGRlN1UqskUU&start_radio=1",
      },
      {
        id: "Poet-3",
        title: "12월",
        src: "https://www.youtube.com/watch?v=NYANyvldoik&list=OLAK5uy_n2Iqnek53xlboidc31t1tmGRlN1UqskUU&start_radio=1",
      },
    ],
  },
  {
    id: "onee",
    index: "03",
    name: "원니",
    nameEn: "onee",
    role: "Singer Songwriter",
    bio: "싱어송라이터 원니는 지나온 시간과 버텨온 마음에 대해 노래한다. 포크를 기반으로 록, 블루스, 컨트리 등 다양한 음악적 색채를 넘나들며, 개인의 이야기에서 출발해 우리 모두의 삶에 닿는 노래를 만든다. 담담하면서도 때로는 거칠고 자유로운 목소리로, 살아가는 일의 애틋함과 그 안의 희망을 전한다.",
    video:
      "https://www.youtube.com/watch?v=6mOfuxo1Z9Q&list=RD6mOfuxo1Z9Q&start_radio=1",
    tone: "radial-gradient(130% 100% at 30% 8%, #ffffff 0%, #f8f4f2 50%, #f0e6e1 100%)",
    links: {
      soundcloud: "",
      instagram: "",
      youtube: "",
      linktree: "",
    },
    tracks: [
      {
        id: "onee-1",
        title: "슈바빙 사람들",
        src: "https://www.youtube.com/watch?v=Sw14kFGoOTI&list=OLAK5uy_lfhAD8la2aUBpVPju_sl92TcmC8fdfGIA&start_radio=1",
      },
      {
        id: "onee-2",
        title: "나는나로",
        src: "https://www.youtube.com/watch?v=J6JHHy8lWi0&list=OLAK5uy_lfhAD8la2aUBpVPju_sl92TcmC8fdfGIA&start_radio=1",
      },
      {
        id: "onee-3",
        title: "애플함정",
        src: "https://www.youtube.com/watch?v=OxctFZEvMbU&list=OLAK5uy_lfhAD8la2aUBpVPju_sl92TcmC8fdfGIA&start_radio=1",
      },
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
      "https://www.youtube.com/watch?v=sHYHp1z34jc&list=RDsHYHp1z34jc&start_radio=1",
    tone: "radial-gradient(130% 100% at 70% 0%, #ffffff 0%, #f4f7f5 50%, #e5eeea 100%)",
    links: {
      soundcloud: "",
      instagram: "",
      youtube: "",
      linktree:
        "https://linktr.ee/zzlleun?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAcGRvZgJzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAafLdLFTQmB5y96Hpq1w3sDtng5o8ZbRRcTvy5V5febW5FF-CQez8-sS5QNZyA_aem_znRsysfefGV9tm_AWB4JEQ",
    },
    tracks: [
      {
        id: "zzlleun-1",
        title: "사랑한대",
        src: "https://www.youtube.com/watch?v=ugkaHwjG8dw&list=RDugkaHwjG8dw&start_radio=1",
      },
      {
        id: "zzlleun-2",
        title: "묘",
        src: "https://www.youtube.com/watch?v=4Eu_kNbnisw&list=RD4Eu_kNbnisw&start_radio=1",
      },
      {
        id: "zzlleun-3",
        title: "그냥 날",
        src: "https://www.youtube.com/watch?v=SDR7sXtIxhU&list=RDSDR7sXtIxhU&start_radio=1",
      },
    ],
  },
  {
    id: "gugu",
    index: "05",
    name: "구구",
    nameEn: "gugu",
    role: "Band",
    bio: "안녕하세요 저는 99%는 제가 채울 테니 나머지 1%는 여러분들이 채워주세요 라는 슬러건으로  활동중인 밴드형 싱어송라이터 ‘구구’ 라고 합니다.",
    video: "https://www.youtube.com/watch?v=Lqkl9Y5A4Eo",
    tone: "radial-gradient(130% 100% at 40% 0%, #ffffff 0%, #f6f5f8 48%, #ebe8f0 100%)",
    links: {
      soundcloud: "",
      instagram: "",
      youtube: "",
      linktree:
        "https://linktr.ee/9u9u_?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAcGRvZgJzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAacPLZf2nxVk5auyPJMah05N1sF_-a0BdMibQOncqQQ7rUHO4DLWIUKkyPn96A_aem_pwfWIsefrzixzI7QxU_IRw",
    },
    tracks: [
      {
        id: "gugu-1",
        title: "엉망진창",
        src: "https://www.youtube.com/watch?v=Z9YXXAuNPJw&list=RDZ9YXXAuNPJw&start_radio=1",
      },
      {
        id: "gugu-2",
        title: "순애",
        src: "https://www.youtube.com/watch?v=dGS_aAN7dLA&list=RDdGS_aAN7dLA&start_radio=1",
      },
      {
        id: "gugu-3",
        title: "슬픈 눈",
        src: "https://www.youtube.com/watch?v=YfwcZEoLLF0&list=OLAK5uy_nvG4MixxXKG6cSXmhVAOqoXTDJ9MekAi8&start_radio=1",
      },
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
