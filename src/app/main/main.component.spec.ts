import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MainComponent } from './main.component';
import { TasksService } from '../shared/services/tasks.service';
import { of, throwError } from 'rxjs';
import { Task } from '../shared/models/task';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let tasksService: TasksService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainComponent],
      providers: [TasksService],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    tasksService = TestBed.inject(TasksService);
  });

  it('should get tasks successfully', () => {
    const mockTasks: Task[] = [
      {
        _id: '1',
        title: 'Task 1',
        date: new Date(),
        notes: [],
        status: 'Pending',
        userId: '2131231231',
      },
      {
        _id: '2',
        title: 'Task 2',
        date: new Date(),
        notes: [],
        status: 'Pending',
        userId: '2131231231',
      },
    ];

    spyOn(tasksService, 'getTasks').and.returnValue(of(mockTasks));

    component.ngOnInit();

    expect(tasksService.getTasks).toHaveBeenCalled();
    expect(component.tasks).toEqual(mockTasks);
    expect(component.tasks[0].date instanceof Date).toBe(true);
    expect(component.tasks[1].date instanceof Date).toBe(true);
  });

  // Test case/s
  it('should handle no tasks error', () => {
    spyOn(tasksService, 'getTasks').and.returnValue(
      throwError({ status: 404 }) // Simulate an error response (no tasks found)
    );

    spyOn(console, 'log'); // Spy on the console's log method

    component.ngOnInit();

    expect(tasksService.getTasks).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith('No Tasks Found');
  });

  it('should handle unauthorized error', () => {
    spyOn(tasksService, 'getTasks').and.returnValue(
      throwError({ status: 403 }) // Simulate an error response (not authorized)
    );

    spyOn(console, 'log'); // Spy on the console's log method

    component.ngOnInit();

    expect(tasksService.getTasks).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith('Can not access these tasks');
  });

  it('should handle server-side error', () => {
    spyOn(tasksService, 'getTasks').and.returnValue(
      throwError({ status: 500 }) // Simulate an error response (server-side error)
    );

    spyOn(console, 'log'); // Spy on the console's log method

    component.ngOnInit();

    expect(tasksService.getTasks).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(
      'Something went wrong on the server'
    );
  });

  it('should delete task and update tasks array', () => {
    const mockTasks: Task[] = [
      {
        _id: '1',
        title: 'Task 1',
        date: new Date(),
        notes: [],
        status: 'Pending',
        userId: '2131231231',
      },
      {
        _id: '2',
        title: 'Task 2',
        date: new Date(),
        notes: [],
        status: 'Pending',
        userId: '2131231231',
      },
    ];
    const taskIdToDelete = '1';

    spyOn(window, 'confirm').and.returnValue(true); // Simulate user confirming the deletion
    spyOn(tasksService, 'deleteTask').and.returnValue(of(null)); // Simulate a successful response

    component.tasks = mockTasks;
    component.deleteTask(taskIdToDelete);

    expect(window.confirm).toHaveBeenCalled();
    expect(tasksService.deleteTask).toHaveBeenCalledWith(taskIdToDelete);
    expect(component.tasks.length).toBe(1);
    expect(component.tasks[0]._id).toBe('2');
  });

  it('should handle task deletion cancellation', () => {
    const taskIdToDelete = '1';

    spyOn(window, 'confirm').and.returnValue(false); // Simulate user canceling the deletion
    spyOn(tasksService, 'deleteTask'); // Ensure deleteTask is not called

    component.deleteTask(taskIdToDelete);

    expect(window.confirm).toHaveBeenCalled();
    expect(tasksService.deleteTask).not.toHaveBeenCalled();
  });

  it('should handle task deletion error', () => {
    const taskIdToDelete = '1';
    const errorResponse = { status: 500 };

    spyOn(window, 'confirm').and.returnValue(true); // Simulate user confirming the deletion
    spyOn(tasksService, 'deleteTask').and.returnValue(
      throwError(errorResponse)
    ); // Simulate an error response

    spyOn(window, 'alert'); // Spy on the window's alert method

    component.deleteTask(taskIdToDelete);

    expect(window.confirm).toHaveBeenCalled();
    expect(tasksService.deleteTask).toHaveBeenCalledWith(taskIdToDelete);
    expect(window.alert).toHaveBeenCalledWith(
      'Failed to delete task\n' + errorResponse.status
    );
  });
});
