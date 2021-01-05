import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ServiceManagerService} from '../service/service-manager.service';

@Component({
  selector: 'app-service-delete-dialog',
  templateUrl: './service-delete-dialog.component.html',
  styleUrls: ['./service-delete-dialog.component.css']
})
export class ServiceDeleteDialogComponent implements OnInit {
  public serviceName;
  public idService;

  constructor(
    public dialogRef: MatDialogRef<ServiceDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private serviceService: ServiceManagerService,
  ) {
  }

  ngOnInit(): void {
    this.idService = this.data.data1.idService;
    this.serviceName = this.data.data1.serviceName;
  }

  // tslint:disable-next-line:typedef
  deleteService() {
    // @ts-ignore
    this.serviceService.deleteService(this.idService).subscribe(data => {
      this.dialogRef.close();
    });
  }
  // tslint:disable-next-line:typedef
  closeDialog() {
    this.dialogRef.close();
  }

}
