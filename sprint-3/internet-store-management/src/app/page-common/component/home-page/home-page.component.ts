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
import {DepositAccountComponent} from '../../../service-request-manager/component/deposit-account/deposit-account.component';
import {RequestServiceService} from '../../../service-request-manager/service/request-service.service';
import {PaymentBuyHourComponent} from '../../../service-request-manager/component/payment-buy-hour/payment-buy-hour.component';
import {MessageTimeComponent} from '../message-time/message-time.component';

function formatCash(str): void {
  return str.split('').reverse().reduce((prev, next, index) => {
    return ((index % 3) ? next : (next + '.')) + prev;
  });
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  public loginForm: FormGroup;
  isLoggedIn = false;
  errorMessage = '';
  socialUser: SocialUser;
  user: User;
  public idUser: number;
  public time: number;
  public priceGame = 0;
  public hour = 0;
  interval;

  startTimer(): void {
    this.interval = setInterval(() => {
      if (this.time > 0) {
        this.time -= 60000;
        this.authenticationService.saveUser(this.tokenStorageService.getUser().username, this.time).subscribe(next => {
        });
        if (this.time == 300000) {
          const dialogRef = this.dialog.open(MessageTimeComponent, {
            width: '500px',
            disableClose: true
          });
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
          });
        }
      } else if (this.time < 0) {
        this.authenticationService.findBy(this.tokenStorageService.getUser().username).subscribe(next => {
          this.time = next.timeRemaining;
        });
        console.log('oke hết time');
      }
    }, 2000);
  }

  transform(value: number, args?: any): string {

    const hours: number = Math.floor(value / 3600000);
    const minutes: number = ((value - hours * 3600000)) / 60000;

    if (hours < 10 && minutes < 10) {
      return '0' + hours + ' : 0' + ((value - hours * 3600000)) / 60000;
    }
    if (hours > 10 && minutes > 10) {
      return '0' + hours + ' : ' + ((value - hours * 3600000)) / 60000;
    }
    if (hours > 10 && minutes < 10) {
      return hours + ' : 0' + ((value - hours * 3600000)) / 60000;
    }
    if (minutes > 10) {
      return '0' + hours + ' : ' + ((value - hours * 3600000)) / 60000;
    }
  }

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
      this.startTimer();
      this.idUser = this.tokenStorageService.getUser().id;
      this.user = this.tokenStorageService.getUser();
      console.log(this.user);
      this.authenticationService.findBy(this.tokenStorageService.getUser().username).subscribe(next => {
        this.user = next;
        // @ts-ignore
        this.user.money = formatCash(this.user.money);
        this.time = next.timeRemaining;
      });
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
        setTimeout(() => {
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

  openDepositAccount(): void {
    const dialogRef = this.dialog.open(DepositAccountComponent, {
      panelClass: 'app-full-bleed-dialog',
      width: '350px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openPaymentHours(idUser: string, price: string, hour: string): void {
    console.log(idUser);
    const dialogRef = this.dialog.open(PaymentBuyHourComponent, {
      panelClass: 'app-full-bleed-dialog',
      width: '500px',
      data: {dataId: idUser, dataPrice: price, dataHour: hour},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      console.log('The dialog was closed');
    });
  }

  byHour(): void {
    this.priceGame = Math.floor((this.hour / 60) * 5000);
  }
}
