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
}
