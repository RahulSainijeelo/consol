export type Service = {
  id: string;
  title: string;
  description: string;
  imageUrl: string; // Using public stock photos from Pexels
};

export const services: Service[] = [
  {
    id: "web-development",
    title: "Web Development",
    description: "Full-stack web development using modern technologies like React, Next.js, Node.js, and Python. Building responsive, scalable, and high-performance web applications.",
    imageUrl: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1280"
  },
  {
    id: "app-development",
    title: "App Development",
    description: "Native and cross-platform mobile app development for iOS and Android using React Native, Flutter, Swift, and Kotlin. Creating user-friendly mobile solutions.",
    imageUrl: "https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=1280"
  },
  {
    id: "ai-ml",
    title: "AI/ML Solutions",
    description: "Artificial Intelligence and Machine Learning solutions including predictive analytics, NLP, computer vision, and custom AI models using Python, TensorFlow, and PyTorch.",
    imageUrl: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1280"
  },
  {
    id: "blockchain",
    title: "Blockchain Development",
    description: "Smart contract development, DeFi applications, NFT platforms, and decentralized applications (DApps) using Solidity, Web3, Ethereum, and other blockchain technologies.",
    imageUrl: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=1280"
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description: "User-centered design solutions including wireframing, prototyping, user research, and creating intuitive interfaces using Figma, Adobe XD, and modern design principles.",
    imageUrl: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1280"
  }
];

// Portfolio items data
export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  images:[string];
  description: string;
};

export const portfolioItems: PortfolioItem[] = [
  {
    id: "portfolio-1",
    title: "E-commerce Platform",
    category: "Web Development",
    images:[ "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1280"],
    description: "Full-stack e-commerce website with payment integration and admin dashboard using React, Next.js, and Node.js."
  },
  {
    id: "portfolio-2",
    title: "Fitness Tracking App",
    category: "App Development",
    images:[ "https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=1280"],
    description: "Cross-platform mobile app built with React Native featuring workout tracking, progress analytics, and social features."
  },
  {
    id: "portfolio-3",
    title: "AI Chatbot System",
    category: "AI/ML",
    images:[ "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1280"],
    description: "Intelligent customer service chatbot using NLP and machine learning to handle 80% of customer queries automatically."
  },
  {
    id: "portfolio-4",
    title: "DeFi Trading Platform",
    category: "Blockchain",
    images: ["https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=1280"],
    description: "Decentralized finance platform with smart contracts for automated trading and yield farming on Ethereum."
  },
  {
    id: "portfolio-5",
    title: "SaaS Dashboard Design",
    category: "UI/UX Design",
    images:[ "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1280"],
    description: "Modern dashboard interface design for a SaaS platform with data visualization and user-friendly navigation."
  },
  {
    id: "portfolio-6",
    title: "Predictive Analytics Tool",
    category: "AI/ML",
    images: ["https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1280"],
    description: "Machine learning model for sales forecasting and inventory management using Python and TensorFlow."
  }
];

// Reviews data
export type Review = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
};

export const reviews: Review[] = [
  {
    id: "review-1",
    name: "Sarah Johnson",
    rating: 5,
    comment: "Outstanding web development work! Built our company website with React and Next.js. Professional, fast, and delivered exactly what we needed.",
    date: "2024-06-15"
  },
  {
    id: "review-2",
    name: "Mike Chen",
    rating: 5,
    comment: "Excellent mobile app development! Created our iOS and Android app using React Native. Great communication and technical expertise throughout.",
    date: "2024-07-22"
  },
  {
    id: "review-3",
    name: "Dr. Amanda Rodriguez",
    rating: 5,
    comment: "Brilliant AI/ML work! Developed a predictive model that improved our business efficiency by 40%. Highly skilled in Python and machine learning.",
    date: "2024-05-10"
  },
  {
    id: "review-4",
    name: "David Thompson",
    rating: 5,
    comment: "Amazing blockchain development! Built our DeFi platform with smart contracts. Deep knowledge of Solidity and Web3 technologies. Highly recommend!",
    date: "2024-08-19"
  },
  {
    id: "review-5",
    name: "Lisa Park",
    rating: 5,
    comment: "Exceptional UI/UX design work! Created beautiful, user-friendly interfaces for our SaaS platform. Great attention to detail and modern design principles.",
    date: "2024-04-08"
  }
];