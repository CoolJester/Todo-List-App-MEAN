import { Component, EventEmitter, Output } from '@angular/core';

import { Task } from 'src/app/shared/models/task';
import { TasksService } from 'src/app/shared/services/tasks.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent {
  @Output() state = new EventEmitter<boolean>();
  @Output() newTask = new EventEmitter<Task>();

  constructor(private taskService: TasksService) {}

  success = false;
  failed = false;

  onSubmit(form: any) {
    //try to push the values if there are any
    this.taskService
      .addTask(
        form.value.title,
        form.value.status ? form.value.status : 'Busy',
        form.value.date
          ? new Date(new Date(form.value.date).toISOString())
          : new Date(),
        form.value.time ? form.value.time : '',
        form.value.notes ? form.value.notes : ''
      )
      .subscribe(
        (data: any) => {
          //Success message
          this.success = true;
          //Form reset
          form.reset();
          //Pushing the new task data to parent
          const newTask = {
            _id: data.createdTask._id,
            title: data.createdTask.title,
            date: new Date(data.createdTask.date),
            notes: data.createdTask.notes,
            status: data.createdTask.status,
            userId: data.createdTask.userId,
          };
          this.newTask.emit(newTask);
          //Hidding the window
          setTimeout(() => {
            this.onClose();
          }, 2000);
        },
        (error) => {
          //Success message
          this.failed = true;
        }
      );
  }

  onClose() {
    this.state.emit(false);
  }
}
