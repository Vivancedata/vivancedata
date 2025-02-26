import aiSolutionsImage from "@/public/images/ai-solutions.png";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  category: string;
  image: any;
  slug: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Generative AI in Business: Trends to Watch",
    excerpt: "Explore the emerging trends in generative AI and how they're reshaping business operations across industries.",
    date: "February 15, 2025",
    readTime: "8 min read",
    author: {
      name: "Dr. Emily Chen",
      role: "Chief AI Officer",
      avatar: "",
    },
    category: "AI Trends",
    image: aiSolutionsImage,
    slug: "future-of-generative-ai-in-business",
  },
  {
    id: "2",
    title: "Implementing Ethical AI: A Framework for Responsible Innovation",
    excerpt: "Learn how to develop and deploy AI solutions that are not only powerful but also ethical and responsible.",
    date: "February 8, 2025",
    readTime: "10 min read",
    author: {
      name: "Priya Patel",
      role: "AI Ethics Director",
      avatar: "",
    },
    category: "AI Ethics",
    image: aiSolutionsImage,
    slug: "implementing-ethical-ai-framework",
  },
  {
    id: "3",
    title: "How Predictive Analytics is Transforming Supply Chain Management",
    excerpt: "Discover how AI-powered predictive analytics is helping businesses optimize their supply chains and reduce costs.",
    date: "January 30, 2025",
    readTime: "7 min read",
    author: {
      name: "David Kim",
      role: "Lead Data Scientist",
      avatar: "",
    },
    category: "Predictive Analytics",
    image: aiSolutionsImage,
    slug: "predictive-analytics-supply-chain-management",
  },
];
