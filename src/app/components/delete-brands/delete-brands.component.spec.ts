import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBrandsComponent } from './delete-brands.component';

describe('DeleteBrandsComponent', () => {
  let component: DeleteBrandsComponent;
  let fixture: ComponentFixture<DeleteBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteBrandsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
