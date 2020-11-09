import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/authService/auth.service';
import {IUser} from '../../types';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  public users: IUser[];
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(): void {
    this.authService.getUsers().subscribe(value => {
      this.users = value;
      console.log('users: ', value);
    });
  }
  navigateToAlbum(id: number): void {
    this.router.navigate([`./${id}`], {relativeTo: this.route});
  }

}
