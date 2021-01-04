import { Component, OnInit } from '@angular/core';
import {Computer} from '../../model/Computer.class';
import {ComputerService} from '../../service/computer.service';
import {FormGroup} from '@angular/forms';
@Component({
  selector: 'app-computer-list',
  templateUrl: './computer-list.component.html',
  styleUrls: ['./computer-list.component.css']
})
export class ComputerListComponent implements OnInit {
  public computers: Computer[];
  settings = {
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
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="fas fa-trash"></i>',
    },
    actions: {
      title: 'Hành động',
      position: 'right'
    },
    columns: {
      computerName: {
        title: 'Tên máy'
      },
      statusComputerName: {
        title: 'Tình trạng'
      },
      timeStart: {
        title: 'Thời gian bắt đầu(giờ:phút)'
      },
      timeUser: {
        title: 'Thời gian sử dụng'
      }
    }
  };

  constructor(
    public computerService: ComputerService
  ) {
  }

  ngOnInit(): void {
    this.computerService.getAllComputer().subscribe(data => {
      this.computers = data;
      console.log(this.computers);
    });
  }

  onAddConfirm(event): void {
    // if (window.confirm('Are you sure you want to save?')) {
    // call to remote api, remember that you have to await this
    event.confirm.resolve(event.newData);
    console.log(event.newData);
    this.computerService.addNewComputer(event.newData).subscribe(data => {
      console.log(data);
      // tslint:disable-next-line:no-unused-expression
    }), err => {
      console.log(err);
    };
  }
  onEditConfirm(event): void {
    // if (window.confirm('Are you sure you want to save?')) {
    // call to remote api, remember that you have to await this
    event.confirm.resolve(event.newData);
    console.log(event.newData.idComputer);
    this.computerService.editComputer(event.newData.idComputer, event.newData).subscribe(data => {
      console.log(data);
      // tslint:disable-next-line:no-unused-expression
    }), err => {
      console.log(err);
    };
  }
}
