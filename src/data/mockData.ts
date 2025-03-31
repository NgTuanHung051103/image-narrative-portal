
// Mock data for our CMS

// Languages supported
export const languages = [
  { id: 'en', name: 'English', isDefault: true },
  { id: 'vi', name: 'Vietnamese', isDefault: false },
  { id: 'fr', name: 'French', isDefault: false },
];

// Image data
export interface Image {
  id: string;
  name: string;
  url: string;
  thumbnailUrl: string;
  mimeType: string;
  size: number;
  createdAt: string;
  updatedAt: string;
}

export const images: Image[] = [
  {
    id: '1',
    name: 'banner-1.jpg',
    url: 'https://via.placeholder.com/1200x600',
    thumbnailUrl: 'https://via.placeholder.com/300x150',
    mimeType: 'image/jpeg',
    size: 245000,
    createdAt: '2023-01-15T10:30:00Z',
    updatedAt: '2023-01-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'product-1.jpg',
    url: 'https://via.placeholder.com/800x800',
    thumbnailUrl: 'https://via.placeholder.com/200x200',
    mimeType: 'image/jpeg',
    size: 180000,
    createdAt: '2023-01-20T14:20:00Z',
    updatedAt: '2023-01-20T14:20:00Z',
  },
  {
    id: '3',
    name: 'team-photo.jpg',
    url: 'https://via.placeholder.com/1000x500',
    thumbnailUrl: 'https://via.placeholder.com/250x125',
    mimeType: 'image/jpeg',
    size: 350000,
    createdAt: '2023-02-05T09:15:00Z',
    updatedAt: '2023-02-05T09:15:00Z',
  },
  {
    id: '4',
    name: 'logo.png',
    url: 'https://via.placeholder.com/400x400',
    thumbnailUrl: 'https://via.placeholder.com/100x100',
    mimeType: 'image/png',
    size: 75000,
    createdAt: '2023-02-10T16:45:00Z',
    updatedAt: '2023-02-10T16:45:00Z',
  },
  {
    id: '5',
    name: 'hero-background.jpg',
    url: 'https://via.placeholder.com/1920x1080',
    thumbnailUrl: 'https://via.placeholder.com/384x216',
    mimeType: 'image/jpeg',
    size: 520000,
    createdAt: '2023-02-15T11:30:00Z',
    updatedAt: '2023-02-15T11:30:00Z',
  },
  {
    id: '6',
    name: 'icon-set.svg',
    url: 'https://via.placeholder.com/500x500',
    thumbnailUrl: 'https://via.placeholder.com/125x125',
    mimeType: 'image/svg+xml',
    size: 25000,
    createdAt: '2023-02-20T13:10:00Z',
    updatedAt: '2023-02-20T13:10:00Z',
  },
];

// Category and Localization
export interface CategoryLanguage {
  languageId: string;
  name: string;
  description: string;
}

export interface Category {
  id: string;
  parentId: string | null;
  slug: string;
  imageId: string | null;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  languages: CategoryLanguage[];
}

