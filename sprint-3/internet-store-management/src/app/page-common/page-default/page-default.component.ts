import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {RequestServiceComponent} from '../../service-request-manager/component/request-service/request-service.component';

@Component({
  selector: 'app-page-default',
  templateUrl: './page-default.component.html',
  styleUrls: ['./page-default.component.css']
})
export class PageDefaultComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  openBoxRequest() {
    const dialogRef = this.dialog.open(RequestServiceComponent, {
      panelClass: 'app-full-bleed-dialog',
      width: '800px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
