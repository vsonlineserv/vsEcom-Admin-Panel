import { Component, OnInit, ViewChild } from '@angular/core';
import { Global } from '../global';
import { ProductService } from '../service/api/product.service';
import { NavigationExtras, Router } from '@angular/router';
import { GlobalService } from '../service/api/global.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductList } from '../products/products.component';
import { StoreService } from '../service/api/store.service';
import { ShareProductsComponent } from '../components/share-products/share-products.component';
import { DeleteProductComponent } from '../components/delete-product/delete-product.component';
import { BulkUploadComponent } from '../components/bulk-upload/bulk-upload.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

export interface Product {
  PictureName: string;
  ProductId: number;
  Name: string;
  ShortDescription: string;
  FullDescription: string;
  Published: boolean;
}

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss']
})
export class ViewProductsComponent implements OnInit {

  page: number = 1;
  published: boolean;
  selectedOption: string;
  productList: any = [];
  unpublishedProducts: any = [];
  productStatus: string = 'all';
  productViewList: boolean;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  displayedColumns: string[] = ['Image', 'Name', 'PRICE', 'QTY', 'Publish Status', 'ShowAsFeature', 'Action'];
  dataSource: MatTableDataSource<Product>;
  selected: string;
  searchProductName: string = "";
  showSearchError: boolean;
  catergoryList: any = [];
  subCatergoryList: any = [];
  categoryId: any;
  subCategoryId: any;
  category: any;
  catergoryValue: boolean
  totalPages: number;
  dataSources: MatTableDataSource<ProductList>;
  spinner: boolean = false;
  productLink: any;
  currency: any;
  noProductShowHide: any = 1;
  showDeleteProducts: boolean = false;

  constructor(private productService: ProductService, public global: Global, private router: Router,
    private globalService: GlobalService, private storeService: StoreService, public matDialog: MatDialog) {
  }

  ngOnInit() {
    this.globalService.GetEngineToken();
    this.selectedOption = 'all';
    this.selected = 'all';
    this.loanParentCategory();
    this.getProductlistAll();
    this.getCurrency();
  }

  getProductlistAll() {
    this.spinner = true;
    this.productService.GetpublishedProductlist().subscribe((response) => {
      this.productList = [];
      Object.assign(this.productList, response);
      this.global.totalActiveProducts = this.productList.length;
      this.getUnPublishedProducts();
      this.spinner = false;
    },
      error => {
        this.spinner = false;
        //alert('Error');
      });
  }

