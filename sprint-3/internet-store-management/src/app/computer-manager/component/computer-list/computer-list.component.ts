import { Component, OnInit } from '@angular/core';
import {Computer} from '../../model/Computer.class';
import {ComputerService} from '../../service/computer.service';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-computer-list',
  templateUrl: './computer-list.component.html',
  styleUrls: ['./computer-list.component.css']
})
export class ComputerListComponent implements OnInit {
  public computers: Computer[];
  formService: FormArray = this.fb.array([]);
  p: number;
  notification = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private computerService: ComputerService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.computerService.getAllComputer().subscribe(data => {
      console.log(data);
      if (data === []) {
        this.addFormService();
      } else {
        (data as []).forEach((service: any) => {
          this.formService.push(this.fb.group({
            idComputer: [service.idComputer],
            computerName: [service.computerName],
            timeStart: [service.timeStart],
            timeUser: [service.timeUser],
            status: [service.status],
            // unit: [service.unit]
          }));
        });
      }
    });
  }
  addFormService(): void {
    this.formService.push(this.fb.group({
      idComputer: [0],
      computerName: ['', [Validators.required]],
      // statusComputer: ['', [Validators.required]],
      timeStart: ['', [Validators.required]],
      timeUser: ['', [Validators.required]],
      status: ['', [Validators.required]],
      // quantity: ['', [Validators.required, Validators.pattern(/^[1-9]{1,3}$/)]],
      // unit: ['', [Validators.required, Validators.pattern(/^[a-zA-Zà-ỹÀ-Ỹ_0-9\s]{2,6}$/)]]
    }));
  }

  onDelete(value: any, i: number): void{
  }

  recordSubmit(fg): void {
    if (fg.value.idComputer === 0) {
      this.computerService.addNewComputer(fg.value).subscribe(data => {
        fg.patchValue({idComputer: data.idComputer});
        this.toastr.success('Thêm máy thành công!', 'Xin Chúc Mừng!');
        // this.showNotification('insert');
      });
    } else {
      this.computerService.editComputer(fg.value.idComputer, fg.value).subscribe(data => {
        // this.showNotification('update');
      });
    }
  }
}
