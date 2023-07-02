import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../shared/services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  //Possible page to be on
  landing = true;
  user = false;
  main = false;

  //helper variables
  profileMenu = false;

  constructor(public headerService: HeaderService) {}

  ngOnInit(): void {
    // Changing the header content dynamically
    this.headerService.stateUpdate.subscribe((state) => {
      if (state === 'user') {
        this.user = true;
        this.landing = false;
        this.main = false;
      } else if (state === 'landing') {
        this.user = false;
        this.landing = true;
        this.main = false;
      } else {
        this.user = false;
        this.landing = false;
        this.main = true;
      }
    });
  }

  toggleProfileMenu() {
    console.log('Works');
    this.profileMenu = !this.profileMenu;
  }
}
