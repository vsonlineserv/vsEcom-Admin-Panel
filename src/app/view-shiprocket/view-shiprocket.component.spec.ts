import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewShiprocketComponent } from './view-shiprocket.component';

describe('ViewShiprocketComponent', () => {
  let component: ViewShiprocketComponent;
  let fixture: ComponentFixture<ViewShiprocketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewShiprocketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewShiprocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
