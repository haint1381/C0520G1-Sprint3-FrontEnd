import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../../service/user.service';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {MessgerUserComponent} from '../messger-user/messger-user.component';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {

  public username;
  public userOfId;
  public idMessage = 3;

  constructor(
    private dialogRef: MatDialogRef<UserDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private router: Router,
    private  dialog: MatDialog,
    private title: Title
  ) {
  }

  ngOnInit(): void {
    this.title.setTitle('User');
    this.username = this.data.data1.username;
    this.userOfId = this.data.data1.idUser;
  }

  delete(): void {
    this.userService.delete(this.userOfId).subscribe(data => {
      if (data == null){
        this.dialogRef.close();
        this.openDialogMessage();
      }
    }, error => {
      console.log(error);
    });
  }

  openDialogMessage(): void {
    const timeout = 1800;
    const dialogRef = this.dialog.open(MessgerUserComponent, {
      width: '400px',
      height: '200px',
      data: {dataMessage: this.idMessage},
      disableClose: true
    });
    dialogRef.afterOpened().subscribe(_ => {
      setTimeout(() => {
        dialogRef.close();
      }, timeout);
    });
  }

}
