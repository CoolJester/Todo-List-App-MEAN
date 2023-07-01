import { Component } from '@angular/core';
import { HeaderService } from '../shared/services/header.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerFirst: boolean = false;

  constructor(public headerService: HeaderService) {}

  ngOnInit(): void {
    //Fixing the header
    this.headerService.changeState('user');
  }
}
