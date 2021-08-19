import {PaginatedResult} from "@core/models/pagination";

export interface Game {
  id: number;
  name: string;
  price: number;
  description: string;
  tags: string[];
}

export interface FeaturedGame extends Game {
  isInLibrary?: boolean;
}

export interface GamesPage extends PaginatedResult {
  games: FeaturedGame[];
}

export interface GamesFilter {
  name?: string;
  maxPrice?: number;
  tags?: string[];
}

export interface FilterComponentData {
  maxPrice?: number;
  tags?: string[];
}
