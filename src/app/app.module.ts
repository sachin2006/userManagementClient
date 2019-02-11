import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/index';
import { DayCareRegistrationComponent } from './day-care-registration/day-care-registration.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    RegisterComponent,
    HomeComponent,
    DayCareRegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          //console.log(JSON.parse(localStorage.getItem('currentUser')).token);
          if(localStorage.getItem('currentUser'))
            return JSON.parse(localStorage.getItem('currentUser')).token;
          return '';
        },
        whitelistedDomains: ['localhost:4000'],
        blacklistedRoutes: ['localhost:4000/users/authenticate',
                            'localhost:4000/users/register',
                            'localhost:4000/users/checkAvailability']
      }
    })
  ],
  providers: [JwtHelperService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
