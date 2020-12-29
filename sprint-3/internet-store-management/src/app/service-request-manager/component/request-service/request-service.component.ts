import {Component, OnInit} from '@angular/core';
import {RequestServiceService} from '../../service/request-service.service';

@Component({
  selector: 'app-request-service',
  templateUrl: './request-service.component.html',
  styleUrls: ['./request-service.component.css']
})
export class RequestServiceComponent implements OnInit {
  public idUser: number;
  public listService = [];
  public drinks = [];
  public food = [];
  public card = [];
  public moneyUser;
  public quantityDrinks = 0;
  public priceDrinks = 0;
  public quantityFood = 0;
  public priceFood = 0;
  public quantityCard = 0;
  public priceCard = 0;
  public totalMoney1 = 0;
  public totalMoney2 = 0;
  public totalMoney3 = 0;

  constructor(
    private request: RequestServiceService,
  ) {
  }

  ngOnInit(): void {
    this.idUser = 1;
    this.request.getMoneyUser(this.idUser).subscribe(data => {
      this.moneyUser = data.money;
      console.log(this.moneyUser);
    });
    this.request.getListService().subscribe(data => {
      this.listService = data;
      console.log('list');
      console.log(this.listService);
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.listService.length; i++) {
        if (this.listService[i].typeServices.idTypeServices === 3) {
          this.card.push(this.listService[i]);
        } else if (this.listService[i].typeServices.idTypeServices === 2) {
          this.food.push(this.listService[i]);
        } else {
          this.drinks.push(this.listService[i]);
        }
      }
    });
  }

  // tslint:disable-next-line:typedef
  eventD(value) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.drinks.length; i++) {
      // tslint:disable-next-line:triple-equals
      if (this.drinks[i].idService == value) {
        this.quantityDrinks = this.drinks[i].quantity;
        this.priceDrinks = this.drinks[i].price;
      }
    }
  }

  // tslint:disable-next-line:typedef
  eventF(value) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.food.length; i++) {
      // tslint:disable-next-line:triple-equals
      if (this.food[i].idService == value) {
        this.quantityFood = this.food[i].quantity;
        this.priceFood = this.food[i].price;
      }
    }
  }

  // tslint:disable-next-line:typedef
  eventC(value) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.card.length; i++) {
      // tslint:disable-next-line:triple-equals
      if (this.card[i].idService == value) {
        this.quantityCard = this.card[i].quantity;
        this.priceCard = this.card[i].price;
      }
    }
  }

  totalMoneyDrink(price: number, value: number): void {
    console.log(price + 'sdv' + value);
    this.totalMoney1 = price * value;
  }

  totalMoneyFood(price: number, value: number): void {
    console.log(price + 'sdv' + value);
    this.totalMoney2 = price * value;
  }

  totalMoneyCard(price: number, value: number): void {
    console.log(price + 'sdv' + value);
    this.totalMoney3 = price * value;
  }
}
