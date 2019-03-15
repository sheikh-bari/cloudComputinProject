import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HelperService } from '../services/helper.service';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  routeLinks: any[];
  activeLink = '';
  userObj: any;
  userType: any;
  hostLink: any;
  isLoggedIn$: boolean = false;
  

  constructor(private router: Router,
    private dialog: MatDialog,
    private helper: HelperService,
    private route: ActivatedRoute,
    private apiService: ApiService) {   

  }

  ngOnInit() {
    if (localStorage.getItem('userObj')) {
      this.helper.userObj = JSON.parse(localStorage.getItem('userObj'));
      this.userType = this.helper.userObj.userType;
      this.hostLink = this.apiService.END_POINT;
      this.userObj = this.helper.userObj;
           
    }

    this.apiService.isLoggedIn.subscribe((val) => {
      this.isLoggedIn$ = val;
    }, (err) => {});

    this.routeLinks = [
      {
        label: 'Dashboard',
        link: './dashboard'
      },
      {
        label: 'Reports',
        link: './mediareports'
      }
    ];

    this.userObj = this.helper.userObj;

    this.router.events.subscribe((res) => {
      this.activeLink = '.' + this.router.url;
    })
  }


  logout() {
    localStorage.removeItem('userObj');

    this.apiService.logout();
    this.router.navigate(['home']);
  }
}
