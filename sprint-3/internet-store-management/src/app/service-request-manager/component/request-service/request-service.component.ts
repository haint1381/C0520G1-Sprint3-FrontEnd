import {Component, Inject, OnInit} from '@angular/core';
import {RequestServiceService} from '../../service/request-service.service';
import {Service} from '../../model/service.class';
import {UserService} from '../../../user-manager/service/user.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MessageNotificationComponent} from '../message-notification/message-notification.component';
import {TokenStorageService} from '../../../page-common/service/token-storage/token-storage.service';
import {MessageSuccessComponent} from '../message-success/message-success.component';

@Component({
  selector: 'app-request-service',
  templateUrl: './request-service.component.html',
  styleUrls: ['./request-service.component.css']
})
export class RequestServiceComponent implements OnInit {
  public idUser: number;
  public listService: Service[] = [];
  public billService: Service[] = [];
  public totalMoney = 0;
  public moneyUser: number;
  public checkButtonPay = false;
  public checkMessagePaymentSuccess = false;
  public checkSubmitBill = false;
  public isPayDirect = false;
  public formBill: FormGroup;

  constructor(
    private token: TokenStorageService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<RequestServiceComponent>,
    private request: RequestServiceService,
    private userService: UserService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit(): void {
    this.idUser = this.token.getUser().id;
    console.log(this.idUser);
    this.request.getListService().subscribe(data => {
      this.listService = data;
    }, () => {
      console.log('Error');
    }, () => {
      for (const element of this.listService) {
        if (element.typeServices.idTypeServices === 1) {
          this.addServiceDrink(element);
        }
        if (element.typeServices.idTypeServices === 2) {
          this.addServiceFood(element);
        }
        if (element.typeServices.idTypeServices === 3) {
          this.addServiceCard(element);
        }
      }
    });
    this.userService.getByID(this.idUser).subscribe(data => {
      this.moneyUser = data.money;
    });
    this.formBill = this.fb.group({
      statusBill: [''],
      idUser: [this.idUser],
      listAllService: this.fb.group({
        listServiceRecordsDrink: this.fb.array([]),
        listServiceRecordsFood: this.fb.array([]),
        listServiceRecordsCard: this.fb.array([])
      })
    });
  }

  get listServiceRecordsDrink(): FormArray {
    return this.formBill.get('listAllService.listServiceRecordsDrink') as FormArray;
  }

  get listServiceRecordsFood(): FormArray {
    return this.formBill.get('listAllService.listServiceRecordsFood') as FormArray;
  }

  get listServiceRecordsCard(): FormArray {
    return this.formBill.get('listAllService.listServiceRecordsCard') as FormArray;
  }

  newService(serviceObj: Service): FormGroup {
    return this.fb.group({
      idService: serviceObj.idService,
      serviceName: serviceObj.serviceName,
      price: serviceObj.price,
      quantityPurchased: [serviceObj.quantityPurchased, [Validators.required]],
      quantity: serviceObj.quantity,
    });
  }

  addServiceDrink(serviceObj: Service): void {
    this.listServiceRecordsDrink.push(this.newService(serviceObj));
  }

  addServiceFood(serviceObj: Service): void {
    this.listServiceRecordsFood.push(this.newService(serviceObj));
  }

  addServiceCard(serviceObj: Service): void {
    this.listServiceRecordsCard.push(this.newService(serviceObj));
  }

  totalMoneyBooked(idService: number, quantity: number): void {
    for (const element of this.listService) {
      if (idService === element.idService) {
        element.quantityPurchased = quantity;
      }
    }
    this.totalMoney = 0;
    for (const element of this.listService) {
      if (element.quantityPurchased === undefined) {
        element.quantityPurchased = 0;
      }
      this.totalMoney += (element.quantityPurchased * element.price);
    }
  }

  formatNumber(value: string): number {
    return Number(value);
  }

  creatBillPaymentDirect(): void {
    this.billService = [];
    let listDrink: Service[];
    let listFood: Service[];
    let listCard: Service[];
    listDrink = this.formBill.value.listAllService.listServiceRecordsDrink;
    listFood = this.formBill.value.listAllService.listServiceRecordsFood;
    listCard = this.formBill.value.listAllService.listServiceRecordsCard;
    for (const item of listDrink) {
      if (item.quantityPurchased != null) {
        this.billService.push(item);
      }
    }
    for (const item of listFood) {
      if (item.quantityPurchased != null) {
        this.billService.push(item);
      }
    }
    for (const item of listCard) {
      if (item.quantityPurchased != null) {
        this.billService.push(item);
      }
    }
    this.formBill.removeControl('listAllService');
    this.formBill.addControl('list', this.fb.control(this.billService));
    this.request.creatBillPaymentDirect(this.formBill.value).subscribe(data => {
      this.dialogRef.close();
      this.openMessageSuccess();
    });
  }

  createBillPaymentByAccount(): void {
    this.billService = [];
    let listDrink: Service[];
    let listFood: Service[];
    let listCard: Service[];
    listDrink = this.formBill.value.listAllService.listServiceRecordsDrink;
    listFood = this.formBill.value.listAllService.listServiceRecordsFood;
    listCard = this.formBill.value.listAllService.listServiceRecordsCard;
    for (const item of listDrink) {
      if (item.quantityPurchased != null) {
        this.billService.push(item);
      }
    }
    for (const item of listFood) {
      if (item.quantityPurchased != null) {
        this.billService.push(item);
      }
    }
    for (const item of listCard) {
      if (item.quantityPurchased != null) {
        this.billService.push(item);
      }
    }
    this.formBill.removeControl('listAllService');
    this.formBill.addControl('list', this.fb.control(this.billService));
    console.log(this.formBill.value);
    this.request.createBillPaymentByAccount(this.formBill.value).subscribe(data => {
      this.dialogRef.close();
      this.openMessageSuccess();
    });
  }

  event(event): void {
    const value = event.target.value;
    // tslint:disable-next-line:triple-equals
    if (value == 0) {
      this.checkButtonPay = false;
      // tslint:disable-next-line:triple-equals
    } else if (value == 2) {
      this.checkButtonPay = true;
      this.checkSubmitBill = false;
      this.isPayDirect = false;
    } else {
      this.checkButtonPay = false;
      this.checkSubmitBill = true;
      this.isPayDirect = true;
    }
  }

  payment(): void {
    if (this.moneyUser < this.totalMoney) {
      this.isPayDirect = false;
      this.openMessageNotificationFail();
    } else {
      this.moneyUser = this.moneyUser - this.totalMoney;
      this.checkButtonPay = false;
      this.checkMessagePaymentSuccess = true;
      this.isPayDirect = true;
    }
  }

  openMessageNotificationFail(): void {
    const dialogRef = this.dialog.open(MessageNotificationComponent, {
      panelClass: 'app-full-bleed-dialog',
      width: '500px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  // tslint:disable-next-line:typedef
  openMessageSuccess() {
    const timeout = 1800;
    const dialogRef = this.dialog.open(MessageSuccessComponent, {
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
