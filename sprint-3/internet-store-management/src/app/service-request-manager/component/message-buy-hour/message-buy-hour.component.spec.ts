import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageBuyHourComponent } from './message-buy-hour.component';

describe('MessageBuyHourComponent', () => {
  let component: MessageBuyHourComponent;
  let fixture: ComponentFixture<MessageBuyHourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageBuyHourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageBuyHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
