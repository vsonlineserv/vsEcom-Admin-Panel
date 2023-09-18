import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../service/api/global.service';
import { ShippingService } from '../service/api/shipping.service';

export interface TrackingView {
  Date: string;
  Time: string;
  Activity: string;
  Location: string;
}
@Component({
  selector: 'app-view-tracking',
  templateUrl: './view-tracking.component.html',
  styleUrls: ['./view-tracking.component.scss']
})
export class ViewTrackingComponent implements OnInit {

  dataSource: MatTableDataSource<TrackingView>;
  displayedColumns: string[] = ['Date', 'Time', 'Activity', 'Location'];
  trackingByShipmentList: any = {};
  TrackingViewList: any = [];
  TrackingViewStatus: any = {};

  constructor(private route: ActivatedRoute, private router: Router, private shippingService: ShippingService,private globalService: GlobalService) { 

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.trackingByShipmentList = this.router.getCurrentNavigation().extras.state['trackingByShipmentList'];
        localStorage.setItem('trackingByShipmentList', this.trackingByShipmentList)
      }
    });
  }

  ngOnInit() {
    this.TrackingViewStatus = this.trackingByShipmentList;
    this.TrackingViewList = this.trackingByShipmentList.shipment_track_activities;
    this.dataSource = new MatTableDataSource<TrackingView>(this.TrackingViewList);
  }


  goback() {
    history.back();
  }
  
}