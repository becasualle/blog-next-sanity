export interface IndexPost {
  _id: string;
  author: Author;
  coverImage: CoverImage;
  date: string;
  excerpt: string;
  name: null;
  slug: string;
  title: string;
}

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
