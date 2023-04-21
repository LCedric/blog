import { IPost } from './post';

export interface IComment {
  id: string;
  content: IPost;
  status: string;
}
