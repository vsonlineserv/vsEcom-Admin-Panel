import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalService } from 'src/app/service/api/global.service';
import { ProductService } from 'src/app/service/api/product.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss']
})
export class DeleteProductComponent implements OnInit {

  ProductId: any;

  constructor(public dialogRef: MatDialogRef<DeleteProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private productService: ProductService, private globalService: GlobalService) { }

  ngOnInit() {
    this.ProductId = this.data.productId
  }

  close() {
    this.dialogRef.close();
  }

  deleteProduct() {
   this.productService.DeleteProduct(this.ProductId).subscribe(response => {
     this.globalService.displayPopupMessage('Product Deleted Successfully', true);
     this.dialogRef.close(true);
   }, error => {
     this.globalService.displayPopupMessage('Error Deleting Product', false);
   });
 }

}
