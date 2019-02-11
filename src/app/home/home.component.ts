import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from '../_services/message.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private messageService: MessageService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.messageService.toggleHeaderComponents(true);
  }

  getAllUsers()
  {
    this.userService.getAll()
        .subscribe(
          data =>{
            console.log(data);
          },
          error => {
            console.log(error);
          }
        );
  }

  registryWithDayCare()
  {
    this.router.navigateByUrl('/daycarereg');
  }
}
