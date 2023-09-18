import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateOrderpriceComponent } from './rate-orderprice.component';

describe('RateOrderpriceComponent', () => {
  let component: RateOrderpriceComponent;
  let fixture: ComponentFixture<RateOrderpriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateOrderpriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateOrderpriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