  getProductListPublish() {
    this.productService.GetpublishedProductlist().subscribe((response) => {
      Object.assign(this.productList, response);
      this.dataSource = new MatTableDataSource<Product>(this.productList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
      error => {
        //alert('Error');
      });
  }

  getUnPublishedProducts() {
    this.productService.GetunpublishedProductlist().subscribe((response) => {
      this.unpublishedProducts = [];
      Object.assign(this.unpublishedProducts, response);
      if (this.unpublishedProducts.length > 0) {
        this.unpublishedProducts.forEach(element => {
          this.productList.push(element);
        });
      }
      this.dataSource = new MatTableDataSource<Product>(this.productList);
      this.paginator.pageSize = 20;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      for (let i = 0; i < this.productList.length; i++) {
        if (this.productList[i].flagSampleProducts) {
          this.showDeleteProducts = true;
          break;
        }
      }
      this.spinner = false;
    },
      error => {
        this.spinner = false;
        //alert('Error');
      });
  }

  editProduct(id) {
    let navigationExtras: NavigationExtras = {
      state: {
        productId: id
      }
    };
    this.router.navigate(['/home/add-product'], navigationExtras);
  }

  deleteProduct(id) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      productId: id
    };
    let dialogRef = this.matDialog.open(DeleteProductComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
      if (value == true) {
        this.loanParentCategory();
        this.getProductlistAll();
        this.getCurrency();
      }
    });
  }

  onImgError(event) {
    event.target.src = './assets/images/no-image.png';
    // Do other stuff with the event.target
  }


  searchProducts(event) {
    if (event && event.target) {
      this.searchProductName = event.target.value;
    }
    else {
      this.searchProductName = event;
    }
    if ((this.searchProductName == null || this.searchProductName.length == 0) && (this.productStatus == 'all')) {
      this.getProductlistAll();
    }
    else if ((this.searchProductName == null || this.searchProductName.length == 0) && (this.productStatus == 'published')) {
      this.getProductListPublish();
    }
    else if ((this.searchProductName == null || this.searchProductName.length == 0) && (this.productStatus == 'unpublished')) {
      this.productList = [];
      this.getUnPublishedProducts();
    }
    else {
      let publishStatus = 2; //for all
      this.showSearchError = false;
      if (this.productStatus == 'all') {
        publishStatus = 2;
      }
      else if (this.productStatus == 'published') {
        publishStatus = 1;
      }
      else if (this.productStatus == 'unpublished') {
        publishStatus = 0;
      }
      else {
        publishStatus = 2;
      }
      this.productService.SearchProduct(this.searchProductName, publishStatus).subscribe(response => {
        this.productList = [];
        let searchedProductList: any = [];
        Object.assign(searchedProductList, response);
        for (var i = 0; i < searchedProductList.length; i++) {
          if (!searchedProductList[i].isDeleted) {
            let searchedProduct: any = {};
            searchedProduct.availableQuantity = searchedProductList[i].availableQuantity;
            searchedProduct.brandName = searchedProductList[i].brandName;
            searchedProduct.flagTrackQuantity = searchedProductList[i].flagTrackQuantity;
            searchedProduct.fullDescription = searchedProductList[i].fullDescription;
            searchedProduct.fullDescription1 = searchedProductList[i].fullDescription1;
            searchedProduct.isDeleted = searchedProductList[i].isDeleted;
            searchedProduct.manufacturerId = searchedProductList[i].manufacturerId;
            searchedProduct.manufacturerPartNumber = searchedProductList[i].manufacturerPartNumber;
            searchedProduct.name = searchedProductList[i].name;
            searchedProduct.pictureName = searchedProductList[i].pictureName;
            searchedProduct.price = searchedProductList[i].price;
            searchedProduct.productDescriptionHtml = searchedProductList[i].productDescriptionHtml;
            searchedProduct.productId = searchedProductList[i].productId;
            searchedProduct.published = searchedProductList[i].published;
            searchedProduct.shortDescription = searchedProductList[i].shortDescription;
            searchedProduct.shortDescription1 = searchedProductList[i].shortDescription1;
            searchedProduct.showOnHomePage = searchedProductList[i].showOnHomePage;
            searchedProduct.specialPrice = searchedProductList[i].specialPrice;

            this.productList.push(searchedProduct);

          }

        }
        this.dataSource = new MatTableDataSource<Product>(this.productList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, error => {

      });
    }
  }

  filterPublishedStatus(event) {
    this.productStatus = event;
    this.page = 0;
    if (this.productStatus == 'all') {
      this.productList = [];
      if (this.searchProductName != "") {
        this.searchProducts(this.searchProductName);
      }
      else {
        this.getProductlistAll();
      }

    } else if (this.productStatus == 'published') {
      this.productList = [];
      if (this.searchProductName != "") {
        this.searchProducts(this.searchProductName);
      }
      else {
        this.getProductListPublish();
      }
    } else if (this.productStatus == 'unpublished') {
      this.productList = [];
      if (this.searchProductName != "") {
        this.searchProducts(this.searchProductName);
      }
      else {
        this.getUnPublishedProducts();
      }
    }
  }

  setPublish(ProductId) {
    this.productService.UpdatePublishedProduct(ProductId.toString(), true).subscribe((response) => {
      this.filterPublishedStatus(this.productStatus);
      this.globalService.displayPopupMessage('Product has been Published', true);
      // this.getProductlistAll();
    },
      error => {
        this.globalService.displayPopupMessage('Error updating product', false);
      });
  }

  setunPublish(ProductId) {
    this.productService.UpdateunPublishedProduct(ProductId.toString(), false).subscribe((response) => {
      this.filterPublishedStatus(this.productStatus);
      this.globalService.displayPopupMessage('Product has been UnPublished', true);
      // this.getProductlistAll();
    },
      error => {
        this.globalService.displayPopupMessage('Error updating product', false);
      });
  }
  addInventory() {
    let navigationExtras: NavigationExtras = {
      state: {
        // productId: this.productIdEdit,
        // branchId: localStorage.getItem('BranchId'),
        // productName: this.updateProductObj.Name,
      }
    };
    this.router.navigate(['/home/product-inventory'], navigationExtras);
  }

  loanParentCategory() {
    this.spinner = true;
    this.productService.GetMainCatergories().subscribe(response => {
      this.catergoryList = [];
      Object.assign(this.catergoryList, response);
      if (this.catergoryList.length == 0 || this.catergoryList == undefined || this.catergoryList == "") {
        this.catergoryValue = true;
        this.spinner = false;
        this.globalService.displayPopupMessageLogin('You need to add Category before adding Products', false, 'category');
      }
      // Commented on 14Nov22 coz it is not necessary

      // } else {
      //   this.catergoryValue = false;
      //   this.categoryId = { value: this.catergoryList[0].id };
      //   this.category = this.catergoryList[0].id;
      //   this.getSubCategory(this.categoryId);
      //   this.spinner = false;
      // }
    }, error => {
      this.spinner = false;
    });
  }

  getSubCategory(event) {
    this.categoryId = event.value;
    this.productService.GetSubCategory(event.value).subscribe(response => {
      this.subCatergoryList = [];
      Object.assign(this.subCatergoryList, response);
      this.subCategoryId = { value: this.subCatergoryList[0].categoryId };
      this.getProductsBasedOnCategory(this.subCategoryId);
    }, error => {
      this.spinner = false;
    });
  }

  getProductsBasedOnCategory(event) {
    this.storeService.getProductsBasedOnCategory(this.categoryId, event.value).subscribe((response) => {
      this.productList = [];
      Object.assign(this.productList, response);
      this.dataSources = new MatTableDataSource<ProductList>(this.productList);
      this.paginator.pageSize = 20;
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

  updateFeatureStatusProduct(event, productId) {
    let test = event.checked;
    if (event.checked) {
      this.productService.UpdatePublishedFeature(productId.toString(), true).subscribe((response) => {
        this.filterPublishedStatus(this.productStatus);
        this.globalService.displayPopupMessage('Product added as Featured', true);
      },
        error => {
          this.globalService.displayPopupMessage('Error updating product', false);
        });
    }
    else {
      this.productService.UpdateunPublishedFeature(productId.toString(), false).subscribe((response) => {
        this.filterPublishedStatus(this.productStatus);
        this.globalService.displayPopupMessage('Feature product removed', true);
      },
        error => {
          this.globalService.displayPopupMessage('Error updating product', false);
        });
    }
  }

  shareProducts(productPermaLink, productName, productId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      ProductName: productName,
      ProductId: productId,
      PermaLink: productPermaLink
    };
    dialogConfig.width = "450px";
    dialogConfig.panelClass = "custom-dialog-container"
    let dialogRef = this.matDialog.open(ShareProductsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
    });
  }

  goback() {
    history.back();
  }

  getCurrency() {
    this.productService.getCurrency().subscribe((response) => {
      this.currency = {};
      Object.assign(this.currency, response);
      this.global.currency = this.currency.symbol;
    },
      error => {
        // below is commented because this api right now will not hit
        //this.globalService.displayPopupMessage('Error', false);
      });
  }

  productView() {
    if (this.productViewList == true) {
      this.filterPublishedStatus(this.productStatus);
      this.productViewList = false;
    } else {
      this.filterPublishedStatus(this.productStatus);
      this.productViewList = true;
    }
  }

  openBulkUploadPopup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "450px";
    let dialogRef = this.matDialog.open(BulkUploadComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.getProductlistAll();
      }
    });
  }

  handlePageEvent(event) {
    this.page = event.pageIndex + 1;
  }

  deleteAllSampleProducts() {
    this.spinner = true;
    this.productService.DeleteSampleProducts().subscribe((response) => {
      this.loanParentCategory();
      this.getProductlistAll();
      this.getCurrency();
      this.spinner = false;
      this.globalService.displayPopupMessage('Sample products deleted successfully', true);
    },
      error => {
        this.spinner = false;
        this.globalService.displayPopupMessage('Error happened while deleting all sample products', false);
      });
  }

}
