import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { UpdateCategoryComponent } from '../components/update-category/update-category.component';
import { ProductService } from '../service/api/product.service';
import { AddCategoryComponent } from '../components/add-category/add-category.component';
import { DeleteCategoryComponent } from '../components/delete-category/delete-category.component';
import { Global } from '../global';
import { GlobalService } from '../service/api/global.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

interface FoodNode {
  name: string;
  id: string;
  children?: FoodNode[];
  categoryImage: string;
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

const TREE_DATA: FoodNode[] = [];

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  loader: boolean = false;
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      id: node.id,
      level: level,
      categoryImage: node.categoryImage 
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(public matDialog: MatDialog,private globalService: GlobalService,
    private productService: ProductService, public global: Global) {
    //this.global.apiURL = 'http://' + localStorage.getItem('siteName') + '.vsecommerce.com/'+ localStorage.getItem('siteName') + 'api/api';
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit() {
    this.loadMainCategories();
  }

  openAddCategory() {
    const dialogConfig = new MatDialogConfig();
    let dialogRef = this.matDialog.open(AddCategoryComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(value => {
      this.loadMainCategories();
    });
  }

  loadMainCategories() {
    this.loader = true;
    this.productService.GetMainCatergories().subscribe((response) => {
      this.loader = false;
      const TREE_DATA: FoodNode[] = [];
      Object.assign(TREE_DATA, response);
      this.dataSource.data = TREE_DATA;
    }, error => {
      this.loader = false;
    });
  }

  updateCategory(catId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = catId;
    let dialogRef = this.matDialog.open(UpdateCategoryComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(value => {
      this.loadMainCategories();
    });
  }

  deleteCategory(catId) {
    this.productService.GetCategoryBasedProductDetails(catId).subscribe(response => {
      if (response == true || response == 'true' || response == 'True') {
        this.globalService.displayPopupMessage('Unable to perform action, this category has products added to it, to delete a  category there should be no categories linked to it', false);
      }
      else {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = catId;
        let dialogRef = this.matDialog.open(DeleteCategoryComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(value => {
          this.loadMainCategories();
        });
      }
    }, error => {

    });
  }


  deleteSubCategory(catId) {
     
    this.productService.GetSubCategoryBasedProductDetails(catId).subscribe(response => {
      if (response == true || response == 'true' || response == 'True') {
        this.globalService.displayPopupMessage('Unable to perform action, this category has products added to it, to delete a  category there should be no categories linked to it', false);
      }
      else {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = catId;
        let dialogRef = this.matDialog.open(DeleteCategoryComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(value => {
          this.loadMainCategories();
        });
      }
    }, error => {

    });
  }

  goback() {
    history.back();
  }

}
