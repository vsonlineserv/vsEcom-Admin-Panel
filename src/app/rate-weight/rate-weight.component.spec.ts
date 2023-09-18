import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateWeightComponent } from './rate-weight.component';

describe('RateWeightComponent', () => {
  let component: RateWeightComponent;
  let fixture: ComponentFixture<RateWeightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateWeightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
