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
    columns: {
      id: {
        title: 'ID'
      },
      name: {
        title: 'Full Name'
      },
      username: {
        title: 'User Name'
      },
      email: {
        title: 'Email'
      }
    }
  };
  constructor(
    public computerService: ComputerService
  ) { }

  ngOnInit(): void {
    this.computerService.getAllComputer().subscribe(data => {
      this.computers = data;
      console.log(this.computers);
    });
  }

}
