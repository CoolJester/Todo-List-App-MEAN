import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../shared/services/header.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(public headerService: HeaderService) {}

  ngOnInit(): void {
    //Fixing the header
    this.headerService.changeState('user');
  }
}
