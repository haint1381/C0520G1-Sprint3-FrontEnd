import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {UserDeleteComponent} from '../user-delete/user-delete.component';
import {MatDialog} from '@angular/material/dialog';
import {UserCreateComponent} from '../user-create/user-create.component';
import {UserEditComponent} from '../user-edit/user-edit.component';
import {UserDetailComponent} from '../user-detail/user-detail.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public userList = [];
  public valueSearch: string;
  public sizeMSG: string;
  public createMSG = '';
  public editMSG = '';
  public deleteMSG = '';
  p: any;

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
  ) {
  }

  ngOnInit(): void {
    this.title.setTitle('User');
    this.sizeMSG = 'Không có kết quả nào!';
    this.userService.getAll().subscribe(data => {
      this.userList = data;
      if (this.userList != null) {
        this.sizeMSG = this.userList.length + '';
      }
      console.log(this.userList);
      this.sendMessage();
    });
  }

  openDialogDelete(id): void {
    this.userService.getByID(id).subscribe(dataUser => {
      const dialogRef = this.dialog.open(UserDeleteComponent, {
        height: '300px',
        width: '450px',
        data: {data1: dataUser},
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.ngOnInit();
      });
    });
  }

  openDialogCreate(): void {
    const dialogRef = this.dialog.open(UserCreateComponent, {
      width: '750px',
      maxHeight: '100vh',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  openDialogEdit(id): void {
    this.userService.getByID(id).subscribe(dataUser => {
      const dialogRef = this.dialog.open(UserEditComponent, {
        panelClass: 'app-full-bleed-dialog',
        width: '750px',
        maxHeight: '100vh',
        data: {dataC: dataUser.idUser, dataD: dataUser.gender},
        disableClose: true
      });
      console.log('data:' + dataUser.idUser);
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.ngOnInit();
      });
    });
  }

  openDialogDetail(id): void {
    this.userService.getByID(id).subscribe(dataUser => {
      const dialogRef = this.dialog.open(UserDetailComponent, {
        width: '650px',
        maxHeight: '400px',
        data: {data1: dataUser},
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.ngOnInit();
      });
    });
  }

  sendMessage(): void {
    this.createMSG = this.route.snapshot.queryParamMap.get('create_msg');
    this.editMSG = this.route.snapshot.queryParamMap.get('edit_msg');
    this.deleteMSG = this.route.snapshot.queryParamMap.get('delete_msg');
  }

}
