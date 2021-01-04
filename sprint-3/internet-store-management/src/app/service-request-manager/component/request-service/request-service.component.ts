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
  public check1 = false;
  public check2 = false;
  public formBill: FormGroup;

  constructor(
    private request: RequestServiceService,
    private userService: UserService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.idUser = 1;
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
      status: [''],
      idUser: [''],
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
      quantityPurchased: serviceObj.quantityPurchased,
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

  event(event): void {
    const value = event.target.value;
    // tslint:disable-next-line:triple-equals
    if (value == 2) {
      this.check1 = true;
    }
  }

  payMent(): void {
    console.log(this.moneyUser + 'truoc');
    this.moneyUser = this.moneyUser - this.totalMoney;
    console.log(this.moneyUser + 'sau');
    this.check1 = false;
    this.check2 = true;

  }
}
