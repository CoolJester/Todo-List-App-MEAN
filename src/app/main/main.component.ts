import { Component } from '@angular/core';
import { HeaderService } from '../shared/services/header.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  constructor(public headerService: HeaderService) {}

  ngOnInit(): void {
    //Fixing the header
    this.headerService.changeState('main');
  }
}
