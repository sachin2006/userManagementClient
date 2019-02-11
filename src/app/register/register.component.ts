import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService, AuthenticationService } from '../_services';

@Component({templateUrl: './register.component.html',
            selector: 'app-register',
            styleUrls: ['./register.component.scss']})

export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    gobalErrorMessage = '';
    loadingCheckAvailability = false;
    isCheckAvailabilityClicked = false;
    isAvailable = false;
    isNotAvailable = true;
    mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$"; 

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) { 
        
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', [Validators.required,Validators.minLength(3)]],
            lastName: ['', [Validators.required,Validators.minLength(3)]],
            email:['', [Validators.required, Validators.email]],
            mobileNumber:['',[Validators.required,Validators.pattern(this.mobnumPattern)]],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;
        this.resetAvailabilityFlag();
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        this.loading = true;
        this.userService.register(this.registerForm.value)
            .subscribe(
                data => {
                    console.log('Registration is successfull, redirect to thank you page.')
                    this.router.navigate(['/login']);
                },
                error => {
                    this.gobalErrorMessage =  error.error.message;
                    this.loading = false;
                });
    }
    
    resetAvailabilityFlag()
    {
        this.isAvailable = false;
        this.isNotAvailable = true;
    }

    /**
     * Check Availability of the user name
     */
    checkAvailability()
    {
        this.loadingCheckAvailability = true;
        if(this.f.username.value != '')
        {
            this.userService.checkUserAvailability(this.f.username.value)
                .subscribe(
                    data => {
                    this.resetAvailabilityFlag();
                    if(data['isAvailable'])
                    {
                        this.isAvailable = data['isAvailable'];
                    }
                    else
                    {
                        this.isNotAvailable = data['isAvailable'];    
                    }
                    this.loadingCheckAvailability = false;
                },
                error => {
                    console.log('User Name not Available.') 
                    console.log(JSON.stringify(error));
                    this.loadingCheckAvailability = false;
                }
            );    
        }
        else
        {
            this.isCheckAvailabilityClicked = true;
            this.f.username.setValidators(Validators.required);
            this.loadingCheckAvailability = false;
        }
    }
}
