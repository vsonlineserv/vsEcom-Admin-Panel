import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalService } from 'src/app/service/api/global.service';
import { ProductService } from 'src/app/service/api/product.service';

@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.scss']
})
export class BulkUploadComponent implements OnInit {


  selectedFile: any = [];

  constructor(public dialogRef: MatDialogRef<BulkUploadComponent>, private globalService: GlobalService,
    private productService: ProductService) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  onFileSelect(evt: any) {
    if (evt.target.files && evt.target.files[0]) {
      if (evt.target.files.length > 1) {
        this.globalService.displayPopupMessage("Maximum 1 file can be uplaoded", false);
        return
      }
      if (evt.target.files[0].type == "xlsx" || evt.target.files[0].type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || evt.target.files[0].type == "application/vnd.ms-excel") {
        this.selectedFile = [];
        this.selectedFile.push(evt.target.files[0]);
      }
      else {
        this.globalService.displayPopupMessage("Only .xlsx and .xls file can be uplaoded", false);
        return;
      }

    }
  }

  uploadBulkProducts() {
    if(this.selectedFile.length == 0){
      this.globalService.displayPopupMessage('Please upload a file.', false);
      return
    }
    const UploadFiles = new FormData();
    UploadFiles.append('UploadProducts', this.selectedFile[0]);
    this.productService.UploadBulkProducts(UploadFiles).subscribe(response => {
      this.dialogRef.close(true);
      this.globalService.displayPopupMessage('Products added successfully', true);
    }, error => {
      this.globalService.displayPopupMessage('Please retry, there seems to be a problem when adding Bulk Upload Products.', false);
    });
  }
}
