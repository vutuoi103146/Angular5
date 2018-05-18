import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class AppService {

  private parentSaySource = new Subject<string>();
  private childSaySource = new Subject<string>();
  
  parentSaid$ = this.parentSaySource.asObservable();
  childSaid$ = this.childSaySource.asObservable();
  parentSay(message: string) {
    this.parentSaySource.next(message);
  }
  childSay(message: string) {
    this.childSaySource.next(message);
  }
}
