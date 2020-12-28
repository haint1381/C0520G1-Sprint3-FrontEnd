import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {UserDeleteComponent} from '../user-delete/user-delete.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public userList;
  public valueSearch: string;
  public sizeMSG: string;
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
    this.title.setTitle('Asset');
    this.userList = [];
    this.sizeMSG = 'Không có kết quả nào!';
    this.userService.getAll().subscribe(data => {
      this.userList = data;
      this.sizeMSG = this.userList.length + '';
      console.log(this.userList);
    });
  }

  openDialogDelete(id): void {
    this.userService.getByID(id).subscribe(dataAsset => {
      const dialogRef = this.dialog.open(UserDeleteComponent, {
        height: '300px',
        width: '450px',
        data: {data1: dataAsset},
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.ngOnInit();
      });
    });
  }

}
