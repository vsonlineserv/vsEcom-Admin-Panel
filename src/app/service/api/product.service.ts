import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Global } from '../../global';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient, private global: Global) { }

  ProductCategory() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GetRetailerProductFilter', httpOptions);
  }

  UploadImageFiles(productId, data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.post(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/UploadMultipleImage/' + productId, data, httpOptions);
  }

  GetunpublishedProductlist() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/unPublishedProduct/' +
      this.global.productPageSizeDefaultValue, httpOptions);
  }

  GetpublishedProductlist() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/PublishedProduct/' +
      this.global.productPageSizeDefaultValue, httpOptions);
  }

  SearchProduct(productName, publishStatus) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/SearchProduct/' + encodeURIComponent(productName) + '/' + publishStatus, httpOptions);
  }

  UpdatePublishedProduct(ProductId, value) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    let publishIds: string;
    publishIds = ProductId;
    return this.httpClient.put(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/UpdatePublishStatus/' + publishIds + '/' + value, null, httpOptions);
  }

  UpdateunPublishedProduct(ProductId, value) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    let publishIds: string;
    publishIds = ProductId;
    return this.httpClient.put(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/UpdatePublishStatus/' + publishIds + '/' + value, null, httpOptions);
  }

  GetMainCatergories() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/Category/', httpOptions);
  }

  GetSubCategory(catId) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/LoadSubCategory/' + catId, httpOptions);
  }

  GetParentCategory() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GetParentCategory/', httpOptions);
  }

  AddCategory(data) {
    if (data.selectedCategory == 0 || data.selectedCategory == '0') {
      data.selectedCategory = null;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.post(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/Category', data, httpOptions);
  }

  GetCategoryDetails(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/Category/' + id, httpOptions);
  }

  UpdateCategory(id, categoryName, Published, flagTopCategory, FlagShowBuy) {
    let parameters = {
      CategoryId: id,
      Name: categoryName,
      Published: Published,
      FlagTopCategory: flagTopCategory,
      GroupDisplayOrder: 0,
      DisplayOrder: 0,
      CategoryGroupTag: null,
      FlagShowBuy: FlagShowBuy
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      }),
    };
    return this.httpClient.put(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/UpdateCategory/', parameters, httpOptions);
  }

  GetSubCategoryBasedProductDetails(CategoryId) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GetSubCategoryBasedProductDetails/' + CategoryId, httpOptions);
  }

  GetCategoryBasedProductDetails(CategoryId) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GetCategoryBasedProductDetails/' + CategoryId, httpOptions);
  }

  DeleteCategory(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.delete(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/Category/' + id, httpOptions);
  }

  DeleteProduct(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      }),
      responseType: 'text' as 'json'
    };
    return this.httpClient.delete(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/Products/' + id, httpOptions);
  }

  DeleteDiscount(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      }),
      responseType: 'text' as 'json'
    };

    return this.httpClient.delete(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/Discount/' + id, httpOptions);
  }

  getCurrency() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/Currency/', httpOptions);
  }

  UpdateInventoryDetails(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.post(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/UpdateQuantity', data, httpOptions);
  }

  GetInventoryDetails(productId) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GetInventoryDetails/' + productId, httpOptions);
  }

  DeleteProductImage(id, imageId) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      }),
      responseType: 'text' as 'json'
    };
    return this.httpClient.delete(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/DeleteProductImage/' + id + '/' + imageId, httpOptions);
  }

  UploadCategoryImage(categoryId, data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      }),
      responseType: 'text' as 'json'
    };
    return this.httpClient.post(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/UploadCategoryImage/' + categoryId, data, httpOptions);
  }

  DeleteCategoryImage(categoryId, pictureName) {
    let pictureNames: any;
    pictureNames = pictureName;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      }),
      responseType: 'text' as 'json'
    };
    return this.httpClient.delete(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/DeleteCategoryImage/' + categoryId + '?pictureName=' + pictureNames, httpOptions);
  }

  UpdatePublishedFeature(ProductId, value) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    let publishIds: string;
    publishIds = ProductId;
    return this.httpClient.put(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/UpdateFeatureStatus/' + publishIds + '/' + value, null, httpOptions);
  }

  UpdateunPublishedFeature(ProductId, value) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    let publishIds: string;
    publishIds = ProductId;
    return this.httpClient.put(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/UpdateFeatureStatus/' + publishIds + '/' + value, null, httpOptions);
  }

  GetRecentProducts() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/RecentlyAddedProduct', httpOptions);
  }

  GetRecentOrders() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/RecentlySoledProduct', httpOptions);
  }


  addNewProduct(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.post(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/CreateProductWithVariant', data, httpOptions);
  }

  GetNewProductById(productId) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GetProductVariant/' + productId, httpOptions);
  }

  UpdateVariantProduct(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      }),
      responseType: 'text' as 'json'
    };
    return this.httpClient.post(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/UpdateProductWithVariant', data, httpOptions);
  }

  UploadBulkProducts(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      }),
      responseType: 'text' as 'json'
    };
    return this.httpClient.post(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/UploadBulkProducts', data, httpOptions);
  }

  GetAllBrands() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/Manufacturer', httpOptions);
  }

  SearchBrands(searchString) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/SearchBrands/' + encodeURIComponent(searchString), httpOptions);
  }

  DeleteBrand(ManufacturerId) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      }),
      responseType: 'text' as 'json'
    };
    return this.httpClient.delete(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/Manufacturer/' + ManufacturerId, httpOptions);
  }

  AddManufacturer(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.post(this.global.apiURL + '/seller/'+ localStorage.getItem('BranchId') +'/Manufacturer',data,httpOptions)
  }

  updateManufacturer(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      }),
    };
    return this.httpClient.put(this.global.apiURL + '/seller/'+ localStorage.getItem('BranchId') +'/Manufacturer',data,httpOptions)
  }

  GetBrandById(brandId){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/Manufacturer/' + brandId, httpOptions);
  }

  UploadImageManufacturer(BrandId, data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      }),
      responseType: 'text' as 'json'
    };
    return this.httpClient.post(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/UploadManufacturerImage/' + BrandId, data, httpOptions);
  }

  DeleteManufacturerImage(ManufacturerId) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      }),
      responseType: 'text' as 'json'
    };
    return this.httpClient.delete(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/DeleteManufacturerImage/' + ManufacturerId, httpOptions);
  }

  DeleteSampleProducts() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      }),
    };
    return this.httpClient.delete(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/DeleteSampleProducts', httpOptions);
  }

  GetProductsFromShared (searchString: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      }),
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/SearchDefaultProduct/' + searchString, httpOptions);
  }

  GetProductDetailsFromShared (id: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      }),
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GetDefaultProduct/' + id, httpOptions);
  }

}
