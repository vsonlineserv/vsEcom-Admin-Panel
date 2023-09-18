import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core"
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { AddCustomerComponent } from "./add-customer.component";
import {AddCustomerRoutingModule} from "./add-customer-routing.module"

import { MatCardModule } from "@angular/material/card";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
    declarations: [AddCustomerComponent],
    imports: [
        CommonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    FlexLayoutModule,
    MatSelectModule,
        AddCustomerRoutingModule
    ]
})
export class AddCustomerModule{}