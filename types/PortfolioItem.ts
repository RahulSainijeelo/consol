export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  images: string[]; // <-- Use string[] for multiple images
}