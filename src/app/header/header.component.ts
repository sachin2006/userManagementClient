import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
 
import { AuthenticationService } from '../_services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../_services/message.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  hideComponent = false;
  subscription: Subscription;
  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private messageService: MessageService) { 
                // subscribe to home component messages
              this.subscription = this.messageService.getMessage().subscribe(message => {
                      this.hideComponent = message;
                    })
              }

  ngOnInit() {
    if (this.authenticationService.currentUserValue) { 
      //hide login and register and show sign out
      this.hideComponent = true;  
    }
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.hideComponent = false;
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

}
