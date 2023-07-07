import { Component, EventEmitter, Output } from '@angular/core';
import { TasksService } from 'src/app/shared/services/tasks.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent {
  @Output() state = new EventEmitter<boolean>();

  constructor(private taskService: TasksService) {}

  success = false;
  failed = false;

  onSubmit(form: any) {
    //try to push the values if there are any
    this.taskService
      .addTask(
        form.value.title,
        form.value.status ? form.value.status : '',
        new Date(new Date(form.value.date).toISOString()) || new Date(),
        form.value.Time ? form.value.Time : '',
        form.value.Notes ? form.value.Notes : ''
      )
      .subscribe(
        (data) => {
          this.success = true;
          form.reset();
          setTimeout(() => {
            this.onClose();
          }, 2000);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onClose() {
    this.state.emit(false);
  }
}
