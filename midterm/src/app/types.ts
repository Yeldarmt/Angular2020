export interface IRegisterData {
  email: string;
  name: string;
  password: string;
  phone: string;
  username: string;
  website: string;
}

export interface IRegisterResponse {
  data: IRegisterData;
  id: number;
}
export interface IPost {
  body: string;
  id: number;
  title: string;
  userId: number;
}
export interface IUser {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
}
export interface IComment {
  postId: number;
  id?: number;
  name: string;
  email: string;
  body: string;
}

export interface IAlbum {
  userId: number;
  id: number;
  title: string;
}
export interface IPhoto {
  id: number;
  title: string;
  albumId: number;
  url: string;
  thumbnailUrl: string;
}
