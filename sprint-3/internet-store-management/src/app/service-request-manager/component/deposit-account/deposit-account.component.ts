import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TokenStorageService} from '../../../page-common/service/token-storage/token-storage.service';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {RequestServiceService} from '../../service/request-service.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Service} from '../../model/service.class';
import {MessageSuccessComponent} from '../message-success/message-success.component';
import {ServiceManagerService} from '../../../services-manager/service/service-manager.service';

@Component({
  selector: 'app-deposit-account',
  templateUrl: './deposit-account.component.html',
  styleUrls: ['./deposit-account.component.css']
})
export class DepositAccountComponent implements OnInit {
  public listService: Service[] = [];
  public listDeposit: Service[] = [];
  public idUser: number;
  public formBill: FormGroup;
  public moneyService: number;
  public newService: Service;
  public checkSubmitDirect = false;
  public checkSubmitPayPal = false;
  public checkPaymentSuccess = false;
  public checkButtonPayPal = false;

  constructor(
    private token: TokenStorageService,
    public dialog: MatDialog,
    private request: RequestServiceService,
    private  serviceManager: ServiceManagerService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DepositAccountComponent>,
  ) {
  }

  @ViewChild('paypalRef', {static: true}) private paypalRef: ElementRef;

  ngOnInit(): void {
    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    matDialogConfig.position = {left: `72%`, top: `90px`};
    this.dialogRef.updatePosition(matDialogConfig.position);
    this.idUser = this.token.getUser().id;
    this.request.getListService().subscribe(data => {
      this.listService = data;
      console.log(this.listService);
      for (const element of this.listService) {
        if (element.typeServices.idTypeServices === 4) {
          this.listDeposit.push(element);
        }
      }
      console.log(this.listDeposit);
    });
    this.formBill = this.fb.group({
      idUser: [this.idUser],
      idService: ['', Validators.required],
    });
    paypal.Buttons(
      {
        style: {
          shape: 'rect',
          color: 'gold',
          layout: 'horizontal',
          label: 'paypal',
          tagline: true,
          height: 50
        },
        createOrder: (data, actions) => {
          // console.log('createOrder');
          // This function sets up the details of the transaction,
          // including the amount and line item details
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: this.moneyService,
                  currency_code: 'USD'
                }
              }
            ]
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then(details => {
            console.log('Transaction completed');
            this.checkPaymentSuccess = true;
            this.checkButtonPayPal = false;
            // $('#paypalStatusPayment').click();
            // @ts-ignore
            $('#paymentPayPal').click();
          });
        },
        onError: (data, actions) => {
          console.log('Transaction error');
          // @ts-ignore
          $('#refreshData').click();
        }

      }
    ).render(this.paypalRef.nativeElement);
  }

  createDeposit(): void {
    console.log(this.formBill.value);
    this.request.creatBillDeposit(this.formBill.value).subscribe(data => {
      this.dialogRef.close();
      this.openMessageSuccess();
    });
  }

  createDepositPayPal(): void {
    console.log(this.formBill.value);
    this.request.creatBillDepositPayPal(this.formBill.value).subscribe(data => {
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

  changeIdService(value: string): void {
    this.serviceManager.getServiceById(value).subscribe(data => {
      this.newService = data;
      if (this.newService != null) {
        this.moneyService = this.newService.price;
      }
      console.log(this.moneyService);

    });
  }

  event(event): void {
    const value = event.target.value;
    // tslint:disable-next-line:triple-equals
    if (value == 0) {
      this.checkSubmitDirect = false;
      this.checkSubmitPayPal = false;
      this.checkButtonPayPal = false;
      // tslint:disable-next-line:triple-equals
    } else if (value == 1) {
      this.checkSubmitDirect = true;
      this.checkSubmitPayPal = false;
      this.checkButtonPayPal = false;
    } else {
      this.checkSubmitDirect = false;
      this.checkSubmitPayPal = true;
      this.checkButtonPayPal = true;
    }
  }
}
