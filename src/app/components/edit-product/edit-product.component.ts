import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { StoreService } from '../../service/api/store.service';
import { GlobalService } from 'src/app/service/api/global.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private storeService: StoreService, private globalService: GlobalService) { }

  ngOnInit() {
  }

  close() {
    this.globalService.GetEngineToken();
    this.dialogRef.close();
  }

  updatePrice(data) {
    const date = new Date(); // Now
    date.setDate(date.getDate() + 500);
    data.NewPrice = data.Price,
    data.NewSpecialPrice = data.SpecialPrice,
    data.NewSpecialPriceDescription = data.SpecialPriceDescription,
    data.ProductId = data.ProductId;
    data.ProductName = data.ProductName;
    data.BranchId = data.BranchId;
    data.StoreId = data.StoreId;
    data.BranchIdList = 1;
    data.NewPriceStartTime = new Date().toISOString();
    data.NewPriceEndTime = date;
    data.NewDeliveryTime = 0;
    
    // data.StoreId = data.StoreId;
    // data.BranchIdList = 1;
    // data.NewSpecialPriceDescription = data.SpecialPriceDescription;
    // data.NewSpecialPrice = data.SpecialPrice;
    // data.NewPriceStartTime = new Date().toISOString();
    // data.NewPriceEndTime = new Date().toISOString();
    // data.NewDeliveryTime = new Date().toISOString();
    // data.NewPrice = data.OldPrice;
    this.storeService.updatePrice(data).subscribe((response) => {
      this.dialogRef.close();
    },
    error =>{
      this.globalService.displayPopupMessage('Error updating price', false);
    });
  }

}
