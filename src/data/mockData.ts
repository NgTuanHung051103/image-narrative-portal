
// Languages
export const languages = [
  { id: "en", name: "English", isDefault: true },
  { id: "vi", name: "Vietnamese", isDefault: false },
  { id: "fr", name: "French", isDefault: false },
  { id: "de", name: "German", isDefault: false },
];

// Categories with hierarchical structure
export const categories = [
  {
    id: "cat1",
    parentId: null,
    imageId: "img1",
    status: "active",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
    languages: [
      { languageId: "en", name: "News", description: "Latest news and updates" },
      { languageId: "vi", name: "Tin tức", description: "Tin tức và cập nhật mới nhất" },
    ],
    children: ["cat2", "cat3"]
  },
  {
    id: "cat2",
    parentId: "cat1",
    imageId: "img2",
    status: "active",
    createdAt: "2023-01-02T00:00:00Z",
    updatedAt: "2023-01-02T00:00:00Z",
    languages: [
      { languageId: "en", name: "Technology", description: "Technology news and reviews" },
      { languageId: "vi", name: "Công nghệ", description: "Tin tức và đánh giá công nghệ" },
    ],
    children: ["cat4"]
  },
  {
    id: "cat3",
    parentId: "cat1",
    imageId: "img3",
    status: "active",
    createdAt: "2023-01-03T00:00:00Z",
    updatedAt: "2023-01-03T00:00:00Z",
    languages: [
      { languageId: "en", name: "Business", description: "Business and economy news" },
      { languageId: "vi", name: "Kinh doanh", description: "Tin tức kinh doanh và kinh tế" },
    ],
    children: []
  },
  {
    id: "cat4",
    parentId: "cat2",
    imageId: "img4",
    status: "active",
    createdAt: "2023-01-04T00:00:00Z",
    updatedAt: "2023-01-04T00:00:00Z",
    languages: [
      { languageId: "en", name: "Gadgets", description: "Latest gadgets and reviews" },
      { languageId: "vi", name: "Thiết bị", description: "Thiết bị mới nhất và đánh giá" },
    ],
    children: []
  },
  {
    id: "cat5",
    parentId: null,
    imageId: "img5",
    status: "active",
    createdAt: "2023-01-05T00:00:00Z",
    updatedAt: "2023-01-05T00:00:00Z",
    languages: [
      { languageId: "en", name: "Lifestyle", description: "Lifestyle and wellness" },
      { languageId: "vi", name: "Phong cách sống", description: "Phong cách sống và sức khỏe" },
    ],
    children: []
  },
];

// Contents
export const contents = [
  {
    id: "cont1",
    categoryId: "cat2",
    imageId: "img1",
    imageIds: ["img1", "img2"],
    status: "published",
    isActive: true,
    createdAt: "2023-02-01T00:00:00Z",
    updatedAt: "2023-02-01T00:00:00Z",
    languages: [
      { 
        languageId: "en", 
        title: "The Future of AI", 
        description: "Exploring the future of artificial intelligence and its impact on society."
      },
      { 
        languageId: "vi", 
        title: "Tương lai của AI", 
        description: "Khám phá tương lai của trí tuệ nhân tạo và tác động của nó đến xã hội."
      },
    ],
    details: [
      {
        id: "detail1",
        contentId: "cont1",
        orderIndex: 1,
        languages: [
          {
            languageId: "en",
            title: "Introduction to AI",
            content: "Artificial Intelligence (AI) is transforming industries around the world..."
          },
          {
            languageId: "vi",
            title: "Giới thiệu về AI",
            content: "Trí tuệ nhân tạo (AI) đang chuyển đổi các ngành công nghiệp trên toàn thế giới..."
          }
        ]
      },
      {
        id: "detail2",
        contentId: "cont1",
        orderIndex: 2,
        languages: [
          {
            languageId: "en",
            title: "Current Applications",
            content: "AI is currently being used in healthcare, finance, manufacturing, and more..."
          },
          {
            languageId: "vi",
            title: "Ứng dụng hiện tại",
            content: "AI hiện đang được sử dụng trong y tế, tài chính, sản xuất và hơn thế nữa..."
          }
        ]
      }
    ]
  },
  {
    id: "cont2",
    categoryId: "cat3",
    imageId: "img3",
    imageIds: ["img3", "img5"],
    status: "published",
    isActive: true,
    createdAt: "2023-02-02T00:00:00Z",
    updatedAt: "2023-02-02T00:00:00Z",
    languages: [
      { 
        languageId: "en", 
        title: "Economic Trends 2023", 
        description: "Analysis of global economic trends for the year 2023."
      },
      { 
        languageId: "vi", 
        title: "Xu hướng kinh tế 2023", 
        description: "Phân tích các xu hướng kinh tế toàn cầu cho năm 2023."
      },
    ],
    details: []
  },
  {
    id: "cont3",
    categoryId: "cat4",
    imageId: "img4",
    imageIds: ["img4"],
    status: "draft",
    isActive: false,
    createdAt: "2023-02-03T00:00:00Z",
    updatedAt: "2023-02-03T00:00:00Z",
    languages: [
      { 
        languageId: "en", 
        title: "New Smartphone Review", 
        description: "Comprehensive review of the latest smartphone releases."
      },
      { 
        languageId: "vi", 
        title: "Đánh giá Smartphone mới", 
        description: "Đánh giá toàn diện về các mẫu smartphone mới ra mắt."
      },
    ],
    details: []
  },
  {
    id: "cont4",
    categoryId: "cat5",
    imageId: "img5",
    imageIds: ["img5"],
    status: "published",
    isActive: true,
    createdAt: "2023-02-04T00:00:00Z",
    updatedAt: "2023-02-04T00:00:00Z",
    languages: [
      { 
        languageId: "en", 
        title: "Healthy Eating Habits", 
        description: "Guide to developing healthy eating habits for a better lifestyle."
      },
      { 
        languageId: "vi", 
        title: "Thói quen ăn uống lành mạnh", 
        description: "Hướng dẫn phát triển thói quen ăn uống lành mạnh cho lối sống tốt hơn."
      },
    ],
    details: []
  },
];

