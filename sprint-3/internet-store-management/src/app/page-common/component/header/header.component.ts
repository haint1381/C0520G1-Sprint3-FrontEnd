import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../service/token-storage/token-storage.service';
import {Router} from '@angular/router';
import {RequestServiceComponent} from '../../../service-request-manager/component/request-service/request-service.component';
import {MatDialog} from '@angular/material/dialog';
import {AuthGuard} from '../../helper/auth.guard';
import {MessageComponent} from '../message/message.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  role: string;
  constructor(public dialog: MatDialog,
              private tokenStorageService: TokenStorageService,
              private token: TokenStorageService) {
  }
  ngOnInit(): void {
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
        width: '800px',
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
