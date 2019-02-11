import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  private subject = new Subject<any>();
 
    toggleHeaderComponents(isLoggedIn:boolean)
    {
      this.subject.next({ isLoggedIn: isLoggedIn });
    }
 
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
