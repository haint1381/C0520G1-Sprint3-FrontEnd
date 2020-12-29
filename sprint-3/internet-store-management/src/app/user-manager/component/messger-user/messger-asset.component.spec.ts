import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessgerAssetComponent } from './messger-asset.component';

describe('MessgerAssetComponent', () => {
  let component: MessgerAssetComponent;
  let fixture: ComponentFixture<MessgerAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessgerAssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessgerAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
