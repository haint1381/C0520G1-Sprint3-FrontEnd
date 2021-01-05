import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageSuccessComponent } from './message-success.component';

describe('MessageSuccessComponent', () => {
  let component: MessageSuccessComponent;
  let fixture: ComponentFixture<MessageSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
