import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/service/api/product.service';
import { Global } from 'src/app/global';
import { GlobalService } from 'src/app/service/api/global.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-inventory',
  templateUrl: './product-inventory.component.html',
  styleUrls: ['./product-inventory.component.scss']
})
export class ProductInventoryComponent implements OnInit {

  inventoryForm: FormGroup;
  submitted: boolean;
  IsTrackQuantity: boolean;
  IsOutOfStock: boolean;
  productId: any;
  BranchId: any;
  ProductName: any;
  inventryDetails: any = [];
  OutOfStock: boolean;
  spinner: boolean = false;

  constructor(private router: Router, private global: Global,
    private route: ActivatedRoute, private productService: ProductService, private globalService: GlobalService,
    public dialogRef: MatDialogRef<ProductInventoryComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
    this.inventoryForm = new FormGroup({
      SKU: new FormControl(''),
      ProductCode: new FormControl(''),
      AvailableQuantity: new FormControl('', Validators.required),

    });

    // ========Need to change mat dialog data===========
    // this.route.queryParams.subscribe(params => {
    //   if (this.router.getCurrentNavigation().extras.state) {
    //     this.productId = this.router.getCurrentNavigation().extras.state.productId;
    //     this.BranchId = this.router.getCurrentNavigation().extras.state.branchId;
    //     this.ProductName = this.router.getCurrentNavigation().extras.state.productName;
    //     localStorage.setItem("productId",  this.productId);
    //   }
    // });

      if (this.data) {
        this.productId = this.data.productId;
        this.BranchId = this.data.branchId;
        this.ProductName = this.data.productName;
        localStorage.setItem("productId",  this.productId);
      }

  }

  async ngOnInit() {
    this.globalService.GetEngineToken();
    var productId = localStorage.getItem('productId');
    this.GetInventoryDetails(productId);
  }

  addInventory() {
    this.spinner = true;
    var productId = localStorage.getItem('productId');
    this.submitted = true;
    if (!this.inventoryForm.valid) {
      this.spinner = false;
      return;
    }
    this.inventoryForm.value.IsTrackQuantity = this.IsTrackQuantity;
    this.inventoryForm.value.IsOutOfStock = this.IsOutOfStock;
    this.inventoryForm.value.ProductId = productId;
    this.inventoryForm.value.BranchId = localStorage.getItem('BranchId');
    this.productService.UpdateInventoryDetails(this.inventoryForm.value).subscribe((response) => {
      this.globalService.displayPopupMessage('Inventory details updated successfully', true);
      this.spinner = false;
      this.dialogRef.close();
    },
      error => {
        this.spinner = false;
        this.globalService.displayPopupMessage('Error', false);
      });
  }

  IsTrackQuantityChangeEvent(event) {
    if (event.checked == true) {
      this.IsTrackQuantity = true;
    }
    else {
      this.IsTrackQuantity = false;
    }
  }
  IsOutOfStockChangeEvent(event) {
    if (event.checked == true) {
      this.IsOutOfStock = true;
    }
    else {
      this.IsOutOfStock = false;
    }
  }
  GetInventoryDetails(Id) {
    this.productService.GetInventoryDetails(Id).subscribe((response) => {
      Object.assign(this.inventryDetails, response);
      this.IsTrackQuantity = this.inventryDetails.isTrackQuantity;
      this.OutOfStock = this.inventryDetails.isOutOfStock;
      this.inventoryForm.patchValue({
        SKU: this.inventryDetails.sku,
        ProductCode: this.inventryDetails.productCode,
        AvailableQuantity: this.inventryDetails.availableQuantity,
        IsTrackQuantity: this.inventryDetails.isTrackQuantity,
        IsOutOfStock: this.inventryDetails.isOutOfStock,
      });
    },
      error => {
        this.spinner = false;
        this.globalService.displayPopupMessage('Error', false);
      });
  }

}
