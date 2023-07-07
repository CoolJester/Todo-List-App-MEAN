import { Component } from '@angular/core';

import { HeaderService } from '../shared/services/header.service';
import { TasksService } from '../shared/services/tasks.service';
import { Task } from '../shared/models/task';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  constructor(
    public headerService: HeaderService,
    private tasksService: TasksService
  ) {}

  //Data
  tasks: Task[] = [];

  ngOnInit(): void {
    //Fixing the header
    this.headerService.changeState('main');

    //Getting all the tasks for the user
    this.tasksService.getTasks().subscribe(
      (data: Task[]) => {
        this.tasks = data;
        // Fixing the date
        this.tasks.forEach((task) => {
          task.date = new Date(task.date);
        });
      },
      (error) => {
        //When something goes wrong
        switch (error.status) {
          case 404:
            //No tasks
            console.log('No Tasks Found');
            break;
          case 403:
            //Not authorizated
            console.log('Can not access these tasks');
            break;
          case 500:
            //When we have a server side error
            console.log('Something went wrong on the server');
            break;
        }
      }
    );
  }

  sortSelected(select: any) {
    switch (select.value) {
      case 'Date':
        //When Date is selected
        this.tasks;
        break;
      case 'Status':
        //When Status is selected
        this.tasks;
        break;
      case 'Name':
        //When Name is selected

        break;
    }
  }
}
