import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/authService/auth.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  constructor(private authService: AuthService) { }
  isPostCreated = false;
  titleCtrl = new FormControl('', [Validators.required]);
  textCtrl = new FormControl('', [Validators.required]);
  createPostForm = new FormGroup({
    title: this.titleCtrl,
    text: this.textCtrl,
  });
  ngOnInit(): void {
  }
  createPost() {
    this.authService.createPost(this.titleCtrl.value, this.textCtrl.value).subscribe(value => {
      console.log('createdPost: ', value);
      if (value) {
        this.isPostCreated = true;
      }
    });
  }
}
