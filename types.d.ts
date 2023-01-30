export interface SanityData {
  post: PostDocument;
  morePosts: PostDocument[];
}

export interface PostDocument {
  _id: string;
  author: Author | null;
  content: Content | null;
  coverImage: CoverImage | null;
  date: string | null;
  excerpt: string | null;
  name: string | null;
  slug: string | null;
  title: string | null;
}

export type IndexPostDocument = Omit<PostDocument, "content">;

export interface Author {
  name: string;
  picture: CoverImage;
}

export interface CoverImage {
  _type: "image";
  asset: Asset;
}

export interface Asset {
  _ref: string;
  _type: string;
}

export type ContentBlock = MainBlock | ImageBlock | CodeBlock;
export type Content = ContentBlock[];

export interface BlockBase {
  _key: string;
  _type: string;
}

export interface MainBlock extends BlockBase {
  children: ChildSpan[];
  level?: number;
  listItem?: "bullet" | "number";
  markDefs: MarkDef[];
  style: string;
}

export interface ImageBlock extends BlockBase {
  asset: Asset;
}

export interface CodeBlock extends BlockBase {
  code: string;
  highlightedLines?: numbers[];
  language: string;
}

export interface ChildSpan extends BlockBase {
  _key: string;
  _type: string;
  marks: string[];
  text: string;
}

export interface MarkDef extends BlockBase {
  href: string;
}
