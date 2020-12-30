import {Component, OnInit} from '@angular/core';
import {RequestServiceService} from '../../service/request-service.service';
import {Service} from '../../model/service.class';
import {TypeServices} from '../../model/typeServices.class';

@Component({
  selector: 'app-request-service',
  templateUrl: './request-service.component.html',
  styleUrls: ['./request-service.component.css']
})
export class RequestServiceComponent implements OnInit {
  public idUser: number;
  public listService: Service[] = [];
  public totalMoney = 0;
  public moneyUser = 50000;

  constructor(
    private request: RequestServiceService,
  ) {
  }

  ngOnInit(): void {
    this.request.getListService().subscribe(data => {
      this.listService = data;
    });
  }

  totalMoneyAll(idService: number, quanlity: number): void {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.listService.length; i++) {
      if (idService === this.listService[i].idService){
        this.listService[i].quantityPurchased = quanlity;
      }
    }
    this.totalMoney = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.listService.length; i++) {
      if (this.listService[i].quantityPurchased === undefined){
        this.listService[i].quantityPurchased = 0;
      }
      this.totalMoney += (this.listService[i].quantityPurchased * this.listService[i].price);
    }
  }
  number(value: string): number {
    return Number(value);
  }


}
