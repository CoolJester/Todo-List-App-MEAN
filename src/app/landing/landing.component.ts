import { Component } from '@angular/core';
import { HeaderService } from '../shared/services/header.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent {
  constructor(public headerService: HeaderService) {}

  ngOnInit(): void {
    //Fixing the header
    this.headerService.changeState('landing');
  }
}
