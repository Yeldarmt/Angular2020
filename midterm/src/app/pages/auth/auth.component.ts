import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/authService/auth.service';
import {IRegisterData, IRegisterResponse} from '../../types';
import { Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  public userId: number;
  loginCtrl = new FormControl('', [Validators.required]);
  passwordCtrl = new FormControl('', [Validators.required]);
  loginForm = new FormGroup({
    login: this.loginCtrl,
    password: this.passwordCtrl,
  });

  usernameCtrl = new FormControl('', [Validators.required]);
  regPasswordCtrl = new FormControl('', [Validators.required]);
  emailCtrl = new FormControl('', [Validators.required]);
  phoneCtrl = new FormControl('', [Validators.required]);
  nameCtrl = new FormControl('', [Validators.required]);
  websiteCtrl = new FormControl('', [Validators.required]);
  registerForm = new FormGroup({
    username: this.usernameCtrl,
    password: this.regPasswordCtrl,
    name: this.nameCtrl,
    email: this.emailCtrl,
    phone: this.phoneCtrl,
    website: this.websiteCtrl,
  });

  ngOnInit(): void {
  }

  loginSubmit(): void {
    this.authService.login(this.loginCtrl.value, this.passwordCtrl.value).subscribe((value: any) => {
      console.log('loginValue: ', value, value.access_token);
      localStorage.setItem('accessToken', value.access_token);
      localStorage.setItem('userId', value.userId);
      if (value.access_token) {
        this.router.navigate(['/posts']);
      }
    });
  }
  registerSubmit(): void {
    const registerData: IRegisterData = {
      username: this.usernameCtrl.value,
      password: this.regPasswordCtrl.value,
      name: this.nameCtrl.value,
      email: this.emailCtrl.value,
      phone: this.phoneCtrl.value,
      website: this.websiteCtrl.value,
    };
    console.log('register', this.registerForm, registerData);
    this.authService.register(registerData).subscribe((user: IRegisterResponse) => {
      console.log(user);
      this.userId = user.id;
    });
  }

}
