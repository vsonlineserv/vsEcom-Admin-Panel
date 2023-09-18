import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, } from '@angular/forms';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { GlobalService } from 'src/app/service/api/global.service';
import { Global } from '../../global';
import { ProductService } from '../../service/api/product.service';
import { StoreService } from '../../service/api/store.service';
import { PaymentService } from 'src/app/service/api/payment.service';
import { ProductInventoryComponent } from '../product-inventory/product-inventory.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { debounceTime, distinctUntilChanged, map, Observable, startWith, switchMap } from 'rxjs';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  storeShow: boolean = false;
  productForm: FormGroup;
  catergoryList: any = [];
  submitted = false;
  selectedImage: any = [];
  productDetails: any = [];
  imageUrl: any;
  imageUploaded = false;
  productIdEdit: any;
  updateProductObj: any;
  showUpdate = false;
  updateImageSrc: string;
  updateImageSrc1: string;
  updateImageSrc2: string;
  priceList: any = [];
  productEditPriceDetails: any;
  showImage = false;
  imageSrc: any;
  urls: any = [];
  catergoryListMain: any = [];
  subCatergoryList: any = [];
  currencyInfo: any;
  icon: boolean;
  spinner: boolean;
  productImages: any = [];
  showOptions: boolean = false;
  dataVariant: any = [];
  optionValue: any = [];
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  @ViewChild('f', { static: false }) myNgForm;

  searchValue: any;
  searchList: any = ["Color", "Size"];

  options: any = [];
  variants: any = [];

  variantForm: FormGroup;
  VariantsArray: any = [];
  VariantToDisplay: any = [];
  variantDataList: any = [];

  storePriceValue: any;
  dealPriPceValue: any;
  productVariant: any = [];
  productName = new FormControl('', [Validators.required, Validators.maxLength(300)]);
  masterProducts: Observable<any>;
  variantsList: boolean;
  maxWidth: any = 100;

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute,
    public global: Global, private storeService: StoreService, private globalService: GlobalService,
    private paymentService: PaymentService, public matDialog: MatDialog) {
    //product id
    this.newProductForm();
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.productIdEdit = this.router.getCurrentNavigation().extras.state['productId'];
      }
    });
    this.masterProducts = this.productName.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((value: any) => {
        return this.filter(value || '')
      })
    )
  }

  ngOnInit() {
    this.variantForm = new FormGroup({
      sections: new FormArray([
        this.variantSection(),
      ]),
    });
    this.globalService.GetEngineToken();
    if (this.productIdEdit > 0) {
      this.getProductById(this.productIdEdit);
      this.showUpdate = true;
      //this.getProductPrice();
    }
    else {
      this.showUpdate = false;
      this.getProductCategory();
      this.loadParentCategories();
    }
  }
  // new 

  variantSection() {
    return new FormGroup({
      selectVariant: new FormControl('', Validators.required),
      options: new FormArray([
        this.variantOptions()
      ])
    });
  }

  variantOptions() {
    return new FormGroup({
      selectVariantOption: new FormControl('',Validators.required)
    });
  }

  addVariantSection() {
    const control = <FormArray>this.variantForm.get('sections');
    control.push(this.variantSection());
  }

  addVariantOption(i) {
    // const control = <FormArray>this.variantForm.get('sections').controls[i].get('options');
    const control = <FormArray>this.variantForm.get('sections')['controls'][i].get('options');
    control.push(this.variantOptions());
  }

  removeVariantOption(i, k) {
    const control = <FormArray>this.variantForm.get(['sections', i, 'options']); // also try this new syntax
    control.removeAt(k);
    this.sumVariant();
  }


  removeVariantSection(i) {
    const control = <FormArray>this.variantForm.get('sections');
    control.removeAt(i);
    this.sumVariant();
  }
  getVariantSections(form) {
    //console.log(form.get('sections').controls);
    return form.controls.sections.controls;
  }

  getVariantOptions(form) {
    //console.log(form.get('options').controls);
    return form.controls.options.controls;

  }
  onSubmit(){
    if (this.variantForm.valid) {
      this.sumVariant();
    } else 
    {
      return;
    }

  }

  sumVariant() {
    debugger
    this.variantsList = true;
    this.maxWidth = 50;
    let variantData = [];
  
    let mainForm = this.variantForm.value.sections;
    for (let i = 0; i < mainForm.length; i++) {
      if( mainForm && mainForm[i].selectVariant ==''){
        return;
      }
      let mainVariant = mainForm[i].selectVariant;
      let subVariantValueArray = [];
      for (let j = 0; j < mainForm[i].options.length; j++) {
        if(mainForm && mainForm[i].option==''){
           return;
        }
        let subOptions = mainForm[i].options[j].selectVariantOption;
        subVariantValueArray.push(subOptions);
      }

      let data = {
        varianName: mainVariant,
        variantValueArray: subVariantValueArray
      }
      variantData.push(data);
    }
    //combine the variants
    let mainArray = [];
    for (let i = 0; i < variantData.length; i++) {
      let subArray = [];
      for (let j = 0; j < variantData[i].variantValueArray.length; j++) {
        subArray.push(variantData[i].variantValueArray[j]);
      }
      mainArray.push(subArray);
    }
    this.globalService.displayPopupMessage("added successfully",true);
    this.VariantToDisplay = this.GetCombos(mainArray);
  }

  GetCombos(list, n = 0, result = [], current = []) {
    if (n === list.length) {
      let testString = '';
      let combinations = [];
      for (let i = 0; i < current.length; i++) {
        testString = testString + current[i] + '/'
        combinations.push(current[i]);

      }
      let finalstr = testString.substring(0, testString.length - 1);
      let data = {
        combination: combinations,
        NewPriceVariant: 0,
        NewSpecialPriceVariant: 0,
        variantType: finalstr

      }
      result.push(data)
    }
    else {
      list[n].forEach(item => this.GetCombos(list, n + 1, result, [...current, item]))
    }
    return result;
  }

  GetVarCombos(VarList) {
    let testString = '';
    let result = [];
    for (let i = 0; i < VarList.length; i++) {
      let combinations = [];
      if (VarList[i].productVariant) {
        let option1 = VarList[i].productVariant.option1;
        let option2 = VarList[i].productVariant.option2;
        let option3 = VarList[i].productVariant.option3;
        if (option1 != null) {
          testString = option1;
          combinations.push(option1);
        }
        if (option2 != null) {
          testString = testString + '/' + option2;
          combinations.push(option2);

        }
        if (option3 != null) {
          testString = testString + '/' + option3;
          combinations.push(option3);
        }

        let finalstr = testString;
        let data = {
          combination: combinations,
          NewPriceVariant: VarList[i].price,
          NewSpecialPriceVariant: VarList[i].specialPrice,
          variantType: finalstr
        }
        result.push(data);
      }
    }
    this.VariantToDisplay = result;
    this.productForm.patchValue({
      NewPrice: VarList[0].price,
      NewSpecialPrice: VarList[0].specialPrice,
      NewSpecialPriceDescription: VarList[0].specialPriceDescription,
      StoreId: VarList[0].store
    });
  }

  dealPriPce(event, i) {

    let index = i;
    for (let i = 0; i < this.VariantToDisplay.length; i++) {
      if (i == index) {
        this.VariantToDisplay[i].NewSpecialPriceVariant = event.target.value;
        return
      }
    }
  }

  storePrice(event, i) {
    let index = i;
    for (let i = 0; i < this.VariantToDisplay.length; i++) {
      if (i == index) {
        this.VariantToDisplay[i].NewPriceVariant = event.target.value;
        return
      }
    }
  }

  newProductForm() {
    this.productForm = new FormGroup({
      category: new FormControl('', Validators.required),
      subcategory: new FormControl('', Validators.required),
      fullDescription: new FormControl(''),
      manufacturer: new FormControl('', Validators.required),
      manufacturerPartNumber: new FormControl(''),
      shortDescription: new FormControl(''),
      NewPrice: new FormControl('', Validators.required),
      NewSpecialPrice: new FormControl(''),
      NewSpecialPriceDescription: new FormControl('', Validators.maxLength(50)),
      Weight: new FormControl(''),
      Length: new FormControl(''),
      Width: new FormControl(''),
      Height: new FormControl(''),
      Size1: new FormControl(''),
      Size2: new FormControl(''),
      ProductId: new FormControl(''),
      StoreId: new FormControl(''),
      Published: new FormControl('')
    });
  }

  click() {
    this.icon = !this.icon;
  }

  getProductCategory() {
    this.productService.ProductCategory().subscribe((response) => {
      let manufacturerId: any;
      this.catergoryList = [];
      Object.assign(this.catergoryList, response);
      if (this.catergoryList.brands && this.catergoryList.brands.length > 0) {
        if (this.catergoryList.brands[0].key && this.catergoryList.brands[0].key != null) {
          manufacturerId = this.catergoryList.brands[0].key;
        }
      }
      else {
        manufacturerId = 1;
        let othersBrand = new Object()
        othersBrand['key'] = 1;
        othersBrand['value'] = 'Others';
        this.catergoryList['brands'].push(othersBrand);
      }
      this.productForm.patchValue({
        manufacturer: manufacturerId
      });
    }, error => {

    });
  }

  addProduct() {
    this.VariantToDisplay;
    this.VariantsArray = [];
    let mainForm = this.variantForm.value.sections;
    for (let i = 0; i < mainForm.length; i++) {
      let mainVariant = mainForm[i].selectVariant;
      if (mainVariant) {
        this.VariantsArray.push(mainVariant);
      }
    }
    this.submitted = true;
    this.spinner = true;
    if (!this.productForm.valid || this.storeShow) {
      this.spinner = false;
      return;
    }
    const selectedImage = this.selectedImage;
    if (selectedImage.length > 7) {
      this.globalService.displayPopupMessage('Maximum of 7 images can be uploaded', false);
      this.spinner = false;
      return;
    }
    try {
      this.productForm.patchValue({
        category: this.productForm.get('subcategory').value
      });
      this.productForm.patchValue({
        Published: true
      });
      if (this.productForm.value.NewSpecialPrice == null || this.productForm.value.NewSpecialPrice == "") {
        this.productForm.patchValue({
          NewSpecialPrice: this.productForm.get('NewPrice').value
        });
      }
      let data = {
        "Name": this.productName.value,
        "Category": this.productForm.get('category').value,
        "Subcategory": this.productForm.get('subcategory').value,
        "FullDescription": this.productForm.get('fullDescription').value,
        "Manufacturer": this.productForm.get('manufacturer').value,
        "ManufacturerPartNumber": this.productForm.get('manufacturerPartNumber').value,
        "ShortDescription": this.productForm.get('shortDescription').value,
        "NewPrice": this.productForm.get('NewPrice').value,
        "NewSpecialPrice": this.productForm.get('NewSpecialPrice').value,
        "NewSpecialPriceDescription": this.productForm.get('NewSpecialPriceDescription').value,
        "Weight": this.productForm.get('Weight').value,
        "Length": this.productForm.get('Length').value,
        "Width": this.productForm.get('Width').value,
        "Height": this.productForm.get('Height').value,
        "Size1": this.productForm.get('Size1').value,
        "Size2": this.productForm.get('Size2').value,
        "ProductId": null,
        "StoreId": localStorage.getItem('StoreId'),
        "Published": this.productForm.get('Published').value,
        "NewPriceStartTime": "2022-07-21T05:13:40.499Z",
        "NewPriceEndTime": "2023-12-03T05:13:40.499Z",
        "NewDeliveryTime": 0,
        "Options": this.VariantsArray,
        "Variants": this.VariantToDisplay
      }
      this.productService.addNewProduct(data).subscribe((response) => {
        Object.assign(this.productDetails, response);
        if (this.productDetails.statusString == "AlreadyExist") {
          // alert('Product already exist');
          this.spinner = false;
          this.globalService.displayPopupMessage('Product already exist', false);
        }
        var productId = this.productDetails.productId;
        const UploadFiles = new FormData();
        if (this.selectedImage.length > 0) {
          for (let i = 0; i < this.selectedImage.length; i++) {
            UploadFiles.append('selectedImage', selectedImage[i]);
          }
        }
        //UploadFiles.append('selectedImage', selectedImage[0]);
        this.productService.UploadImageFiles(productId, UploadFiles)
          .subscribe((response) => {
            this.selectedImage = [];
            this.spinner = false;
            this.globalService.displayPopupMessage('Product saved Successfully', true);
            this.router.navigate(['/home/view-products']);
          },
            error => {
              this.spinner = false;
              this.globalService.displayPopupMessage('Error while uploading product images', false)
            });
      },
        error => {
          this.spinner = false;
          this.globalService.displayPopupMessage('Error while adding product', false);
        });
    }
    catch (err) {
      this.spinner = false;
      this.globalService.displayPopupMessage('Error' + err, false);
    }
  }

  uploadImage(event) {
    this.selectedImage = event.target.files[0];
    let reader = new FileReader();
    this.imageUploaded = true;
    //this.src = 'data:image/jpeg;base64,' + this.selectedImage;
    reader.onload = (e: any) => {
      //this.imageUrl = e.target.result;
      //this.showImage = true;
      this.updateImageSrc = e.target.result;
    };

    reader.readAsDataURL(this.selectedImage);
  }

  getProductById(id) {
    this.productService.GetNewProductById(id).subscribe((response) => {
      this.updateProductObj = {};
      Object.assign(this.updateProductObj, response);
      this.productName.patchValue(this.updateProductObj.name);
      this.productForm.patchValue({
        shortDescription: this.updateProductObj.shortDescription,
        fullDescription: this.updateProductObj.fullDescription,
        manufacturerPartNumber: this.updateProductObj.manufacturerPartNumber,
        Weight: this.updateProductObj.weight,
        Height: this.updateProductObj.height,
        Length: this.updateProductObj.length,
        Size1: this.updateProductObj.size1,
        Size2: this.updateProductObj.size2,
        Width: this.updateProductObj.width,
        Published: this.updateProductObj.published
      });
      if (this.updateProductObj.productImages.length > 0) {
        this.showImage = true;
        for (let i = 0; i < this.updateProductObj.productImages.length; i++) {
          this.updateImageSrc = this.updateProductObj.productImages[i];
          this.productImages.push(this.updateImageSrc)
        }
      }
      if (this.updateProductObj.variantOptions) {
        this.showOptions = true;
        for (let i = 0; i < this.updateProductObj.variantOptions.length; i++) {
          let VariantHeading = this.updateProductObj.variantOptions[i];

          if (i == 0) {
            let Variants = this.updateProductObj.option1;
            let data = {
              heading: VariantHeading,
              variants: Variants
            }
            this.productVariant.push(data);
          }
          if (i == 1) {
            let Variants = this.updateProductObj.option2;
            let data = {
              heading: VariantHeading,
              variants: Variants
            }
            this.productVariant.push(data);
          }
          if (i == 2) {
            let Variants = this.updateProductObj.option3;
            let data = {
              heading: VariantHeading,
              variants: Variants
            }
            this.productVariant.push(data);
          }
        }
      }
      this.categoryEditBind(this.updateProductObj.categoryDetails.parentCategoryId, this.updateProductObj.categoryDetails.categoryId, this.updateProductObj.manufacturer);
      // this.editGetProductPrice(this.updateProductObj.categoryDetails.parentCategoryId, this.updateProductObj.categoryDetails.categoryId);
      this.GetVarCombos(this.updateProductObj.variantsPricing);
      this.getVariantForm(this.productVariant);
    }, error => {

    });
  }

  getVariantForm(productVariant) {
    debugger  
    let customdata = this.variantForm.get(['sections']) as FormArray;
    customdata.clear();
    productVariant.forEach(element => {
      let formGroup = this.variantSection();
      Object.keys(formGroup.controls).forEach(key => {
        if (key == 'selectVariant') {
          formGroup.patchValue({
            [key]: element['heading']
          });
          formGroup.controls.options['controls'].shift();
          element['variants'].forEach(value => {
            let formOptions = this.variantOptions();
            formOptions.patchValue({
              selectVariantOption: value
            });
            formGroup.controls.options['controls'].push(formOptions);
          })
          return
        }
      });
      customdata.controls.push(formGroup);
    });
  }
  updateProduct() {
    this.VariantToDisplay;
    this.VariantsArray = [];
    let mainForm = this.variantForm.value.sections;
    for (let i = 0; i < mainForm.length; i++) {
      let mainVariant = mainForm[i].selectVariant;
      if (mainVariant) {
        this.VariantsArray.push(mainVariant);
      }
    }
    this.spinner = true;
    if (!this.productForm.valid || this.storeShow) {
      this.spinner = false;
      return;
    }
    const selectedImage = this.selectedImage;
    if (selectedImage.length > 7) {
      this.globalService.displayPopupMessage('Maximum of 7 images can be uploaded', true);
      this.spinner = false;
      return;
    }
    this.productForm.patchValue({
      ProductId: this.productIdEdit
    });
    this.productForm.patchValue({
      category: this.productForm.get('subcategory').value
    });

    let data = {
      "name": this.productName.value,
      "category": this.productForm.get('category').value,
      "subcategory": this.productForm.get('subcategory').value,
      "fullDescription": this.productForm.get('fullDescription').value,
      "manufacturer": this.productForm.get('manufacturer').value,
      "manufacturerPartNumber": this.productForm.get('manufacturerPartNumber').value,
      "shortDescription": this.productForm.get('shortDescription').value,
      "NewPrice": this.productForm.get('NewPrice').value,
      "NewSpecialPrice": this.productForm.get('NewSpecialPrice').value,
      "NewSpecialPriceDescription": this.productForm.get('NewSpecialPriceDescription').value,
      "Weight": this.productForm.get('Weight').value,
      "Length": this.productForm.get('Length').value,
      "Width": this.productForm.get('Width').value,
      "Height": this.productForm.get('Height').value,
      "Size1": this.productForm.get('Size1').value,
      "Size2": this.productForm.get('Size2').value,
      "ProductId": this.productForm.get('ProductId').value,
      "StoreId": localStorage.getItem('StoreId'),
      "Published": this.productForm.get('Published').value,
      "NewPriceStartTime": "2022-07-21T05:13:40.499Z",
      "NewPriceEndTime": "2023-12-03T05:13:40.499Z",
      "NewDeliveryTime": 0,
      "options": this.VariantsArray,
      "variants": this.VariantToDisplay
    }

    this.productService.UpdateVariantProduct(data).subscribe((response) => {
      if (this.selectedImage.length > 0) {
        var productId = this.productIdEdit;
        const UploadFiles = new FormData();
        if (this.selectedImage.length > 0) {
          for (let i = 0; i < this.selectedImage.length; i++) {
            UploadFiles.append('selectedImage', selectedImage[i]);
          }
        }
        this.productService.UploadImageFiles(productId, UploadFiles)
          .subscribe((response) => {
            this.spinner = false;
            this.globalService.displayPopupMessage('Product Updated Successfully', true);
            this.router.navigate(['/home/view-products']);
          },
            error => {
              this.spinner = false;
              this.globalService.displayPopupMessage('Error while uploading product / images', false)
            });
      }
      else {
        this.spinner = false;
        this.globalService.displayPopupMessage('Product Updated Successfully', true);
        this.router.navigate(['home/view-products'])
      }
    }, error => {
      this.spinner = false;

    });
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      let filesAmount = event.target.files.length;
      if (filesAmount > 7 || this.selectedImage.length >= 7 || (this.productImages.length + this.selectedImage.length) >= 7) {
        this.globalService.displayPopupMessage("Maximum of 7 images can be uplaoded", false);
        return
      }
      for (let i = 0; i < filesAmount; i++) {
        if (filesAmount <= 7 && this.selectedImage.length <= 6 && (this.productImages.length + this.selectedImage.length) <= 6) {
          let reader = new FileReader();
          reader.onload = (event: any) => {
            this.urls.push(event.target.result);
          };
          reader.readAsDataURL(event.target.files[i]);
          this.selectedImage.push(event.target.files[i]);
        } else {
          this.globalService.displayPopupMessage("Maximum of 7 images can be uplaoded", false);
          return
        }
      }
    }
  }

  removeImage(imageId) {
    this.urls.splice(imageId, 1);
    for (let i = 0; i < this.selectedImage.length; i++) {
      if (i == imageId) {
        this.selectedImage.splice(imageId, 1);
      }
    }
  }

  loadParentCategories() {
    this.productService.GetMainCatergories().subscribe(response => {
      this.catergoryListMain = [];
      Object.assign(this.catergoryListMain, response);
    }, error => {

    });
  }

  getSubCategory(event) {
    this.productService.GetSubCategory(event.value).subscribe(response => {
      this.subCatergoryList = [];
      Object.assign(this.subCatergoryList, response);
    }, error => {

    });
  }

  categoryEditBind(parentCategoryId, subCategoryId, manufacturerId) {
    this.productService.GetMainCatergories().subscribe(response => {
      this.catergoryListMain = [];
      Object.assign(this.catergoryListMain, response);
      this.productForm.patchValue({
        category: parentCategoryId
      });
      this.productService.GetSubCategory(parentCategoryId).subscribe(response => {
        this.subCatergoryList = [];
        Object.assign(this.subCatergoryList, response);
        this.productForm.patchValue({
          subcategory: subCategoryId
        });
        this.productService.ProductCategory().subscribe((response) => {
          this.catergoryList = [];
          Object.assign(this.catergoryList, response);
          this.productForm.patchValue({
            manufacturer: manufacturerId
          });
        }, error => {

        });
      }, error => {

      });
    }, error => {

    });
  }

  editGetProductPrice(parentCategoryId, subCategoryId) {
    this.storeService.getProductsBasedOnCategory(parentCategoryId, subCategoryId).subscribe((response) => {
      this.priceList = [];
      Object.assign(this.priceList, response);
      let ourprice = this.priceList.filter(product => product.productId == this.productIdEdit);
      this.productForm.patchValue({
        NewPrice: ourprice[0].price,
        NewSpecialPrice: ourprice[0].specialPrice,
        NewSpecialPriceDescription: ourprice[0].specialPriceDescription,
        StoreId: ourprice[0].store
      });
      this.productEditPriceDetails = ourprice[0];

      // add store id to price so that we can update it
    },
      error => {
        this.globalService.displayPopupMessage('Error loading products', false);

      });
  }
  deleteProductImage(imageId) {
    this.productService.DeleteProductImage(this.productIdEdit, imageId).subscribe((response) => {
      if (response == "Success") {
        for (let i = 0; i < this.productImages.length; i++) {
          if (imageId == this.productImages[i].id) {
            this.productImages.splice(i, 1);
          }
        }
        this.globalService.displayPopupMessage('Image Deleted Successfully', true)
      }
    }, error => {
      this.globalService.displayPopupMessage('Error in deleting image', false)
    });
  }

  addInventory() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      productId: this.productIdEdit,
      branchId: localStorage.getItem('BranchId'),
      productName: this.updateProductObj.name,
    }
    let dialogRef = this.matDialog.open(ProductInventoryComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
    });
  }

  goback() {
    history.back();
  }

  activeOptions(event) {
    if (event.checked) {
      this.showOptions = event.checked;
      this.variantsList = true;
      this.maxWidth = 50;
    }
    else {
      this.showOptions = event.checked;
      this.variantsList = false;
      this.maxWidth = 100;
    }
  }

  searchCatalogue(value) {
    if (value) {
      this.searchValue = '';
    }
    this.options.push(value);
  }

  productSelected(value) {
    this.spinner = true;
    this.productService.GetProductDetailsFromShared(value.productId).subscribe((response) => {
      this.updateProductObj = {};
      Object.assign(this.updateProductObj, response);
      this.productName.patchValue(this.updateProductObj.name);
      this.productForm.patchValue({
        shortDescription: this.updateProductObj.shortDescription,
        fullDescription: this.updateProductObj.fullDescription,
        manufacturerPartNumber: this.updateProductObj.manufacturerPartNumber,
        Weight: this.updateProductObj.weight,
        Height: this.updateProductObj.height,
        Length: this.updateProductObj.length,
        Size1: this.updateProductObj.size1,
        Size2: this.updateProductObj.size2,
        Width: this.updateProductObj.width,
        Published: this.updateProductObj.published
      });
      if (this.updateProductObj.productImages.length > 0) {
        this.showImage = true;
        for (let i = 0; i < this.updateProductObj.productImages.length; i++) {
          this.updateImageSrc = this.updateProductObj.productImages[i];
          this.productImages.push(this.updateImageSrc)
        }
      }
      if (this.updateProductObj.variantOptions) {
        this.showOptions = true;
        for (let i = 0; i < this.updateProductObj.variantOptions.length; i++) {
          let VariantHeading = this.updateProductObj.variantOptions[i];

          if (i == 0) {
            let Variants = this.updateProductObj.option1;
            let data = {
              heading: VariantHeading,
              variants: Variants
            }
            this.productVariant.push(data);
          }
          if (i == 1) {
            let Variants = this.updateProductObj.option2;
            let data = {
              heading: VariantHeading,
              variants: Variants
            }
            this.productVariant.push(data);
          }
          if (i == 2) {
            let Variants = this.updateProductObj.option3;
            let data = {
              heading: VariantHeading,
              variants: Variants
            }
            this.productVariant.push(data);
          }
        }
      }
      this.categoryEditBind(this.updateProductObj.categoryDetails.parentCategoryId, this.updateProductObj.categoryDetails.categoryId, this.updateProductObj.manufacturer);
      // this.editGetProductPrice(this.updateProductObj.categoryDetails.parentCategoryId, this.updateProductObj.categoryDetails.categoryId);
      this.GetVarCombos(this.updateProductObj.variantsPricing);
      this.getVariantForm(this.productVariant);
      this.spinner = false;
    }, error => {
      this.spinner = false;
    });
  }

  replaceValue() {
    let price: number;
    price = Number(this.productForm.get('NewPrice').value);
    let newSpecialPrice: number;
    newSpecialPrice = Number(this.productForm.get('NewSpecialPrice').value);
    if (price != undefined && newSpecialPrice != undefined) {
      if (price >= newSpecialPrice) {
        this.storeShow = false;
      }
      else if (price <= newSpecialPrice) {
        this.storeShow = true;
      }
    }
  }

  filter(val: string): Observable<any> {
    if (val == "") {
      val = null
    }
    return this.productService.GetProductsFromShared(val).pipe(map((response: any) => response.filter((option: any) => {
      return option;
    }))
    )
  }

}
