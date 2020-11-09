import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IAlbum, IComment, IPhoto, IPost, IRegisterData, IUser} from '../../types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  serverUrl = 'http://localhost:3000';

  register(data: IRegisterData) {
    return this.http.post(`${this.serverUrl}/users`, {...data});
  }
  login(username: string, password: string) {
    return this.http.post(`${this.serverUrl}/sign-in`, {username, password});
  }

  getPosts() {
    return this.http.get<IPost[]>(`${this.serverUrl}/posts?_limit=20`);
  }
  getUserPosts(id: number) {
    return this.http.get<IPost[]>(`${this.serverUrl}/posts?userId=${id}&_limit=20`);
  }
  getUsers() {
    return this.http.get<IUser[]>(`${this.serverUrl}/users`);
  }
  getUserDetail(id: number) {
    return this.http.get<IUser>(`${this.serverUrl}/users/${id}`);
  }
  createPost(title: string, body: string) {
    return this.http.post(`${this.serverUrl}/posts`, {title, body, userId: +localStorage.getItem('userId')});
  }
  getPostComments(id: number) {
    return this.http.get<IComment[]>(`${this.serverUrl}/posts/${id}/comments?_limit=5`);
  }

  createComment(data: IComment) {
    return this.http.post<IComment>(`${this.serverUrl}/posts/${data.postId}/comments`, {...data});
  }
  getUserAlbums(id: number) {
    return this.http.get<IAlbum[]>(`${this.serverUrl}/albums?userId=${id}`);
  }
  getAlbumPhotos(id: number) {
    return this.http.get<IPhoto[]>(`${this.serverUrl}/photos?albumId=${id}&_limit=20`);
  }
}
