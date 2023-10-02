export interface IMovie {
  _id: number | string;
  title: string;
  year: any;
  extract: string;
  imageUrl?: string;
  nation: string;
  duration: string;
  categories: [any] | any;
  episode: [];
}
