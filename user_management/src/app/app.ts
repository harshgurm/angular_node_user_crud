import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Messages } from './messages/messages';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Messages],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('user_management');
}
