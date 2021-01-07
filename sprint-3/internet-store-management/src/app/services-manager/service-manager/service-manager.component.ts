import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ServiceManagerService} from '../service/service-manager.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ServiceDeleteDialogComponent} from '../service-delete-dialog/service-delete-dialog.component';
import {TokenStorageService} from '../../page-common/service/token-storage/token-storage.service';

@Component({
  selector: 'app-service-manager',
  templateUrl: './service-manager.component.html',
  styleUrls: ['./service-manager.component.css']
})
export class ServiceManagerComponent implements OnInit {
  formService: FormArray = this.fb.array([]);
  p: number;
  notification = null;
  result: any;
  typeServiceList: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private servicesService: ServiceManagerService,
    public dialog: MatDialog,
    private token: TokenStorageService
  ) {
  }

  ngOnInit(): void {
    if (this.token.getUser() !== null) {
      if (this.token.getUser().id == 1) {
        this.servicesService.getAllService().subscribe(data => {
          if (data === []) {
            this.addFormService();
          } else {
            (data as []).forEach((service: any) => {
              this.formService.push(this.fb.group({
                idService: [service.idService],
                serviceName: [service.serviceName],
                price: [service.price],
                quantity: [service.quantity],
                unit: [service.unit]
              }));
            });
          }
        });
      } else {
        this.router.navigateByUrl('/error-page');
      }
    } else {
      this.router.navigateByUrl('/error-page');
    }
  }

  addFormService(): void {
    this.formService.insert(0, this.fb.group({
      idService: [0],
      serviceName: ['', [Validators.required, Validators.pattern(/^[a-zA-Zà-ỹÀ-Ỹ_0-9\s]{3,20}$/)]],
      price: ['', [Validators.required, Validators.pattern(/^[\d.]{3,6}$/)]],
      quantity: ['', [Validators.required, Validators.pattern(/^\d{1,3}$/)]],
      unit: ['', [Validators.required, Validators.pattern(/^[a-zA-Zà-ỹÀ-Ỹ_0-9\s]{2,6}$/)]]
    }));
  }

  // tslint:disable-next-line:typedef
  recordSubmit(fg) {
    if (fg.value.idService === 0) {
      this.servicesService.addNewService(fg.value).subscribe(data => {
        fg.patchValue({idService: data.idService});
        this.showNotification('insert');
      });
    } else {
      this.servicesService.updateService(fg.value.idService, fg.value).subscribe(data => {
        this.showNotification('update');
      });
    }
  }

  onDelete(idService, i) {
    if (idService === 0) {
      this.formService.removeAt(i);
    } else {
      this.servicesService.getServiceById(idService).subscribe(dataService => {
        const dialogRef = this.dialog.open(ServiceDeleteDialogComponent, {
          width: '500px',
          data: {data1: dataService}
        });
        dialogRef.afterClosed().subscribe(result => {
          this.result = result;
          if (this.result === 1) {
            this.formService.removeAt(i);
            this.showNotification('delete');
          }
        });
      });
    }
  }

  // tslint:disable-next-line:typedef
  showNotification(category) {
    switch (category) {
      case 'insert':
        this.notification = {class: 'text-success', message: 'Lưu thành công'};
        break;
      case 'update':
        this.notification = {class: 'text-primary', message: 'Chỉnh sửa thành công'};
        break;
      case 'delete':
        this.notification = {class: 'text-danger', message: 'Xóa thành công'};
        break;
    }
    setTimeout(() => {
      this.notification = null;
    }, 5000);
  }
}