export const categories: Category[] = [
  {
    id: '1',
    parentId: null,
    slug: 'products',
    imageId: '4',
    order: 1,
    isActive: true,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    languages: [
      {
        languageId: 'en',
        name: 'Products',
        description: 'All our products',
      },
      {
        languageId: 'vi',
        name: 'Sản phẩm',
        description: 'Tất cả sản phẩm của chúng tôi',
      },
      {
        languageId: 'fr',
        name: 'Produits',
        description: 'Tous nos produits',
      },
    ],
  },
  {
    id: '2',
    parentId: '1',
    slug: 'electronics',
    imageId: null,
    order: 1,
    isActive: true,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    languages: [
      {
        languageId: 'en',
        name: 'Electronics',
        description: 'Electronic products',
      },
      {
        languageId: 'vi',
        name: 'Điện tử',
        description: 'Sản phẩm điện tử',
      },
      {
        languageId: 'fr',
        name: 'Électronique',
        description: 'Produits électroniques',
      },
    ],
  },
  {
    id: '3',
    parentId: '2',
    slug: 'smartphones',
    imageId: null,
    order: 1,
    isActive: true,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    languages: [
      {
        languageId: 'en',
        name: 'Smartphones',
        description: 'Mobile phones and smartphones',
      },
      {
        languageId: 'vi',
        name: 'Điện thoại thông minh',
        description: 'Điện thoại di động và điện thoại thông minh',
      },
      {
        languageId: 'fr',
        name: 'Smartphones',
        description: 'Téléphones mobiles et smartphones',
      },
    ],
  },
  {
    id: '4',
    parentId: '2',
    slug: 'laptops',
    imageId: null,
    order: 2,
    isActive: true,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    languages: [
      {
        languageId: 'en',
        name: 'Laptops',
        description: 'Laptop computers',
      },
      {
        languageId: 'vi',
        name: 'Máy tính xách tay',
        description: 'Máy tính xách tay',
      },
      {
        languageId: 'fr',
        name: 'Ordinateurs portables',
        description: 'Ordinateurs portables',
      },
    ],
  },
  {
    id: '5',
    parentId: null,
    slug: 'services',
    imageId: '3',
    order: 2,
    isActive: true,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    languages: [
      {
        languageId: 'en',
        name: 'Services',
        description: 'Our services',
      },
      {
        languageId: 'vi',
        name: 'Dịch vụ',
        description: 'Dịch vụ của chúng tôi',
      },
      {
        languageId: 'fr',
        name: 'Services',
        description: 'Nos services',
      },
    ],
  },
  {
    id: '6',
    parentId: '5',
    slug: 'consulting',
    imageId: null,
    order: 1,
    isActive: true,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    languages: [
      {
        languageId: 'en',
        name: 'Consulting',
        description: 'Professional consulting services',
      },
      {
        languageId: 'vi',
        name: 'Tư vấn',
        description: 'Dịch vụ tư vấn chuyên nghiệp',
      },
      {
        languageId: 'fr',
        name: 'Conseil',
        description: 'Services de conseil professionnels',
      },
    ],
  },
  {
    id: '7',
    parentId: null,
    slug: 'about',
    imageId: '5',
    order: 3,
    isActive: true,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    languages: [
      {
        languageId: 'en',
        name: 'About Us',
        description: 'Learn about our company',
      },
      {
        languageId: 'vi',
        name: 'Về chúng tôi',
        description: 'Tìm hiểu về công ty chúng tôi',
      },
      {
        languageId: 'fr',
        name: 'À propos de nous',
        description: 'En savoir plus sur notre entreprise',
      },
    ],
  },
];

// Content and Content Language
export interface ContentLanguage {
  languageId: string;
  title: string;
  description: string;
}

export interface Content {
  id: string;
  categoryId: string;
  slug: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  languages: ContentLanguage[];
  imageIds: string[];
  contentDetails: ContentDetail[];
}

// Content Detail and Content Detail Language
export interface ContentDetailLanguage {
  languageId: string;
  title: string;
  content: string;
}

export interface ContentDetail {
  id: string;
  contentId: string;
  order: number;
  imageIds: string[];
  languages: ContentDetailLanguage[];
}

