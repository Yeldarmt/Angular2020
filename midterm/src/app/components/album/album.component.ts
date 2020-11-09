import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/authService/auth.service';
import {IAlbum, IPhoto, IUser} from '../../types';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  constructor(private route: ActivatedRoute, private authService: AuthService) { }
  userId: number;
  userAlbums: IAlbum[];
  public currentUser: IUser;
  selectFormCtrl = new FormControl(0);
  albumPhotos: IPhoto[];
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.userId = +paramMap.get('userId');
      this.getUserAlbums(this.userId);
      this.getUser(this.userId);
    });
    console.log('albumsPhtosos', this.albumPhotos);
    this.selectFormCtrl.valueChanges.subscribe(id => {
      console.log('selected album id:', id);
      this.authService.getAlbumPhotos(id).subscribe(value => {
        this.albumPhotos = value;
        console.log('albumPhotos: ', value);
      });
    });
  }

  getUserAlbums(id: number) {
    this.authService.getUserAlbums(id).subscribe(value => {
      this.userAlbums = value;
      this.albumPhotos = [];
      console.log('albums: ', value);
    });
  }

  getUser(id: number) {
    this.authService.getUserDetail(id).subscribe(value => {
      this.currentUser = value;
      console.log('userDetail: ', value);
    });
  }

}
