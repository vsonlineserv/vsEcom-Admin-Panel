import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../service/api/global.service';
import { ProductService } from '../service/api/product.service';
import { Global } from '../global';

@Component({
  selector: 'app-add-brands',
  templateUrl: './add-brands.component.html',
  styleUrls: ['./add-brands.component.scss']
})
export class AddBrandsComponent implements OnInit {

  showUpdate = false;
  imageLogo: any;
  showLogo: boolean;
  loader: boolean;
  selectImage: boolean = false;
  selectedImage: any;
  brandForm: FormGroup;
  submitted = false;
  BrandDetails: any = []
  spinner: boolean = false;
  BrandIdEdit: any;
  updateBrandObj: any = {};
  urls: any = []
  showImage: boolean;
  imageSrc: any;
  brandimage: any;

  constructor(private productService: ProductService, public global: Global, public matDialog: MatDialog, public globalService: GlobalService, private domSanitizer: DomSanitizer, private router: Router, private route: ActivatedRoute) {
    this.newBrandForm();
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.BrandIdEdit = this.router.getCurrentNavigation().extras.state['BrandId'];
      }
    });
  }

  ngOnInit() {
    if (this.BrandIdEdit > 0) {
      this.GetBrandById(this.BrandIdEdit);
      this.showUpdate = true;
    }
  }

  GetBrandById(id) {
    this.spinner = true;
    this.productService.GetBrandById(id).subscribe((response) => {
      this.updateBrandObj = {};
      Object.assign(this.updateBrandObj, response);
      this.brandForm.patchValue({
        BrandName: this.updateBrandObj.name,
        Slogan: this.updateBrandObj.description,
      })
      if (this.updateBrandObj.manufacturerImage) {
        this.showImage = true;
        this.selectImage = true;
        this.brandimage = this.updateBrandObj.manufacturerImage
      }
      this.spinner = false;
    }, error => {
      this.spinner = false;
    })
  }

  newBrandForm() {
    this.brandForm = new FormGroup({
      BrandName: new FormControl('', [Validators.required, Validators.maxLength(300)]),
      Slogan: new FormControl(''),
    })
  }

  removeImage(i) {
    this.imageSrc = null;
    this.selectImage = false;
  }

  uploadImage(event) {
    this.selectedImage = event.target.files[0];
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageSrc = event.target.result;
      if (this.imageSrc) {
        this.selectImage = true;
        this.brandimage = this.imageSrc;
      }
    };
    reader.readAsDataURL(this.selectedImage);
  }

  AddManufacturer() {
    if (!this.brandForm.valid) {
      return;
    }    
    this.spinner = true;
    let data = {
      "Name": this.brandForm.get('BrandName').value,
      "Description": this.brandForm.get('Slogan').value
    }
    this.productService.AddManufacturer(data).subscribe((response) => {
      Object.assign(this.BrandDetails, response)
      if (this.BrandDetails.statusString == "AlreadyExist") {
        this.spinner = false;
        this.globalService.displayPopupMessage('Brand already exist', false);
      }
      var BrandId = this.BrandDetails.updatedId;
      const formData = new FormData();
      if (this.selectedImage) {
        const imageFile = this.selectedImage;
        let fileName = imageFile.name;
        formData.append('Imagefile', imageFile);
        formData.append('PictureName', fileName);
      }
      this.productService.UploadImageManufacturer(BrandId, formData)
        .subscribe((response) => {
          this.spinner = false;
          this.globalService.displayPopupMessage('Brand saved Successfully', true);
          this.router.navigate(['/home/brands']);
        },
          error => {
            this.spinner = false;

          });
    },
      error => {
        this.spinner = false;
        this.globalService.displayPopupMessage('failed to save Brand', false);
      });
  }

  deleteManufacturerImage(id) {
    this.productService.DeleteManufacturerImage(this.updateBrandObj.manufacturerId).subscribe((response) => {
      if (response == "Success") {
        this.showImage = false;
        this.selectImage = false;
        this.globalService.displayPopupMessage('Image Deleted Successfully', true)
      }
    }, error => {
      this.globalService.displayPopupMessage('Error in deleting image', false)
    });
  }

  updateManufacturer() {
    if (!this.brandForm.valid) {
      return;
    }    
    this.spinner = true;
    let data = {
      "Name": this.brandForm.get('BrandName').value,
      "Description": this.brandForm.get('Slogan').value,
      "ManufacturerId": this.updateBrandObj.manufacturerId,
    }
    this.productService.updateManufacturer(data).subscribe((response) => {
      if (this.selectedImage) {
        var BrandId = this.updateBrandObj.manufacturerId;
        const formData = new FormData();
        if (this.selectedImage) {
          const imageFile = this.selectedImage;
          let fileName = imageFile.name;
          formData.append('Imagefile', imageFile);
          formData.append('PictureName', fileName);
        }
        this.productService.UploadImageManufacturer(BrandId, formData).subscribe((response) => {
          this.spinner = false;
          this.globalService.displayPopupMessage('Brand Updated Successfully', true);
          this.router.navigate(['/home/brands']);
        },
          error => {
            this.spinner = false;
          });
      }
      else {
        this.spinner = false;
        this.globalService.displayPopupMessage('Brand Updated Successfully', true);
        this.router.navigate(['/home/brands']);
      }
    }, error => {
      this.spinner = false;
    });
  }

  goback() {
    history.back();
  }

}
