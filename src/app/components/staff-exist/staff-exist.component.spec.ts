import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffExistComponent } from './staff-exist.component';

describe('StaffExistComponent', () => {
  let component: StaffExistComponent;
  let fixture: ComponentFixture<StaffExistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffExistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffExistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
