import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../page-common/service/token-storage/token-storage.service';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {RequestServiceService} from '../../service/request-service.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Service} from '../../model/service.class';
import {MessageSuccessComponent} from '../message-success/message-success.component';

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

  constructor(
    private token: TokenStorageService,
    public dialog: MatDialog,
    private request: RequestServiceService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DepositAccountComponent>,
  ) {
  }

  ngOnInit(): void {
    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    matDialogConfig.position = {left: `72%`, top: `85px`};
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
  }

  createDeposit(): void {
    console.log(this.formBill.value);
    this.request.creatBillDeposit(this.formBill.value).subscribe(data => {
      this.dialogRef.close();
      this.openMessageSuccess();
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
