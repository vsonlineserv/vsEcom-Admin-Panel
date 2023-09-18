import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalService } from 'src/app/service/api/global.service';
import { ProductService } from 'src/app/service/api/product.service';

@Component({
  selector: 'app-delete-discount',
  templateUrl: './delete-discount.component.html',
  styleUrls: ['./delete-discount.component.scss']
})
export class DeleteDiscountComponent implements OnInit {

  DiscountId: any;

  constructor(public dialogRef: MatDialogRef<DeleteDiscountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private productService: ProductService, private globalService: GlobalService) { }

  ngOnInit() {
    this.DiscountId = this.data.discountId
  }

  close() {
    this.dialogRef.close();
  }

  deleteDiscount() {
   this.productService.DeleteDiscount(this.DiscountId).subscribe(response => {
     this.globalService.displayPopupMessage('Discount Deleted Successfully', true);
     this.dialogRef.close(true);
   }, error => {
     this.globalService.displayPopupMessage('Error Deleting Discount', false);
   });
 }
}
