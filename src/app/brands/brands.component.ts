import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router, NavigationExtras } from '@angular/router';
import { DeleteBrandsComponent } from '../components/delete-brands/delete-brands.component';
import { ProductService } from '../service/api/product.service';
import { StoreService } from '../service/api/store.service';
import { Global } from 'src/app/global';

export interface BrandList {
  BrandName: string;
  slogan: string;
  Action: string;
}

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})

export class BrandsComponent implements OnInit {

  catergoryValue: boolean;
  displayedColumns: string[] = ['BrandImage', 'BrandName', 'slogan', 'Action'];
  dataSource: MatTableDataSource<BrandList>;
  pageNumber: any;
  totalPages: number;
  paginator: any;
  BrandList: any[];
  spinner: boolean;
  brandList: any = [];
  searchString: any = '';
  searchBrandsList: any = [];

  constructor(public productService: ProductService, public matDialog: MatDialog, private storeService: StoreService, private router: Router, public global: Global) { }

  ngOnInit() {
    this.getAllBrands();
  }

  getAllBrands() {
    this.productService.GetAllBrands().subscribe((response) => {
      Object.assign(this.brandList, response);
      this.dataSource = new MatTableDataSource<BrandList>(this.brandList);
      this.dataSource.paginator = this.paginator;
    })
  }

  editBrand(id) {
    let navigationExtras: NavigationExtras = {
      state: {
        BrandId: id
      }
    };
    this.router.navigate(['/home/add-brands'], navigationExtras);
  }

  deleteBrand(id) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      BrandId: id
    };
    let dialogRef = this.matDialog.open(DeleteBrandsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.getAllBrands();
      }
    });
  }

  getPageNumber(event) {
    this.pageNumber = event.pageIndex + 1;
    this.totalPages = Math.ceil(this.paginator.length / this.paginator.pageSize);
  }

  searchBrands(event) {
    this.searchString = event.target.value;
    if (this.searchString != null && this.searchString != '') {
      this.productService.SearchBrands(this.searchString).subscribe((response) => {
        this.searchBrandsList = response;
        this.dataSource = new MatTableDataSource<BrandList>(this.searchBrandsList);
        this.dataSource.paginator = this.paginator;
      })
    }
    else {
      this.getAllBrands();
    }
  }

  onImgError(event) {
    
  }

  goback() {
    history.back();
  }

}
