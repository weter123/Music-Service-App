/*********************************************************************************
* WEB422 – Assignment 05
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
* assignment has been copied manually or electronically from any other source (including web sites) or
* distributed to other students.
*
* Name: Ahmad Al Gailani Student ID: 033198151 Date: 2022-03-25
*
********************************************************************************/
import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router, Event } from '@angular/router';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'web422-a4';
  searchString : String | undefined ;
  public token: any;
  
  handleSearch(){
    this.router.navigate(['/search'], { queryParams: { q: this.searchString} });
    this.searchString ="";
  }
  constructor( private router: Router, private auth: AuthService ){}
  public ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) { // only read the token on "NavigationStart"
        this.token = this.auth.readToken();
      }
    });
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
}

logout(){
  localStorage.clear();
  this.router.navigate(['/login']);
}
 
}
