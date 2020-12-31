import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  public username;
  public userOfId;
  public fullName;
  public email;
  public password;
  public birthday;
  public image;
  public gender;

  constructor(
    private dialogRef: MatDialogRef<UserDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private router: Router,
    private  dialog: MatDialog,
    private title: Title
  ) {
  }

  ngOnInit(): void {
    this.title.setTitle('User');
    this.userOfId = this.data.data1.idUser;
    this.username = this.data.data1.username;
    this.email = this.data.data1.email;
    this.fullName = this.data.data1.fullName;
    this.birthday = this.data.data1.birthday;
    this.image = this.data.data1.image;
    this.password = this.data.data1.password;
    if (this.data.data1.gender){
      this.gender = 'Nam';
    }else {
      this.gender = 'Nữ';
    }
  }

}
