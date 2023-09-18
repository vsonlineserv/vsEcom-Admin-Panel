import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AuthGuard } from '../service/api/auth.guard';

const routes: Routes = [
  {
    path: '', component: HomeComponent,  canActivate: [AuthGuard] , children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {
        path: 'sales', loadChildren: () => import('../sales/sales.module').then(m => m.SalesModule)
      },
      {
        path: 'products', loadChildren: () => import('../products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'payment', loadChildren: () => import('../payment/payment.module').then(m => m.PaymentModule)
      },
      {
        path: 'add-product', loadChildren: () => import('../components/add-product/add-product.module').then(m => m.AddProductModule)
      },
      {
        path: 'view-products', loadChildren: () => import('../view-products/view-products.module').then(m => m.ViewProductsModule)
      },
      {
        path: 'add-address', loadChildren: () => import('../add-address/add-address.module').then(m => m.AddAddressModule)
      },
      {
        path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'reports', loadChildren: () => import('../reports/reports.module').then(m => m.ReportsModule)
      },
      {
        path: 'category', loadChildren: () => import('../category/category.module').then(m => m.CategoryModule)
      },
      {
        path: 'view-coupon', loadChildren: () => import('../view-coupon/view-coupon.module').then(m => m.ViewCouponModule)
      },
      {
        path: 'coupon', loadChildren: () => import('../coupon/coupon.module').then(m => m.CouponModule)
      },
      {
        path: 'my-account', loadChildren: () => import('../my-account/my-account.module').then(m => m.MyAccountModule)
      },
      {
        path: 'enquiry', loadChildren: () => import('../enquiry/enquiry.module').then(m => m.EnquiryModule)
      },
      {
        path: 'staff-registration', loadChildren: () => import('../staff-registration/staff-registration.module').then(m => m.StaffRegistrationModule)
      },
      {
        path: 'shipping', loadChildren: () => import('../shipping/shipping.module').then(m => m.ShippingModule)
      },
      {
        path: 'shipping-calculations', loadChildren: () => import('../shipping-calculations/shipping-calculations.module').then(m => m.ShippingCalculationsModule)
      },
      {
        path: 'shipping-pickup', loadChildren: () => import('../shipping-pickup/shipping-pickup.module').then(m => m.ShippingPickupModule)
      },
      {
        path: 'flat-rate', loadChildren: () => import('../flat-rate/flat-rate.module').then(m => m.FlatRateModule)
      },
      {
        path: 'free-shipping', loadChildren: () => import('../free-shipping/free-shipping.module').then(m => m.FreeShippingModule)
      },
      {
        path: 'rate-weight', loadChildren: () => import('../rate-weight/rate-weight.module').then(m => m.RateWeightModule)
      },
      {
        path: 'rate-orderprice', loadChildren: () => import('../rate-orderprice/rate-orderprice.module').then(m => m.RateOrderpriceModule)
      },
      {
        path: 'inventory', loadChildren: () => import('../inventory/inventory.module').then(m => m.InventoryModule)
      },
      {
        path: 'order-details', loadChildren: () => import('../order-details/order-details.module').then(m => m.OrderDetailsModule)
      },
      {
        path: 'view-shiprocket', loadChildren: () => import('../view-shiprocket/view-shiprocket.module').then(m => m.ViewShiprocketModule)
      },
      {
        path: 'view-tracking', loadChildren: () => import('../view-tracking/view-tracking.module').then(m => m.ViewTrackingModule)
      },
      {
        path: 'brands', loadChildren: () => import('../brands/brands.module').then(m => m.BrandsModule)
      },
      {
        path: 'add-brands', loadChildren: () => import('../add-brands/add-brands.module').then(m => m.AddBrandsModule)
      },
      {
        path: 'create-staff', loadChildren: () => import('../create-staff/create-staff.module').then(m => m.CreateStaffModule)
      },
      {
        path:'view-customers',loadChildren:() => import('../customer/customer.module').then(m =>m.CustomerModule)
      },
      {
        path:'add-customer',loadChildren:() => import('../add-customer/add-customer.module').then(m =>m.AddCustomerModule)
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
