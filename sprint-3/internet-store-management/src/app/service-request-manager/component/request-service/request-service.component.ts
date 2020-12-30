import {Component, OnInit} from '@angular/core';
import {RequestServiceService} from '../../service/request-service.service';
import {Service} from '../../model/service.class';
import {UserService} from '../../../user-manager/service/user.service';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-request-service',
  templateUrl: './request-service.component.html',
  styleUrls: ['./request-service.component.css']
})
export class RequestServiceComponent implements OnInit {
  public idUser: number;
  public listService: Service[] = [];
  public totalMoney = 0;
  public moneyUser: number;
  public formBill: FormGroup;

  constructor(
    private request: RequestServiceService,
    private userService: UserService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.idUser = 1;
    this.formBill = this.fb.group({
    });
    this.request.getListService().subscribe(data => {
      this.listService = data;
    });
    this.userService.getByID(this.idUser).subscribe(data => {
      this.moneyUser = data.money;
    });
  }

  totalMoneyAll(idService: number, quantity: number): void {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.listService.length; i++) {
      if (idService === this.listService[i].idService) {
        this.listService[i].quantityPurchased = quantity;
      }
    }
    this.totalMoney = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.listService.length; i++) {
      if (this.listService[i].quantityPurchased === undefined) {
        this.listService[i].quantityPurchased = 0;
      }
      this.totalMoney += (this.listService[i].quantityPurchased * this.listService[i].price);
    }
  }

  number(value: string): number {
    return Number(value);
  }


  // tslint:disable-next-line:typedef
  sendData() {
    console.log(this.formBill.value);
  }
}
