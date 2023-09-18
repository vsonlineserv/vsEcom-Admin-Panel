import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Global } from 'src/app/global';
import { GlobalService } from 'src/app/service/api/global.service';
import { ProductService } from 'src/app/service/api/product.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})

export class UpdateCategoryComponent implements OnInit {

  categoryDetailsObj: any;
  updateCategoryForm: FormGroup;
  selectedImage: any = [];
  imageSrc: any;
  selectImage: boolean = false;
  categoryImage: any;
  selected: any;
  categoryAddresultObj: any;
  showImage: boolean = false;
  
  constructor(public dialogRef: MatDialogRef<UpdateCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private productService: ProductService, private globalService: GlobalService,
    private global: Global) { 
      this.updateCategoryForm = new FormGroup({
        CategoryId: new FormControl(''),
        Name: new FormControl('', Validators.required),
        Published: new FormControl(''),
        FlagTopCategory: new FormControl(''),
        FlagShowBuy: new FormControl('')
      });
  }

  ngOnInit() {
    this.globalService.GetEngineToken();
    this.selectImage = false;
    this.loadCategoryDetails();
  }

  close() {
    this.dialogRef.close();
  }

  updateCategory() {
    if(!this.updateCategoryForm.valid) {
      return;
    }
    let id = this.updateCategoryForm.controls['CategoryId'].value;
    let categoryName = this.updateCategoryForm.controls['Name'].value;
    let Published =  this.updateCategoryForm.controls['Published'].value;
    if(Published == null || Published == undefined || Published == false) {
      Published = false;
    }
    else {
      Published = true;
    }
    let flagTopCategory = this.updateCategoryForm.controls['FlagTopCategory'].value;
    if(flagTopCategory == null || flagTopCategory == undefined || flagTopCategory == false) {
      flagTopCategory = false;
    }
    else {
      flagTopCategory = true;
    }
    let FlagShowBuy = this.updateCategoryForm.controls['FlagShowBuy'].value;
    if(FlagShowBuy == null || FlagShowBuy == undefined || FlagShowBuy == false) {
      FlagShowBuy = false;
    }
    else {
      FlagShowBuy = true;
    }
    const selectedImage = this.selectedImage;
    this.productService.UpdateCategory(id, categoryName,Published,flagTopCategory,FlagShowBuy).subscribe((response) => {
      this.categoryAddresultObj = {};
      Object.assign(this.categoryAddresultObj, response);
        const UploadFiles = new FormData();
        if (this.selectedImage) {
          const imageFile = this.selectedImage;
          UploadFiles.append('pictureName', imageFile);
        }
        this.productService.UploadCategoryImage(id, UploadFiles)
          .subscribe((response) => {
            if (response == "Success") {
              this.dialogRef.close();
              this.globalService.displayPopupMessage('Category Updated Successfully', true);
            }
          },
            error => {
              this.globalService.displayPopupMessage('Error in updating category', false);
              console.log(error);
            });
    }, error => {
      this.globalService.displayPopupMessage('Error Updating Category', false);
    });
  }

  loadCategoryDetails() {
    this.productService.GetCategoryDetails(this.data).subscribe((response) => {
      this.categoryDetailsObj = {};
      Object.assign(this.categoryDetailsObj, response);
      if(this.categoryDetailsObj.name != '') {
        this.updateCategoryForm.patchValue({
          CategoryId: this.categoryDetailsObj.categoryId,
          Name: this.categoryDetailsObj.name,
          Published: this.categoryDetailsObj.published,
          FlagTopCategory: this.categoryDetailsObj.showOnHomePage,
          FlagShowBuy: this.categoryDetailsObj.flagShowBuy
        });
        if (this.categoryDetailsObj.categoryImage != null) {
          this.showImage = true;
          this.selectImage = true;
          this.categoryImage = this.categoryDetailsObj.categoryImage;
        }
      }
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

  deleteImage() {
    this.productService.DeleteCategoryImage(this.categoryDetailsObj.categoryId, this.categoryDetailsObj.categoryImage).subscribe((response) => {
      if (response == "Success") {
        this.showImage = false;
        this.selectImage = false;
        this.globalService.displayPopupMessage('Image Deleted Successfully', true)
      }
    }, error => {
      this.globalService.displayPopupMessage('Error in deleting image', false)
    });
  }
}
  