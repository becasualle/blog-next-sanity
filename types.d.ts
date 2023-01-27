export interface SanityData {
  post: Post;
  morePosts: any[];
}

export interface Post {
  _id: string;
  author: Author | null;
  content: Content[] | null;
  coverImage: CoverImage | null;
  date: string | null;
  excerpt: string | null;
  name: string | null;
  slug: string | null;
  title: string | null;
}

export type IndexPost = Omit<Post, "content">;

export interface Author {
  name: string;
  picture: CoverImage;
}

export interface CoverImage {
  _type: string;
  asset: Asset;
}

export interface Asset {
  _ref: string;
  _type: string;
}

export interface Content {
  _key: string;
  _type: string;
  children?: Child[];
  markDefs?: any[];
  style?: string;
  asset?: Asset;
}

export interface Child {
  _key: string;
  _type: string;
  marks: string[];
  text: string;
}
