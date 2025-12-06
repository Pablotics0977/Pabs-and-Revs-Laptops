import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
    <header class="navbar">
      <a [routerLink]="['/']" class="brand">
        <img src="logofinal2.png" alt="IronFit Logo" class="logo" />
        <h3>Pabs & Revs Laptops</h3>
      </a>
    </header>

    <main class="content">
      <router-outlet></router-outlet>
    </main>

    <footer class="footer">
      <p>© 2025 Pabs & Revs Laptops. Built to dominate every task.</p>
    </footer>
  `,
  styleUrls: ['./app.css']
})
export class App {}
