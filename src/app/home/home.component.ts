import { Component, OnInit } from '@angular/core';
import { Property } from '../property';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { User } from '../services/user';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  properties: Property[];
  agents: any;
  searchObj = {
    searchText: '',
    typeOfAccomodation: '',
    noOfBedRooms: '',
    squareFeet: '',
    adType: ''
  };
  apiCalled = false;
  hostLink: any;
  userData : User;

  constructor(private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  // Getting the recent properties on init
  ngOnInit() {
    this.apiCalled = false;
    this.hostLink = this.apiService.END_POINT;

  }

  // Input fields

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required)
});

// Function for login

login() {
    let loginData = {
        username: this.loginForm.controls['username'].value,
        password: this.loginForm.get('password').value
    }

    this.userData = {
      userName: this.loginForm.controls['username'].value,
      password: this.loginForm.get('password').value
  }
    //implement login call
    var data = {"userId":1,"userName":"sheikh", "firstName":"abdulbari", "lastName":"sheikh","userType" : 1};
    localStorage.setItem("userObj",JSON.stringify(data));
    this.apiService.login(this.userData);
    this.router.navigate(['dashboard']);
}


}
