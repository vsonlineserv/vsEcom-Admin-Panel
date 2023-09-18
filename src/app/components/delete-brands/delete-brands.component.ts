import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalService } from 'src/app/service/api/global.service';
import { ProductService } from 'src/app/service/api/product.service';

@Component({
  selector: 'app-delete-brands',
  templateUrl: './delete-brands.component.html',
  styleUrls: ['./delete-brands.component.scss']
})
export class DeleteBrandsComponent implements OnInit {

  BrandId: any;

  constructor(public dialogRef: MatDialogRef<DeleteBrandsComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private productService: ProductService, private globalService: GlobalService) { }

  ngOnInit() {
    this.BrandId = this.data.BrandId
  }

  deleteBrand() {
    this.productService.DeleteBrand(this.BrandId).subscribe(response => {
      this.globalService.displayPopupMessage('Product Deleted Successfully', true);
      this.dialogRef.close(true);
    }, error => {
      this.globalService.displayPopupMessage('Error Deleting Product', false);
    });
  }

  close() {
    this.dialogRef.close(false);
  }

}
