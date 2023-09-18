import { Component, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { Global } from './global';
import { UserService } from './service/api/user.service';
import { GlobalService } from './service/api/global.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'vsadmin-client';
  opened = true;
  drawerMode: any = 'side';
  expandHeight = '42px';
  collapseHeight = '42px';
  displayMode = 'flat';
  watcher: Subscription;
  applicationdetails: any;
  userNameToDisplay: string;
  siteLinkToDisplay: string;
  geolocationPosition: any;
  @ViewChild('sidenav', { static: true }) myNav: MatSidenav;

  constructor(media: MediaObserver, private router: Router, private userService: UserService, private globalService: GlobalService,
    private global: Global) {
    this.watcher = media.asObservable().subscribe((changes: MediaChange[]) => changes.some((change: MediaChange) => {
      if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
        this.opened = true;
        this.drawerMode = 'side';
      } else {
        this.opened = false;
        this.drawerMode = 'side';
      }
    }));
  }

  ngOnInit() {

  }

  navigate(component) {
    this.router.navigate(['' + component + '']);
  }

  toggleSideNav() {
    this.myNav.toggle();
  }
  
}
