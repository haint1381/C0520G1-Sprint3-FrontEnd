import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {UserDeleteComponent} from '../user-delete/user-delete.component';
import {MatDialog} from '@angular/material/dialog';
import {UserCreateComponent} from '../user-create/user-create.component';
import {UserEditComponent} from '../user-edit/user-edit.component';
import {UserDetailComponent} from '../user-detail/user-detail.component';
import {ChangePasswordComponent} from '../change-password/change-password.component';
import {TokenStorageService} from '../../../page-common/service/token-storage/token-storage.service';


function formatCash(str): void {
  return str.split('').reverse().reduce((prev, next, index) => {
    return ((index % 3) ? next : (next + '.')) + prev;
  });
}

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
    private token: TokenStorageService
  ) {
  }

  ngOnInit(): void {
    if (this.token.getUser() !== null) {
      // tslint:disable-next-line:triple-equals
      if (this.token.getUser().id == 1) {
        this.title.setTitle('User');
        this.sizeMSG = 'Không có kết quả nào!';
        this.userService.getAll().subscribe(data => {
          this.userList = data;
          if (this.userList != null) {
            // tslint:disable-next-line:prefer-for-of
            // for (let i = 0; i < this.userList.length; i++) {
            //   this.userList[i].money = formatCash(this.userList[i].money);
            // }
            this.sizeMSG = this.userList.length + '';
          }
          this.sendMessage();
        });
      } else {
        this.router.navigateByUrl('/error-page');
      }
    } else {
      this.router.navigateByUrl('/error-page');
    }
  }

  openDialogDelete(id): void {
    this.userService.getByID(id).subscribe(dataUser => {
      const dialogRef = this.dialog.open(UserDeleteComponent, {
        height: '300px',
        maxHeight: '250px',
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
      width: '670px',
      maxHeight: '90vh',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  openDialogEdit(id): void {
    this.userService.getByID(id).subscribe(dataUser => {
      const dialogRef = this.dialog.open(UserEditComponent, {
        width: '600px',
        maxHeight: '90vh',
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
        maxHeight: '500px',
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

  search(): void {
    this.p = 0;
    this.userService.searchUsers(this.valueSearch.trim()).subscribe(dataSearch => {
      this.userList = dataSearch;
      console.log(this.valueSearch);
    });
  }

  openDialogChangePass(id): void {
    this.userService.getByID(id).subscribe(dataUser => {
      const dialogRef = this.dialog.open(ChangePasswordComponent, {
        width: '450px',
        maxHeight: '400px',
        data: {dataC: dataUser.idUser},
        disableClose: true
      });
      console.log('data:' + dataUser.idUser);
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.ngOnInit();
      });
    });
  }
}
