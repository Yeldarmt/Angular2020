import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router) {}
  title = 'midterm';
  token = localStorage.getItem('accessToken');

  logoutClicked() {
    localStorage.removeItem('accessToken');
    this.token = '';
    this.router.navigate(['/login']);
  }
}
