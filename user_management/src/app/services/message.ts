import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { MessageI } from '../interfaces/message-i';

@Injectable({
  providedIn: 'root',
})
export class Message {
  private messageSubject = new Subject<MessageI>();

  message$: Observable<MessageI> = this.messageSubject.asObservable();

  showSuccess(text: string) {
    this.messageSubject.next({ text, type: 'success' });
  }

  showError(text: string) {
    this.messageSubject.next({ text, type: 'error' });
  }
}