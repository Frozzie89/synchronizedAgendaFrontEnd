import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { HttpClientModule } from "@angular/common/http";
import { HomepageComponent } from './homepage/homepage.component';
import { WelcomepageComponent } from './application/welcomepage/welcomepage.component';
import { NavbarCalendarComponent } from './application/navbar-calendar/navbar-calendar.component';


@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        LoginComponent,
        SignUpComponent,
        HomepageComponent,
        WelcomepageComponent,
        NavbarCalendarComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
