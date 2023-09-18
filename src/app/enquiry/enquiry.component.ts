import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Global } from '../global';
import { GlobalService } from '../service/api/global.service';
import { ReportsService } from '../service/api/reports.service';
import { StoreService } from '../service/api/store.service';

export interface InboxData {
  ContactName: string;
  ProductName: string;
  BranchName: string;
  Subject: string;
  ReplyDateIST: Date;
  replyStatus: string;
  replyStatusError: string;
}

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.scss']
})
export class EnquiryComponent implements OnInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  displayedColumns: string[] = ['ContactName', 'ProductName','UpdatedOnIST',  'ReplyDateIST'];
  dataSource: MatTableDataSource<InboxData>;
  inboxDetails: any = [];
  selected: string;
  selectedOption: string;
  enquiryFilterObj:any={
    day:0,
    month:0,
    notReplied:false,
    startTime:'',
    endTime:'',
    searchString:''
  };
  showStartEndDate:boolean=false;
  startDateFilter:any='';
  enddateFilter:any='';
  showEnquiryFilter:boolean=false;
  showFilterDay: any;
  showFilterData: any;
  branchEnquiry:any=[];
  noEnquiryShowHide:any=1;

  constructor(private storeService: StoreService, public global: Global, private reportsService: ReportsService, private globalService: GlobalService) { }

  ngOnInit() {
    this.globalService.GetEngineToken();
    this.getInboxMails();
    this.selectedOption = 'all';
    this.selected = 'all';
    this.showFilterDay = 'all';
    this.getBranchEnquiry();
    this.showFilterData = "";
  }

  getBranchEnquiry() {
    this.reportsService.GetBranchEnquiry().subscribe((response) => {
      Object.assign(this.branchEnquiry, response);
      for (let i = 0; i < this.branchEnquiry.length; i++) {
        if (this.branchEnquiry[i].status == 'Pending') {
          if (this.branchEnquiry[i].enquiryCount > 0) {
            this.global.pendingEnquiryCount = this.branchEnquiry[i].enquiryCount;
          }
        }
      }
    },
      error => {
        //alert('Error');
      });
  }

  getInboxMails() {
    this.storeService.getInboxMails().subscribe(response => {
      this.inboxDetails = [];
      Object.assign(this.inboxDetails, response);
      this.dataSource = new MatTableDataSource< InboxData >(this.inboxDetails);
      this.noEnquiryShowHide = this.inboxDetails.length;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {

    });;
  }

  replyToMail(id, message) {
    this.storeService.replyToMail(id, message).subscribe(response => {
      this.globalService.displayPopupMessage('Reply Sent Successfully', true);
      this.getInboxMails();
    }, error => {
      this.globalService.displayPopupMessage('Reply not send please try again', false);
    });
  }

  goback() {
    history.back();
  }

  SearchOrders(event) {
    this.showFilterData = event.target.value;
    if(this.showFilterData == undefined){
      this.showFilterData = "";
    }
    this.enquiryFilter();
  }

  enquiryFilterDay(event){
    this.showFilterDay = event;
    this.enquiryFilter();
  }

  enquiryReplyFilter(event){
    this.showEnquiryFilter = event.checked;
    this.enquiryFilter();
  }

  enquiryFilter() {
    this.enquiryFilterObj.days= '';
    if (this.showEnquiryFilter == false && this.showFilterDay == 'all') {
      this.enquiryFilterObj.notReplied=this.showEnquiryFilter;
      this.enquiryFilterObj.startTime='';
      this.enquiryFilterObj.endTime='';
      this.enquiryFilterObj.searchString = this.showFilterData;
       this.showStartEndDate=false;
       this.callFilterapi();
    } else if(this.showEnquiryFilter == false && this.showFilterDay == 'week'){
      this.enquiryFilterObj.notReplied=this.showEnquiryFilter;
      this.enquiryFilterObj.searchString = this.showFilterData;

      this.enquiryFilterObj.days=7;
       this.showStartEndDate=false;
       this.callFilterapi();
    }else if(this.showEnquiryFilter == false && this.showFilterDay == 'month'){
      this.enquiryFilterObj.notReplied=this.showEnquiryFilter;
      this.enquiryFilterObj.searchString = this.showFilterData;
      this.enquiryFilterObj.days=30;
       this.showStartEndDate=false;
       this.callFilterapi();
    }  else if(this.showEnquiryFilter == false && this.showFilterDay =='custom'){
      this.enquiryFilterObj.notReplied=this.showEnquiryFilter;
      this.enquiryFilterObj.searchString = this.showFilterData;

    this.showStartEndDate=true;
    this.callFilterapi();
      return;
    } 
    else if(this.showEnquiryFilter == true && this.showFilterDay == 'all'){
      this.enquiryFilterObj.notReplied=this.showEnquiryFilter;
      this.enquiryFilterObj.searchString = this.showFilterData;

      this.showStartEndDate=false;
      this.enquiryFilterObj.startTime='';
      this.enquiryFilterObj.endTime='';
      this.callFilterapi();
    }
    else if(this.showEnquiryFilter == true && this.showFilterDay == 'week'){
      this.enquiryFilterObj.notReplied=this.showEnquiryFilter;
      this.enquiryFilterObj.searchString = this.showFilterData;

      this.showStartEndDate=false;
      this.enquiryFilterObj.days=7;
      this.callFilterapi();

    }
    else if(this.showEnquiryFilter == true && this.showFilterDay == 'month'){
      this.enquiryFilterObj.notReplied=this.showEnquiryFilter;
      this.enquiryFilterObj.searchString = this.showFilterData;

      this.showStartEndDate=false;
      this.enquiryFilterObj.days=30;
      this.callFilterapi();

    }
    else if(this.showEnquiryFilter == true && this.showFilterDay == 'custom'){
      this.enquiryFilterObj.notReplied=this.showEnquiryFilter;
      this.enquiryFilterObj.searchString = this.showFilterData;

      this.showStartEndDate=true;
      this.callFilterapi();
    }
  }

  dateFilter() {
    if(this.startDateFilter!='' && this.enddateFilter !='') {
      this.enquiryFilterObj.startTime= new Date(this.startDateFilter).toLocaleDateString('en-US',{ year: 'numeric', month: '2-digit', day: '2-digit' }).toString();
      this.enquiryFilterObj.endTime= new Date(this.enddateFilter).toLocaleDateString('en-US',{ year: 'numeric', month: '2-digit', day: '2-digit' }).toString();
      this.callFilterapi();
    }
  }


  callFilterapi() {
    this.storeService.getInboxMailsFilter(this.enquiryFilterObj).subscribe(response => {
      this.inboxDetails = [];
      Object.assign(this.inboxDetails, response);
      this.dataSource = new MatTableDataSource< InboxData >(this.inboxDetails);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {

    });;
  }

  sortData(){
  }

}
