import { Component, OnInit } from '@angular/core';
import {ServiceManagerService} from '../service/service-manager.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-service-manager',
  templateUrl: './service-manager.component.html',
  styleUrls: ['./service-manager.component.css']
})
export class ServiceManagerComponent implements OnInit {
  settings = {
    columns: {
      serviceName: {
        title: 'Tên dịch vụ'
      },
      price: {
        title: 'Giá (vnd)'
      },
      unit: {
        title: 'Đơn vị'
      },
      quantity: {
        title: 'Số lượng'
      }
    },
    add: {
      addButtonContent: '<i class="fas fa-plus"></i>',
      createButtonContent: '<i class="fas fa-check"></i>',
      cancelButtonContent: '<i class="fas fa-times"></i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="fas fa-tools"></i>',
      saveButtonContent: '<i class="fas fa-check"></i>',
      cancelButtonContent: '<i class="fas fa-times"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="fas fa-trash"></i>',
    },
    actions: {
      title: 'Hành động',
      position: 'right'
    },
    pager: {
      display: true,
      perPage: 6,
    }
  };
  public services: any;
  p: any;
  constructor(public serviceManager: ServiceManagerService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.serviceManager.getAllService().subscribe( data => {
      this.services = data;
      console.log(data);
    }, error => console.log(error));
  }

}
