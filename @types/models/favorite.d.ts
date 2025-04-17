interface Favorite {
  customer: number;
  id: string;
  product: Product;
}

type FavoritesResponse = ApiResponse<Favorite[]>;
type FavoriteResponse = ApiResponse<Favorite>;
