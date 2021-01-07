import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageTimeComponent } from './message-time.component';

describe('MessageTimeComponent', () => {
  let component: MessageTimeComponent;
  let fixture: ComponentFixture<MessageTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
