import { EditDiscountComponent } from './../components/edit-discount/edit-discount.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditProductComponent } from '../components/edit-product/edit-product.component';
import { UpdateCategoryComponent } from '../components/update-category/update-category.component';
import { ChangePasswordComponent } from '../components/change-password/change-password.component';
import { AddCategoryComponent } from '../components/add-category/add-category.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DeleteCategoryComponent } from '../components/delete-category/delete-category.component';
import { DeleteProductComponent } from '../components/delete-product/delete-product.component';
import { DeleteDiscountComponent } from '../components/delete-discount/delete-discount.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatTreeModule } from '@angular/material/tree';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ShareProductsComponent } from '../components/share-products/share-products.component';
import { OnlineStatusComponent } from '../online-status/online-status.component';
import { ProductInventoryComponent } from '../components/product-inventory/product-inventory.component';
import { UpdateOrderStatusComponent } from '../components/update-order-status/update-order-status.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddDiscountComponent } from '../components/add-discount/add-discount.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { AccountDeletionComponent } from '../components/account-deletion/account-deletion.component';
import { BulkUploadComponent } from '../components/bulk-upload/bulk-upload.component';
import { AddShippingComponent } from '../components/add-shipping/add-shipping.component';
import { PaymentStatusComponent } from '../components/payment-status/payment-status.component';
import { EditShippingComponent } from '../components/edit-shipping/edit-shipping.component';
import { ShiprocketComponent } from '../components/shiprocket/shiprocket.component';
import { DeleteBrandsComponent } from '../components/delete-brands/delete-brands.component';
import { StaffExistComponent } from '../components/staff-exist/staff-exist.component';
import { MyAccountComponent } from '../my-account/my-account.component';
import { MyaccountupdateComponent } from '../components/myaccountupdate/myaccountupdate.component';
import { OrderConfirmationPopupComponent } from '../components/order-confirmation-popup/order-confirmation-popup.component';
import { DeleteCustomerComponent } from '../components/delete-customer/delete-customer.component';

@NgModule({
  declarations: [
    HomeComponent,
    EditProductComponent,
    UpdateCategoryComponent,
    ChangePasswordComponent,
    AddCategoryComponent,
    DeleteCategoryComponent,
    ShareProductsComponent,
    OnlineStatusComponent,
    ProductInventoryComponent,
    UpdateOrderStatusComponent,
    AddDiscountComponent,
    EditDiscountComponent,
    DeleteProductComponent,
    DeleteDiscountComponent,
    AccountDeletionComponent,
    BulkUploadComponent,
    AddShippingComponent,
    EditShippingComponent,
    PaymentStatusComponent,
    ShiprocketComponent,
    DeleteBrandsComponent,
    StaffExistComponent,
    MyaccountupdateComponent,
    OrderConfirmationPopupComponent,
    DeleteCustomerComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    MatSidenavModule,
    MatListModule,
    MatSliderModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCardModule,
    MatRadioModule,
    MatTreeModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    NgxMatSelectSearchModule,
    MatSlideToggleModule,
    NgxPaginationModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  entryComponents: [EditProductComponent, DeleteProductComponent, DeleteDiscountComponent, AccountDeletionComponent, StaffExistComponent, MyaccountupdateComponent,
    UpdateCategoryComponent, ChangePasswordComponent, AddCategoryComponent, UpdateOrderStatusComponent, AddDiscountComponent,
    DeleteCategoryComponent, ShareProductsComponent, ProductInventoryComponent, EditDiscountComponent,
    BulkUploadComponent, AddShippingComponent, EditShippingComponent, PaymentStatusComponent, ShiprocketComponent, DeleteBrandsComponent, DeleteCustomerComponent]
})
export class HomeModule { }
