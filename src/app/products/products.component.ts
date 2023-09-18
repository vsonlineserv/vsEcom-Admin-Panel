import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StoreService } from '../service/api/store.service';
import { EditProductComponent } from '../components/edit-product/edit-product.component';
import { ProductService } from '../service/api/product.service';
import { GlobalService } from '../service/api/global.service';
import { Global } from '../global';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';


export interface ProductList {
  ProductName: string;
  Price: string;
  NewPrice: string;
  NewSpecialPrice: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  displayedColumns: string[] = ['ProductName', 'Price', 'NewPrice', 'NewSpecialPrice', 'Actions'];
  dataSource: MatTableDataSource<ProductList>;
  productList: [];
  pageNumber: number = 1;
  totalPages: number;
  catergoryList: any = [];
  subCatergoryList: any = [];
  categoryId: any;
  subCategoryId: any;
  category: any;
  catergoryValue: boolean;
  spinner: boolean = false;
  constructor(private storeService: StoreService, public matDialog: MatDialog, private globalService: GlobalService,
    public productService: ProductService, public global: Global) {
  }

  ngOnInit() {
    this.globalService.GetEngineToken();
    this.loanParentCategory();
  }

  loanParentCategory() {
    this.spinner = true;
    this.productService.GetMainCatergories().subscribe(response => {
      this.catergoryList = [];
      Object.assign(this.catergoryList, response);
      if (this.catergoryList.length == 0 || this.catergoryList == undefined || this.catergoryList == "") {
        this.catergoryValue = true;
        this.spinner = false;
        this.dataSource = new MatTableDataSource<ProductList>(this.productList);
        this.globalService.displayPopupMessageLogin('You need to add Category before adding Products', false, 'category');
      } else {
      this.catergoryValue = false;
      this.categoryId = { value: this.catergoryList[0].id };
      this.category = this.catergoryList[0].id;
      this.getSubCategory(this.categoryId);
      }
    }, error => {

    });
  }

  getProductsBasedOnCategory(event) {
    this.storeService.getProductsBasedOnCategory(this.categoryId, event.value).subscribe((response) => {
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

  getPageNumber(event) {
    this.pageNumber = event.pageIndex + 1;
    this.totalPages = Math.ceil(this.paginator.length / this.paginator.pageSize);
  }

  openEdit(ProductId,ProductName,BranchId,StoreId,Price,SpecialPrice,SpecialPriceDescription) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      ProductId: ProductId,
      ProductName: ProductName,
      BranchId: BranchId,
      StoreId: StoreId,
      Price: Price,
      SpecialPrice: SpecialPrice,
      SpecialPriceDescription: SpecialPriceDescription,
    };
    dialogConfig.width = '350px';
    let dialogRef = this.matDialog.open(EditProductComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
      this.loanParentCategory();
    });
  }

  resumeProduct(BranchId, StoreId, ProductId) {
    let data: any = {};
    data.BranchId = BranchId;
    data.StoreId = StoreId;
    data.ProductId = ProductId;
    this.storeService.resumeProduct(data).subscribe(response => {
      this.getProductsBasedOnCategory(this.subCategoryId);
    },
      error => {

      });
  }

  suspendProduct(BranchId, StoreId, ProductId) {
    let data: any = {};
    data.BranchId = BranchId;
    data.StoreId = StoreId;
    data.ProductId = ProductId;
    this.storeService.suspendeProduct(data).subscribe(response => {
      this.getProductsBasedOnCategory(this.subCategoryId);
    },
      error => {
        this.globalService.displayPopupMessage('', false);
      });
  }



  getSubCategory(event) {
    this.categoryId = event.value;
    this.productService.GetSubCategory(event.value).subscribe(response => {
      this.subCatergoryList = [];
      Object.assign(this.subCatergoryList, JSON.parse(response.toString()));
      this.subCategoryId = { value: this.subCatergoryList[0].CategoryId };
      this.getProductsBasedOnCategory(this.subCategoryId);
    }, error => {
      this.spinner = false;
    });
  }

  goback() {
    history.back();
  }
}
