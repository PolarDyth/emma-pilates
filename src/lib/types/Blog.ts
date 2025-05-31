import { PortableTextBlock } from "next-sanity";

export interface Category {
  _id: string;
  title: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  excerpt: string;
  readTime?: number;
  tags?: string[];
  mainImage?: {
    asset: { 
      _id: string;
      url: string;
    };
    alt: string;
  };
  author?: {
    name: string;
    profession: string;
    bio: PortableTextBlock[];
    image?: {
      asset: {
        url: string;
      };
    };
  };
  category?: Category;
}

export interface BlogPostWithBody extends BlogPost {
  body: PortableTextBlock[];
}