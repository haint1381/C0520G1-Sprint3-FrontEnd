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

}
