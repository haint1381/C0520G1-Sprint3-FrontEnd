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
  public code: number;
  public userName: string;
  public idBill: number;
  public computerName: string;
  public moneyAccount: number;
  public listBill = [];
  public status: boolean;
  public totalPaymentMoney: number;
  public totalPayDeposit: number;
  public idBillService: number;

  public billServices: Bill_service[] = [];
  public billDeposit: Bill_service[] = [];

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
    this.code = this.listBill[0].services.typeServices.idTypeServices;
    this.idBillService = this.listBill[0].idBillService;
    if (this.code !== 4) {
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
    } else if (this.code === 4) {
      // tslint:disable-next-line:max-line-length
      this.billDeposit.push(new Bill_service(this.listBill[0].services.serviceName, this.listBill[0].services.price, this.listBill[0].quantityBooked));
      for (const element of this.billDeposit) {
        this.totalPayDeposit = element.priceService;
      }
    }
  }

  openDialogSetStatus(idBill: number): void {
    this.request.setStatusBill(idBill).subscribe(data => {
      this.dialogRef.close();
    });
  }

  openDialogPayDeposit(idBill: number): void {
    this.request.payDeposit(idBill).subscribe(data => {
      this.dialogRef.close();
    });
  }
}
