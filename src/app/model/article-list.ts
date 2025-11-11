import {Article} from './article';
export interface ArticleList {
  status: string;
  totalResults: string;
  articles: Article[];
}