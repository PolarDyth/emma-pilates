export const blogPostQuery = `
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    body,
    readTime,
    tags,
    mainImage {
      asset-> {
        _id,
        url
      },
      alt
    },
    author-> {
      name,
      profession,
      bio,
      image {
        asset-> {
          url
        }
      }
    },
    category-> {
      title
    }
  }
`;

export const allBlogPostsQuery = `
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    readTime,
    tags,
    mainImage {
      asset-> {
        _id,
        url
      },
      alt
    },
    category-> {
      title
    }
  }
`;

export const allCategoriesQuery = `
  *[_type == "category"] | order(title asc) {
    _id,
    title
  }
`;

export const blogPostsByCategoryQuery = `
  *[_type == "blogPost" && category->title == $category] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    readTime,
    tags,
    mainImage {
      asset-> {
        _id,
        url
      },
      alt
    },
    category-> {
      title
    }
  }
`;