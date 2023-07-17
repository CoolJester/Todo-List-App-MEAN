import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { AuthService } from '../shared/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      providers: [AuthService],
      imports: [RouterTestingModule, FormsModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
  });

  // test case/s
  it('should register user and navigate to main on success', () => {
    const mockForm = {
      value: {
        email: 'admin1@admin.com',
        password: 'password',
        cPassword: 'password',
      },
    };

    // Simulate
    spyOn(authService, 'register').and.returnValue(of({ token: 'mockToken' }));
    // Spy on
    spyOn(component.router, 'navigate');

    component.formSubmit(mockForm);

    expect(authService.register).toHaveBeenCalledWith(
      mockForm.value.email,
      mockForm.value.password
    );

    expect(component.router.navigate).toHaveBeenCalledWith(['/main']);
  });

  it('should handle user already exists error', () => {
    const mockForm = {
      value: {
        email: 'admin@admin.com',
        password: 'password',
        cPassword: 'password',
      },
    };

    // Simulate an error
    spyOn(authService, 'register').and.returnValue(throwError({ status: 403 }));

    component.formSubmit(mockForm);

    expect(authService.register).toHaveBeenCalledWith(
      mockForm.value.email,
      mockForm.value.password
    );

    expect(component.userExists).toBe(true);
  });

  it('should handle registration failure error', () => {
    const mockForm = {
      value: {
        email: 'admin@admin.com',
        password: 'password',
        cPassword: 'password',
      },
    };

    // Simulate an error
    spyOn(authService, 'register').and.returnValue(throwError({ status: 400 }));

    component.formSubmit(mockForm);

    expect(authService.register).toHaveBeenCalledWith(
      mockForm.value.email,
      mockForm.value.password
    );

    expect(component.error).toBe(true);
  });

  it('should handle hashing error', () => {
    const mockForm = {
      value: {
        email: 'admin@admin.com',
        password: 'password',
        cPassword: 'password',
      },
    };

    // Simulate an error
    spyOn(authService, 'register').and.returnValue(throwError({ status: 500 }));

    component.formSubmit(mockForm);

    expect(authService.register).toHaveBeenCalledWith(
      mockForm.value.email,
      mockForm.value.password
    );

    expect(component.error).toBe(true);
  });

  it('should set matches to true (meaning do not match) if passwords do not match', () => {
    const mockForm = {
      value: {
        email: 'admin@admin.com',
        password: 'password',
        cPassword: 'anotherPassword',
      },
    };

    component.formSubmit(mockForm);

    expect(component.matches).toBe(true);
  });
});
