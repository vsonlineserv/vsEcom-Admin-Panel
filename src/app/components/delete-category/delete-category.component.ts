import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalService } from 'src/app/service/api/global.service';
import { ProductService } from 'src/app/service/api/product.service';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.scss']
})
export class DeleteCategoryComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private productService: ProductService, private globalService: GlobalService) { }

  ngOnInit() {
    this.globalService.GetEngineToken();
  }

  close() {
    this.dialogRef.close();
  }

  deleteCategory() {
     ;
    this.productService.DeleteCategory(this.data).subscribe(response => {
      this.globalService.displayPopupMessage('Category Deleted Successfully', true);
      this.dialogRef.close();
    }, error => {
      this.globalService.displayPopupMessage('Error Deleting Category', false);
    });
  }

}
