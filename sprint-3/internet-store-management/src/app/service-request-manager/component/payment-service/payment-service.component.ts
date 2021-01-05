import {Component, OnInit} from '@angular/core';
import {RequestServiceService} from '../../service/request-service.service';
import {MatDialog} from '@angular/material/dialog';
import {PaymentDetailComponent} from '../payment-detail/payment-detail.component';

@Component({
  selector: 'app-payment-service',
  templateUrl: './payment-service.component.html',
  styleUrls: ['./payment-service.component.css']
})
export class PaymentServiceComponent implements OnInit {
  public billList = [];
  p: any;
  public billId;

  constructor(
    private request: RequestServiceService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.request.getListBill().subscribe(data => {
      this.billList = data;
      console.log(data);
    });
  }

  openBillDetail(idBill): void {
    console.log(idBill);
    this.request.getBillByIdBill(idBill).subscribe(data => {
      const dialogRef = this.dialog.open(PaymentDetailComponent, {
        panelClass: 'app-full-bleed-dialog',
        width: '650px',
        data: {dataBill: data},
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.ngOnInit();
      });
    });
  }
}
