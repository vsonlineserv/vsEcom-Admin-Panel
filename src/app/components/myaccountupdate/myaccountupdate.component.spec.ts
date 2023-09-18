import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyaccountupdateComponent } from './myaccountupdate.component';

describe('MyaccountupdateComponent', () => {
  let component: MyaccountupdateComponent;
  let fixture: ComponentFixture<MyaccountupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyaccountupdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyaccountupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
