import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TasksService {
  constructor(private http: HttpClient) {}

  public getTasks() {
    return this.http.get('http://localhost:3000/api/tasks');
  }

  public searchTasks(search: String) {
    return this.http.get('http://localhost:3000/api/tasks?search=' + search);
  }

  public addTask(
    title: String,
    status: String,
    date: Date,
    time: String,
    notes: String
  ) {
    const userData = {
      title: title,
      status: status,
      date: date,
      time: time,
      notes: notes,
    };
    return this.http.post('http://localhost:3000/api/tasks', userData);
  }

  public editTask(
    taskId: String,
    title: String,
    status: String,
    date: Date,
    time: String,
    notes: String
  ) {
    const userData = {
      title: title,
      status: status,
      date: date,
      time: time,
      notes: notes,
    };
    return this.http.put('http://localhost:3000/api/tasks/' + taskId, userData);
  }

  public deleteTask(taskId: String) {
    return this.http.delete('http://localhost:3000/api/tasks/' + taskId);
  }
}
