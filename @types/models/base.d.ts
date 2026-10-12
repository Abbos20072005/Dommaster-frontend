interface About {
  description: string;
  id: number;
}

type AboutResponse = ApiResponse<About>;

/** `home_top` is one list for the site and the app (the platform tells them apart). */
type BannerPlacement = 'catalog' | 'home_bottom' | 'home_top';

/** Where a banner leads; an unknown (newer) type is shown as a banner that is not clickable. */
type BannerLinkType = 'badge' | 'brand' | 'category' | 'page' | 'product' | 'url' | (string & {});

interface Banner {
  /** what the banner opens: `model` is `productcategory`, `productsubcategory`, `productitemcategory`, `product`, `brand` or `productbadge` */
  content_type_info?: { id: number; model: string } | null;
  /** wide picture (16:5), always there */
  desktop_image: string;
  id: number;
  /** external address, for `link_type: 'url'` */
  link: string;
  link_type?: BannerLinkType;
  /** square picture (1:1); null — use `desktop_image` */
  mobile_image: string | null;
  /** inner path (`/pro`), for `link_type: 'page'` */
  page?: string;
  placement?: BannerPlacement;
  short_description?: string | null;
  /** internal name: for `alt`, not for the text on the banner */
  title: string;
}

type BannersResponse = ApiResponse<Banner[]>;

interface ChatMessage {
  chat: number;
  created_at: string;
  id: number;
  image: string | null;
  is_answer: boolean;
  message: string;
}

type ChatMessagesResponse = ApiResponse<ChatMessage[]>;
type ChatMessageResponse = ApiResponse<ChatMessage>;

interface News {
  created_at: string;
  description: string;
  id: number;
  image: string;
  title: string;
}

type NewsListResponse = ApiResponse<Pagination<News>>;
type NewsResponse = ApiResponse<News>;

interface Article {
  created_at: string;
  description: string;
  id: number;
  short_description: string;
  title: string;
}

type ArticlesResponse = ApiResponse<Pagination<Article>>;
type ArticleResponse = ApiResponse<Article>;

interface Review {
  created_at: string;
  description: string;
  id: number;
  short_description: string;
  title: string;
}

type ReviewsResponse = ApiResponse<Pagination<Review>>;
type ReviewResponse = ApiResponse<Review>;

interface Video {
  created_at: string;
  description: string;
  id: number;
  name: string;
  url: string;
}

type VideosResponse = ApiResponse<Video[]>;
type VideoResponse = ApiResponse<Video>;

/** `banners` — the bottom banners that follow a block: a list, shared out between the blocks. */
type Main = { type: 'addsbrands'; data: AddsBrand } | { type: 'banners'; data: Banner[] };

type MainResponse = ApiResponse<Main[]>;
