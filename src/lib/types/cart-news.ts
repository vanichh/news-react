export interface ICartNews {
  source: {
    id: null | string;
    name: string;
  };
  author: null | string;
  title: string;
  description: string;
  url: string;
  urlToImage: null | string;
  publishedAt: Date;
  content: string;
}
export interface Response {
  articles: ICartNews[];
  status: string;
  totalResults: number;
  message?: string;
}
