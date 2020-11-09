import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/authService/auth.service';
import {IComment, IPost, IUser} from '../../types';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  constructor(private authService: AuthService) { }
  public posts: IPost[] = [];
  public users: IUser[] = [];
  public currentUser: IUser;
  public comments: IComment[] = [];
  public createdComment: IComment;
  public selectedAuthorId: number;
  public selectedPostId: number;
  public writePostId: number;
  commentCtrl = new FormControl('', [Validators.required]);
  textCtrl = new FormControl('', [Validators.required]);
  commentForm = new FormGroup({
    comment: this.commentCtrl,
    text: this.textCtrl,
  });
  ngOnInit(): void {
    this.getPosts();
    this.getUsers();
    this.getUser();
  }

  getPosts() {
    this.authService.getPosts().subscribe(value => {
      this.posts = value;
      console.log('posts: ', value);
    });
  }
  getUsers() {
    this.authService.getUsers().subscribe(value => {
      this.users = value;
      console.log('users: ', value);
    });
  }
  getUser() {
    this.authService.getUserDetail(+localStorage.getItem('userId')).subscribe(value => {
      this.currentUser = value;
      console.log('userDetail: ', value);
    });
  }
  getUserPosts(id: number) {
    this.authService.getUserPosts(id).subscribe(value => {
      this.posts = value;
      console.log('posts: ', value);
    });
  }

  selectAuthor(id: number) {
    if (this.selectedAuthorId !== id) {
      this.selectedAuthorId = id;
      this.getUserPosts(id);
    } else {
      this.selectedAuthorId = undefined;
      this.getPosts();
    }
  }

  showComment(id: number) {
    this.writePostId = undefined;
    if (this.selectedPostId === id) {
      this.selectedPostId = undefined;
    } else {
      this.selectedPostId = id;
      this.authService.getPostComments(id).subscribe(value => {
        this.comments = value;
        console.log('comments: ', value);
      });
    }
  }
  showWriteComment(id: number) {
    this.selectedPostId = undefined;
    if (this.writePostId === id) {
      this.writePostId = undefined;
    } else {
      this.writePostId = id;
    }
  }

  createComment() {
    const newComment: IComment = {
      postId: this.writePostId,
      name: this.commentCtrl.value,
      email: this.currentUser.email,
      body: this.textCtrl.value,
    };
    console.log('newComment', newComment);
    this.authService.createComment(newComment).subscribe(value => {
      this.createdComment = value;
      console.log('createComment: ', value);
      if (this.createdComment) {
        this.commentCtrl.setValue('');
        this.textCtrl.setValue('');
      }
    });
  }

}
