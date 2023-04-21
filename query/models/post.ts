import { IComment } from './comment';

export interface IPost {
  id: string;
  title: string;
  comments: IComment[];
}

export interface IPosts {
  [index: string]: IPost;
}
