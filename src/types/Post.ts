export interface IPost {
  userId?: number;
  id?: number;
  title: string;
  body: string;
}

export interface IPostListRequest {
  title: string;
  userId: number;
}
