import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGameComponent } from './my-game.component';

describe('MyGameComponent', () => {
  let component: MyGameComponent;
  let fixture: ComponentFixture<MyGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
