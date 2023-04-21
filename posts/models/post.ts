export interface IPost {
  id: string;
  title: string;
}

export interface IPosts {
  [index: string]: IPost;
}
