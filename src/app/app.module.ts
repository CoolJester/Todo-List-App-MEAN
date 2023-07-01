import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { AppRouterModule } from './app.router.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
  ],
  imports: [BrowserModule, AppRouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
