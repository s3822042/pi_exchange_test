export interface Giphy {
  data: Gif[];
  meta: Meta[];
}

export interface Gif {
  type: string;
  id: string;
  slug: string;
  url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  rating: string;
  content_url: string;
  title: string;
  alt_text: string;
  images: Images;
  user: User;
  trending_datetime: string;
  import_datetime: string;
  create_datetime: string;
  update_datetime: string;
  source_post_url: string;
  source_tld: string;
}

export interface Meta {
  msg: string;
  status: number;
  response_id: string;
}

export interface User {
  avatar_url: string;
  banner_url: string;
  profile_url: string;
  username: string;
  display_name: string;
}

export interface Images {
  fixed_height: {
    url: string;
    width: string;
    height: string;
    mp4: string;
    mp4_size: string;
    webp: string;
    webp_size: string;
  };
}
