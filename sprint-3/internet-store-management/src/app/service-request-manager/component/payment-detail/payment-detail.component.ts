import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {RequestServiceService} from '../../service/request-service.service';
import {Service} from '../../model/service.class';
import {Bill_service} from '../../model/bill_service';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.css']
})
export class PaymentDetailComponent implements OnInit {
  public getData;
  public userName: string;
  public idBill: number;
  public computerName: string;
  public moneyAccount: number;
  public listBill = [];
  public status: boolean;
  public totalPaymentMoney: number;
  public billServices: Bill_service[] = [];

  constructor(
    private request: RequestServiceService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<PaymentDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit(): void {
    this.getData = this.data.dataBill;
    this.idBill = this.data.dataBill.idBill;
    this.userName = this.data.dataBill.user.username;
    this.moneyAccount = this.data.dataBill.user.money;
    this.status = this.data.dataBill.status;
    this.listBill = this.data.dataBill.billServiceCollection;
    console.log(this.listBill);
// tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.listBill.length; i++) {
      // tslint:disable-next-line:max-line-length
      this.billServices.push(new Bill_service(this.listBill[i].services.serviceName, this.listBill[i].services.price, this.listBill[i].quantityBooked));
    }
    console.log(this.billServices);
    this.totalPaymentMoney = 0;
    for (const element of this.billServices) {
      this.totalPaymentMoney += element.priceService * element.quantityBook;
    }
    console.log(this.totalPaymentMoney);
  }

  openDialogSetStatus(idBill: number): void {
    this.request.setStatusBill(idBill).subscribe(data => {
      this.dialogRef.close();
    });
  }
}
