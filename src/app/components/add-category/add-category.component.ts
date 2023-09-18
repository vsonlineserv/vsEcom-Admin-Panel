import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/service/api/product.service';
import { GlobalService } from '../../service/api/global.service';
import { Global } from '../../global';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  FlagShowBuy = true;
  parentCategoryList: any = [];
  addCategoryForm: FormGroup;
  parentCategoryId = 0;
  categoryAddresultObj: any;
  selectedImage: any = [];
  imageSrc: any;
  selectImage: boolean = false;
  categoryImage: any;
  selected: any;
  loader: boolean = false;

  constructor(public dialogRef: MatDialogRef<AddCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private productService: ProductService,
    private globalService: GlobalService, private global: Global) {
    this.addCategoryForm = new FormGroup({
      selectedCategory: new FormControl('', Validators.required),
      Name: new FormControl('', Validators.required),
      FlagShowBuy: new FormControl(''),
      Published: new FormControl('')
    });
  }

  ngOnInit() {
    this.globalService.GetEngineToken();
    this.selectImage = false;
    this.getParentCategory();
  }

  addCategory() {
    this.loader = true;
    if (!this.addCategoryForm.valid) {
      this.loader = false;
      return;
    }
    this.addCategoryForm.patchValue({
      Published: true
    });
    const selectedImage = this.selectedImage;
    this.productService.AddCategory(this.addCategoryForm.value).subscribe((response) => {
      this.categoryAddresultObj = {};
      Object.assign(this.categoryAddresultObj, response);
      this.loader = false;
      if (this.categoryAddresultObj.status == 4) {
        this.globalService.displayPopupMessage('Category Already Exists', false);
      } else {
        var categoryId = this.categoryAddresultObj.updatedId;
        const UploadFiles = new FormData();
        if (this.selectedImage) {
          const imageFile = this.selectedImage;
          UploadFiles.append('pictureName', imageFile);
        }
        this.productService.UploadCategoryImage(categoryId, UploadFiles)
          .subscribe((response) => {
            if (response == "Success") {
              this.dialogRef.close();
              this.globalService.displayPopupMessage('Category has been added successfully', true);
            }
          },
            error => {
              this.loader = false;
              this.globalService.displayPopupMessage('Error adding Category', false);
            });
      }
    }, error => {
      this.loader = false;
      this.globalService.displayPopupMessage('Error adding Category', false);
    });
  }

  close() {
    this.dialogRef.close();
  }

  getParentCategory() {
    this.productService.GetParentCategory().subscribe((response) => {
      this.parentCategoryList = [];
      Object.assign(this.parentCategoryList, response);
    }, error => {

    });
  }

  async uploadImage(event) {
    this.selectedImage = event.target.files[0];
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageSrc = event.target.result;
      if (this.imageSrc) {
        this.selectImage = true;
        this.categoryImage = this.imageSrc;
      }
    };
    reader.readAsDataURL(this.selectedImage);
  }

  removeImage(i) {
    this.imageSrc = null;
    this.selectImage = false;
  }

}