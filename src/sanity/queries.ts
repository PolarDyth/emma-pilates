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

// SCHEDULE QUERIES
export const allSchedulesQuery = `
  *[_type == "schedule" && isActive == true] | order(isRecurring desc, oneTimeDate asc, startDate asc) {
    _id,
    title,
    isRecurring,
    oneTimeDate,
    startDate,
    endDate,
    recurrencePattern,
    daysOfWeek,
    time,
    customInterval,
    customIntervalUnit,
    location,
    specialPrice,
    maxParticipants,
    notes,
    exceptions[] {
      date,
      reason
    },
    class-> {
      _id,
      title,
      level
    },
    instructor-> {
      name,
      image {
        asset-> { url }
      }
    }
  }
`;

// CLASS QUERIES
export const allClassesQuery = `
  *[_type == "class"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    level,
    duration,
    maxParticipants,
    price,
    instructor-> {
      name,
      image {
        asset-> { url }
      }
    },
    category-> {
      _id,
      title
    },
    image {
      asset-> {
        _id,
        url
      },
      alt
    },
    equipment,
    benefits
  }
`;

export const classBySlugQuery = `
  *[_type == "class" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    level,
    duration,
    maxParticipants,
    price,
    instructor-> {
      name,
      image {
        asset-> { url }
      }
    },
    category-> {
      _id,
      title
    },
    image {
      asset-> {
        _id,
        url
      },
      alt
    },
    equipment,
    benefits
  }
`;