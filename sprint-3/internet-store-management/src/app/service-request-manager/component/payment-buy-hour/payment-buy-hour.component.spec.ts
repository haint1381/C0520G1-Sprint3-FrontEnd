import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentBuyHourComponent } from './payment-buy-hour.component';

describe('PaymentBuyHourComponent', () => {
  let component: PaymentBuyHourComponent;
  let fixture: ComponentFixture<PaymentBuyHourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentBuyHourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentBuyHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
