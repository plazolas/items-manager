import {Article} from './article';
export interface ArticleList {
  status: string;
  totlaResults: string;
  articles: Article[];
}