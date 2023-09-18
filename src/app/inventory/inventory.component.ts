import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ProductList } from '../products/products.component';
import { StoreService } from '../service/api/store.service';
import { GlobalService } from '../service/api/global.service';
import { ProductInventoryComponent } from '../components/product-inventory/product-inventory.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  displayedColumns: string[] = ['Tracked', 'ProductName', 'SKU', 'Sell out of stock', 'Available', 'Edit quantity available','Edit'];
  dataSource: MatTableDataSource<ProductList>;
  productList: [];
  pageNumber: number = 1;
  totalPages: number;
  allEditQuantity: boolean;
  inventoryForm: FormGroup;
  TrackQuantity: any;
  submitted: boolean;
  isDisabled = true;
  Stock: any;
  editQuantityValue : string;
  spinner: boolean = false;
  selectedProductIndex:any=-1;

  constructor(private storeService: StoreService, private router: Router, private globalService: GlobalService,
    public matDialog: MatDialog) {
    this.inventoryForm = new FormGroup({
      SKU: new FormControl('', [Validators.required]),
      BarCode: new FormControl('', [Validators.required]),
      TrackQuantity: new FormControl(''),
      Stock: new FormControl(''),
      Available: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.globalService.GetEngineToken();
    this.getAllInventory();
  }


  getPageNumber(event) {
    this.pageNumber = event.pageIndex + 1;
    this.totalPages = Math.ceil(this.paginator.length / this.paginator.pageSize);
  }

  getAllInventory() {
    this.spinner = true;
    this.storeService.getALLInventory().subscribe((response) => {
      this.productList = [];
      Object.assign(this.productList, response);
      this.dataSource = new MatTableDataSource<ProductList>(this.productList);
      this.paginator.pageSize = 25;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.totalPages = Math.ceil(this.productList.length / this.paginator.pageSize);
      this.spinner = false;
    },
      error => {
        this.spinner = false;
         this.globalService.displayPopupMessage('Error loading products', false);
      });
  }
  singleEditQuantity(event, index) {
    if (event.checked == true) {
      // this.isDisabled = false;
      this.selectedProductIndex=index;
    } else {
      // this.isDisabled = true;
      this.selectedProductIndex=-1;
    }

  }

  AllEditQuantity(event) {
    if (event.checked == true) {
      this.allEditQuantity = true;
      this.isDisabled = false;
    } else {
      this.allEditQuantity = false;
      this.isDisabled = true;
    }
  }
  quantitySave(value: any, id) {
    var containputiner = <HTMLInputElement>document.querySelector("#" + value);
    var quantityValue = (containputiner).value;
    let data = {
      ProductId: id,
      AvailableQuantity: quantityValue
    }
    if (Number(quantityValue) > 0) {

      this.storeService.addExistingQuantity(data).subscribe((response) => {
        this.selectedProductIndex=-1;
        this.globalService.displayPopupMessage('Quantity updated successfully', true);
        this.getAllInventory();
        this.isDisabled = true;
      },
        error => {
          this.globalService.displayPopupMessage('Error loading products', false);
        });
    }
  }
  //inventory(id,branchId,name){
  inventory(id: any,branchId: any,name: any){
    let navigationExtras: NavigationExtras = {
      state: {
        productId: id,
        branchId: branchId,
        productName: name,
      }
    };
    this.router.navigate(['/home/product-inventory'], navigationExtras);
  }

  addInventory(value) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data ={
      productId: value.productId,
      branchId: localStorage.getItem('BranchId'),
      productName: value.productName,
    }
    let dialogRef = this.matDialog.open(ProductInventoryComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(value => {
      this.getAllInventory();
    });
  }

  goback() {
    history.back();
  }

}
