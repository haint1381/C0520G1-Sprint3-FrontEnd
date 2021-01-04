import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../service/token-storage/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {Title} from '@angular/platform-browser';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../service/auth/authentication.service';
import {User} from '../../model/User';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';
import {TokenDTO} from '../../model/TokenDTO';
import {RequestServiceComponent} from '../../../service-request-manager/component/request-service/request-service.component';
import {ResetPasswordComponent} from '../reset-password/reset-password.component';
import {MessageComponent} from '../message/message.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  public loginForm: FormGroup;
  isLoggedIn = false;
  errorMessage = '';
  successMessage = '';
  socialUser: SocialUser;
  user: User;
  constructor(
              private authenticationService: AuthenticationService,
              private tokenStorageService: TokenStorageService,
              private router: Router,
              public dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private  title: Title,
              private fb: FormBuilder,
              private authService: SocialAuthService) {
    this.title.setTitle('home-page');
  }
  ngOnInit(): void {
    // this.tokenStorageService.signOut();
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn === true) {
      this.user = this.tokenStorageService.getUser();
      // this.showAdminBoard = this.role.includes('ROLE_ADMIN');
      // this.showUserBoard = this.role.includes('ROLE_USER');
    }
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmitLogin(): void {
    console.log(this.loginForm.value);
    this.authenticationService.login(this.loginForm.value).subscribe(
      data => {
        this.tokenStorageService.saveToken(data.token);
        this.tokenStorageService.saveUser(data);
        console.log(data);
        this.isLoggedIn = true;
      },
      err => {
        this.errorMessage = 'Tên tài khoản và mật khẩu không hợp lệ !';
        setTimeout (() => {
          this.errorMessage = '';
        }, 2000);
        this.isLoggedIn = false;
      }, () => {
        this.reloadPage();
      }
    );
  }
  reloadPage(): void {
    window.location.reload();
  }
  logout(): void {
    this.tokenStorageService.signOut();
    this.reloadPage();
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      data => {
        this.socialUser = data;
        const token = new TokenDTO(this.socialUser.idToken);
        this.authenticationService.google(token).subscribe(next => {
          this.tokenStorageService.saveToken(next.accessToken);
          this.tokenStorageService.saveUser(next);
          this.isLoggedIn = true;
          this.reloadPage();
        }, err => {
          this.isLoggedIn = false;
        });
      }
    );
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      data => {
        this.socialUser = data;
        const token = new TokenDTO(this.socialUser.authToken);
        console.log(data);
        this.authenticationService.facebook(token).subscribe(next => {
          this.tokenStorageService.saveToken(next.accessToken);
          this.tokenStorageService.saveUser(next);
          //   console.log(next);
          this.isLoggedIn = true;
          this.reloadPage();
        }, err => {
          console.log('error');
          this.isLoggedIn = false;
        });
      }
    );
  }

  reset(): void {
    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      width: '500px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
