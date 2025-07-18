import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from '../services/message';
import { MessageI } from '../interfaces/message-i';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-messages',
  imports: [NgClass],
  templateUrl: './messages.html',
  styleUrl: './messages.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({ opacity: 0, transform: 'translateY(20px)' })
        ),
      ]),
    ]),
  ],
})


export class Messages {
  message: MessageI | null = null;
  private messageSubscription!: Subscription;
  private timer: any;

  constructor(private messageService: Message) {}

  ngOnInit() {
    this.messageSubscription = this.messageService.message$.subscribe(
      (message) => {
        this.message = message;
        this.timer = setTimeout(() => (this.message = null), 5000); // Auto-hide after 5 seconds
      }
    );
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
    clearTimeout(this.timer);
  }
}
