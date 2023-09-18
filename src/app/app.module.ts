import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SalesService } from './service/api/sales.service';
import { Global } from './global';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrintOrderComponent } from './print-order/print-order.component';
import { CommonMessageComponent } from './components/common-message/common-message.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { DeliveryStatusComponent } from './components/delivery-status/delivery-status.component';
@NgModule({
  declarations: [
    AppComponent,
    CommonMessageComponent,
    PrintOrderComponent,
    PageNotFoundComponent,
    DeliveryStatusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [SalesService, Global,
  ],
  bootstrap: [AppComponent],
  entryComponents: [CommonMessageComponent]
})
export class AppModule { }
