import {Component, OnInit, HostListener} from '@angular/core';
import {TokenStorageService} from '../../service/token-storage/token-storage.service';
import {Router} from '@angular/router';
import {RequestServiceComponent} from '../../../service-request-manager/component/request-service/request-service.component';
import {MatDialog} from '@angular/material/dialog';
import {AuthGuard} from '../../helper/auth.guard';
import {MessageComponent} from '../message/message.component';
import {HomePageComponent} from '../home-page/home-page.component';
import {AuthenticationService} from '../../service/auth/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  role: string;
  check = false;

  constructor(public dialog: MatDialog,
              private tokenStorageService: TokenStorageService,
              private authenticationService: AuthenticationService,
              private token: TokenStorageService) {
  }
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(): void {
    if (this.check === false){
      this.authenticationService.getMessage().subscribe(data => {
        this.check = data;
      });
    }
  }

  ngOnInit(): void {
    this.check = false;
    console.log(this.tokenStorageService.getUser());
    if (this.tokenStorageService.getUser() === null){
      this.role = '';
    }else {
      this.role = this.tokenStorageService.getUser().role[0];
    }
  }
  //  a hiên
  openBoxRequest(): void {
     if (this.token.getUser() !== null){
      const dialogRef = this.dialog.open(RequestServiceComponent, {
        panelClass: 'app-full-bleed-dialog',
        width: '820px',
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }else {
      this.dialog.open(MessageComponent, {
        disableClose: true
      });
    }
  }

}