export const contents: Content[] = [
  {
    id: '1',
    categoryId: '3', // Smartphones
    slug: 'new-smartphone-model',
    isActive: true,
    createdAt: '2023-02-01T00:00:00Z',
    updatedAt: '2023-02-01T00:00:00Z',
    languages: [
      {
        languageId: 'en',
        title: 'New Smartphone Model',
        description: 'Introducing our latest smartphone with advanced features',
      },
      {
        languageId: 'vi',
        title: 'Mẫu điện thoại thông minh mới',
        description: 'Giới thiệu điện thoại thông minh mới nhất của chúng tôi với các tính năng tiên tiến',
      },
      {
        languageId: 'fr',
        title: 'Nouveau modèle de smartphone',
        description: 'Présentation de notre dernier smartphone avec des fonctionnalités avancées',
      },
    ],
    imageIds: ['2'],
    contentDetails: [
      {
        id: '1',
        contentId: '1',
        order: 1,
        imageIds: ['2'],
        languages: [
          {
            languageId: 'en',
            title: 'Technical Specifications',
            content: 'This smartphone features a 6.7-inch OLED display, 8GB RAM, and 256GB storage.',
          },
          {
            languageId: 'vi',
            title: 'Thông số kỹ thuật',
            content: 'Điện thoại thông minh này có màn hình OLED 6,7 inch, RAM 8GB và bộ nhớ 256GB.',
          },
          {
            languageId: 'fr',
            title: 'Spécifications techniques',
            content: 'Ce smartphone dispose d\'un écran OLED de 6,7 pouces, de 8 Go de RAM et de 256 Go de stockage.',
          },
        ],
      },
      {
        id: '2',
        contentId: '1',
        order: 2,
        imageIds: [],
        languages: [
          {
            languageId: 'en',
            title: 'Camera System',
            content: 'Triple-lens camera system with 48MP main sensor and 4K video recording.',
          },
          {
            languageId: 'vi',
            title: 'Hệ thống camera',
            content: 'Hệ thống camera ba ống kính với cảm biến chính 48MP và quay video 4K.',
          },
          {
            languageId: 'fr',
            title: 'Système de caméra',
            content: 'Système de caméra à triple objectif avec capteur principal de 48MP et enregistrement vidéo 4K.',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    categoryId: '4', // Laptops
    slug: 'premium-laptop',
    isActive: true,
    createdAt: '2023-02-05T00:00:00Z',
    updatedAt: '2023-02-05T00:00:00Z',
    languages: [
      {
        languageId: 'en',
        title: 'Premium Laptop',
        description: 'Our premium laptop for professionals and creatives',
      },
      {
        languageId: 'vi',
        title: 'Laptop cao cấp',
        description: 'Laptop cao cấp của chúng tôi dành cho các chuyên gia và người sáng tạo',
      },
      {
        languageId: 'fr',
        title: 'Ordinateur portable premium',
        description: 'Notre ordinateur portable haut de gamme pour les professionnels et les créatifs',
      },
    ],
    imageIds: ['2', '3'],
    contentDetails: [
      {
        id: '3',
        contentId: '2',
        order: 1,
        imageIds: ['3'],
        languages: [
          {
            languageId: 'en',
            title: 'Performance',
            content: 'Equipped with the latest processor, 32GB RAM, and 1TB SSD for unmatched performance.',
          },
          {
            languageId: 'vi',
            title: 'Hiệu suất',
            content: 'Được trang bị bộ xử lý mới nhất, RAM 32GB và SSD 1TB cho hiệu suất vô song.',
          },
          {
            languageId: 'fr',
            title: 'Performance',
            content: 'Équipé du dernier processeur, de 32 Go de RAM et d\'un SSD de 1 To pour des performances inégalées.',
          },
        ],
      },
    ],
  },
  {
    id: '3',
    categoryId: '6', // Consulting
    slug: 'business-consulting',
    isActive: true,
    createdAt: '2023-02-10T00:00:00Z',
    updatedAt: '2023-02-10T00:00:00Z',
    languages: [
      {
        languageId: 'en',
        title: 'Business Consulting',
        description: 'Strategic business consulting services for growing companies',
      },
      {
        languageId: 'vi',
        title: 'Tư vấn kinh doanh',
        description: 'Dịch vụ tư vấn kinh doanh chiến lược cho các công ty đang phát triển',
      },
      {
        languageId: 'fr',
        title: 'Conseil aux entreprises',
        description: 'Services de conseil stratégique pour les entreprises en croissance',
      },
    ],
    imageIds: ['5'],
    contentDetails: [
      {
        id: '4',
        contentId: '3',
        order: 1,
        imageIds: ['5'],
        languages: [
          {
            languageId: 'en',
            title: 'Our Approach',
            content: 'We take a data-driven approach to help businesses identify opportunities and overcome challenges.',
          },
          {
            languageId: 'vi',
            title: 'Cách tiếp cận của chúng tôi',
            content: 'Chúng tôi sử dụng cách tiếp cận dựa trên dữ liệu để giúp doanh nghiệp xác định cơ hội và vượt qua thách thức.',
          },
          {
            languageId: 'fr',
            title: 'Notre approche',
            content: 'Nous adoptons une approche basée sur les données pour aider les entreprises à identifier les opportunités et à surmonter les défis.',
          },
        ],
      },
    ],
  },
  {
    id: '4',
    categoryId: '7', // About Us
    slug: 'company-history',
    isActive: true,
    createdAt: '2023-02-15T00:00:00Z',
    updatedAt: '2023-02-15T00:00:00Z',
    languages: [
      {
        languageId: 'en',
        title: 'Company History',
        description: 'The story of our company from founding to present',
      },
      {
        languageId: 'vi',
        title: 'Lịch sử công ty',
        description: 'Câu chuyện về công ty chúng tôi từ khi thành lập đến hiện tại',
      },
      {
        languageId: 'fr',
        title: 'Histoire de l\'entreprise',
        description: 'L\'histoire de notre entreprise de sa fondation à aujourd\'hui',
      },
    ],
    imageIds: ['3', '5'],
    contentDetails: [
      {
        id: '5',
        contentId: '4',
        order: 1,
        imageIds: ['3'],
        languages: [
          {
            languageId: 'en',
            title: 'Our Beginning',
            content: 'Founded in 2005, our company started with a mission to revolutionize the tech industry.',
          },
          {
            languageId: 'vi',
            title: 'Sự khởi đầu của chúng tôi',
            content: 'Được thành lập vào năm 2005, công ty chúng tôi bắt đầu với sứ mệnh cách mạng hóa ngành công nghệ.',
          },
          {
            languageId: 'fr',
            title: 'Notre début',
            content: 'Fondée en 2005, notre entreprise a commencé avec la mission de révolutionner l\'industrie technologique.',
          },
        ],
      },
      {
        id: '6',
        contentId: '4',
        order: 2,
        imageIds: ['5'],
        languages: [
          {
            languageId: 'en',
            title: 'Growth and Expansion',
            content: 'In the last decade, we've expanded to 15 countries and grown our team to over 500 employees.',
          },
          {
            languageId: 'vi',
            title: 'Tăng trưởng và mở rộng',
            content: 'Trong thập kỷ qua, chúng tôi đã mở rộng đến 15 quốc gia và phát triển đội ngũ lên hơn 500 nhân viên.',
          },
          {
            languageId: 'fr',
            title: 'Croissance et expansion',
            content: 'Au cours de la dernière décennie, nous nous sommes étendus à 15 pays et avons développé notre équipe à plus de 500 employés.',
          },
        ],
      },
    ],
  },
];

// Page and Page Components
export type ComponentType = 
  | 'hero' 
  | 'feature-grid' 
  | 'content-with-image'
  | 'testimonials'
  | 'gallery'
  | 'team-members';

export interface PageComponent {
  id: string;
  pageId: string;
  type: ComponentType;
  order: number;
  settings: Record<string, any>;
  contentIds: string[];
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  components: PageComponent[];
}

export const pages: Page[] = [
  {
    id: '1',
    title: 'Home',
    slug: 'home',
    description: 'Main landing page',
    isActive: true,
    createdAt: '2023-01-10T00:00:00Z',
    updatedAt: '2023-02-20T00:00:00Z',
    components: [
      {
        id: '1',
        pageId: '1',
        type: 'hero',
        order: 1,
        settings: {
          backgroundColor: '#f5f7ff',
          textColor: '#333',
          alignment: 'center',
        },
        contentIds: ['4'],
      },
      {
        id: '2',
        pageId: '1',
        type: 'feature-grid',
        order: 2,
        settings: {
          columns: 3,
          showImages: true,
        },
        contentIds: ['1', '2', '3'],
      },
      {
        id: '3',
        pageId: '1',
        type: 'content-with-image',
        order: 3,
        settings: {
          imagePosition: 'right',
          backgroundColor: '#ffffff',
        },
        contentIds: ['2'],
      },
    ],
  },
  {
    id: '2',
    title: 'Products',
    slug: 'products',
    description: 'Products overview page',
    isActive: true,
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: '2023-02-18T00:00:00Z',
    components: [
      {
        id: '4',
        pageId: '2',
        type: 'hero',
        order: 1,
        settings: {
          backgroundColor: '#eef2ff',
          textColor: '#111',
          alignment: 'left',
        },
        contentIds: ['1'],
      },
      {
        id: '5',
        pageId: '2',
        type: 'gallery',
        order: 2,
        settings: {
          columns: 2,
          showCaptions: true,
        },
        contentIds: ['1', '2'],
      },
    ],
  },
  {
    id: '3',
    title: 'About Us',
    slug: 'about-us',
    description: 'Company information page',
    isActive: true,
    createdAt: '2023-01-20T00:00:00Z',
    updatedAt: '2023-02-15T00:00:00Z',
    components: [
      {
        id: '6',
        pageId: '3',
        type: 'content-with-image',
        order: 1,
        settings: {
          imagePosition: 'left',
          backgroundColor: '#ffffff',
        },
        contentIds: ['4'],
      },
      {
        id: '7',
        pageId: '3',
        type: 'team-members',
        order: 2,
        settings: {
          layout: 'grid',
          showSocialLinks: true,
        },
        contentIds: ['4'],
      },
    ],
  },
];
