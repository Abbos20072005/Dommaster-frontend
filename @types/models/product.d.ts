interface Product {
  categories: Category[];
  cover_image: string;
  description: string;
  id: number;
  images: string[];
  product_count: number;
  title: string;
  price: {
    gold: number;
    retail: number;
  };
}
