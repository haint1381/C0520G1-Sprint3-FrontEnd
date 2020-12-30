import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerListComponent } from './computer-list.component';

describe('ComputerListComponent', () => {
  let component: ComputerListComponent;
  let fixture: ComponentFixture<ComputerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