// Images
export const images = [
  {
    id: "img1",
    filename: "ai_future.jpg",
    name: "AI Future",
    path: "/images/ai_future.jpg",
    thumbnailUrl: "/images/thumbnails/ai_future.jpg",
    mimeType: "image/jpeg",
    size: 1024000,
    createdAt: "2023-01-10T00:00:00Z",
    updatedAt: "2023-01-10T00:00:00Z",
  },
  {
    id: "img2",
    filename: "tech_news.jpg",
    name: "Technology News",
    path: "/images/tech_news.jpg",
    thumbnailUrl: "/images/thumbnails/tech_news.jpg",
    mimeType: "image/jpeg",
    size: 1536000,
    createdAt: "2023-01-11T00:00:00Z",
    updatedAt: "2023-01-11T00:00:00Z",
  },
  {
    id: "img3",
    filename: "business.jpg",
    name: "Business",
    path: "/images/business.jpg",
    thumbnailUrl: "/images/thumbnails/business.jpg",
    mimeType: "image/jpeg",
    size: 2048000,
    createdAt: "2023-01-12T00:00:00Z",
    updatedAt: "2023-01-12T00:00:00Z",
  },
  {
    id: "img4",
    filename: "gadgets.jpg",
    name: "Gadgets",
    path: "/images/gadgets.jpg",
    thumbnailUrl: "/images/thumbnails/gadgets.jpg",
    mimeType: "image/jpeg",
    size: 1792000,
    createdAt: "2023-01-13T00:00:00Z",
    updatedAt: "2023-01-13T00:00:00Z",
  },
  {
    id: "img5",
    filename: "lifestyle.jpg",
    name: "Lifestyle",
    path: "/images/lifestyle.jpg",
    thumbnailUrl: "/images/thumbnails/lifestyle.jpg",
    mimeType: "image/jpeg",
    size: 2560000,
    createdAt: "2023-01-14T00:00:00Z",
    updatedAt: "2023-01-14T00:00:00Z",
  },
];

// Content-Image relationships
export const contentImages = [
  { contentId: "cont1", imageId: "img1" },
  { contentId: "cont1", imageId: "img2" },
  { contentId: "cont2", imageId: "img3" },
  { contentId: "cont3", imageId: "img4" },
  { contentId: "cont4", imageId: "img5" },
];

// Component Types for Pages
export const componentTypes = [
  { id: "hero", name: "Hero Banner", description: "Large hero banner with main content and call-to-action" },
  { id: "featured", name: "Featured Content", description: "Grid of featured content items" },
  { id: "list", name: "Content List", description: "Vertical list of content items" },
  { id: "grid", name: "Content Grid", description: "Grid layout for content items" },
  { id: "carousel", name: "Content Carousel", description: "Carousel of content items" },
];

// Pages
export const pages = [
  {
    id: "page1",
    title: "Home Page",
    slug: "home",
    status: "published",
    createdAt: "2023-03-01T00:00:00Z",
    updatedAt: "2023-03-01T00:00:00Z",
    components: [
      {
        id: "comp1",
        type: "hero",
        orderIndex: 1,
        settings: {
          backgroundColor: "#F1EEFF",
          textColor: "#111827",
          contentAlignment: "center",
        },
        content: {
          mainContentId: "cont1",
          featuredContentIds: ["cont2", "cont3"],
        }
      },
      {
        id: "comp2",
        type: "featured",
        orderIndex: 2,
        settings: {
          backgroundColor: "#FFFFFF",
          textColor: "#111827",
          contentAlignment: "left",
          columns: 3,
          showImages: true,
        },
        content: {
          title: "Featured Articles",
          contentIds: ["cont1", "cont2", "cont3", "cont4"],
        }
      },
      {
        id: "comp3",
        type: "list",
        orderIndex: 3,
        settings: {
          backgroundColor: "#F9FAFB",
          textColor: "#111827",
          contentAlignment: "left",
        },
        content: {
          title: "Latest News",
          contentIds: ["cont2", "cont3"],
        }
      },
    ],
  },
  {
    id: "page2",
    title: "About Us",
    slug: "about",
    status: "published",
    createdAt: "2023-03-02T00:00:00Z",
    updatedAt: "2023-03-02T00:00:00Z",
    components: [
      {
        id: "comp4",
        type: "hero",
        orderIndex: 1,
        settings: {
          backgroundColor: "#E3F3FF",
          textColor: "#111827",
          contentAlignment: "center",
        },
        content: {
          mainContentId: "cont4",
          featuredContentIds: [],
        }
      },
      {
        id: "comp5",
        type: "grid",
        orderIndex: 2,
        settings: {
          backgroundColor: "#FFFFFF",
          textColor: "#111827",
          contentAlignment: "center",
          columns: 2,
          showImages: true,
        },
        content: {
          title: "Our Team",
          contentIds: ["cont1", "cont4"],
        }
      },
    ],
  },
];
