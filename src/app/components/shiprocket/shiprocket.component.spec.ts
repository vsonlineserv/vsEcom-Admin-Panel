import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiprocketComponent } from './shiprocket.component';

describe('ShiprocketComponent', () => {
  let component: ShiprocketComponent;
  let fixture: ComponentFixture<ShiprocketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiprocketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiprocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
