import {Component, Inject, OnInit} from '@angular/core';
import {RequestServiceService} from '../../service/request-service.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../../../user-manager/service/user.service';
import {MessageSuccessComponent} from '../message-success/message-success.component';
import {MessageBuyHourComponent} from '../message-buy-hour/message-buy-hour.component';

@Component({
  selector: 'app-payment-buy-hour',
  templateUrl: './payment-buy-hour.component.html',
  styleUrls: ['./payment-buy-hour.component.css']
})
export class PaymentBuyHourComponent implements OnInit {
  public idUser: string;
  public priceHour: string;
  public price: string;
  public hour: string;
  public checkConditions = false;
  public moneyUser: number;

  constructor(
    private userService: UserService,
    private request: RequestServiceService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<PaymentBuyHourComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit(): void {
    this.idUser = this.data.dataId;
    this.priceHour = this.formatCash(this.data.dataPrice);
    this.price = this.data.dataPrice;
    this.hour = this.data.dataHour;
    console.log(this.idUser);
    console.log(this.priceHour);
    // tslint:disable-next-line:radix
    this.userService.getByID(parseInt(this.idUser)).subscribe(data => {
      this.moneyUser = data.money;
      console.log(this.moneyUser);
    });
  }

  // tslint:disable-next-line:typedef
  formatCash(str) {
    return str.split('').reverse().reduce((prev, next, index) => {
      return ((index % 3) ? next : (next + ',')) + prev;
    });
  }

  paymentHours(): void {
    // tslint:disable-next-line:radix
    if (this.moneyUser < parseInt(this.price)) {
      this.checkConditions = true;
    } else {
      this.request.buyHourOfUser(this.idUser, this.price).subscribe(data => {
        this.dialogRef.close();
        this.messageSuccessBuyHour();
      });
    }
  }

  // tslint:disable-next-line:typedef
  messageSuccessBuyHour() {
    const timeout = 1800;
    const dialogRef = this.dialog.open(MessageBuyHourComponent, {
      panelClass: 'app-full-bleed-dialog',
      width: '500px',
      disableClose: true
    });
    dialogRef.afterOpened().subscribe(_ => {
      setTimeout(() => {
        dialogRef.close();
      }, timeout);
    });
  }
}
