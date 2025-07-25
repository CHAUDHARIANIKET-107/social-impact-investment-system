import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) {}

  goToDashboard(event: Event) {
    event.preventDefault();
    const appRoot = document.querySelector('app-root') as any;
    if (appRoot && appRoot.__ngContext__) {
      try {
        const ngComponent = appRoot.__ngContext__[8];
        if (ngComponent && typeof ngComponent.selectedTabIndex === 'number') {
          ngComponent.selectedTabIndex = 1;
        }
      } catch {}
    }
    this.router.navigate(['/dashboard']);
  }

  goToOutcome(event: Event) {
    event.preventDefault();
    const appRoot = document.querySelector('app-root') as any;
    if (appRoot && appRoot.__ngContext__) {
      try {
        const ngComponent = appRoot.__ngContext__[8];
        if (ngComponent && typeof ngComponent.selectedTabIndex === 'number') {
          ngComponent.selectedTabIndex = 3;
        }
      } catch {}
    }
    this.router.navigate(['/outcome']);
  }

  goToFinLieracy(event: Event) {
    event.preventDefault();
    const appRoot = document.querySelector('app-root') as any;
    if (appRoot && appRoot.__ngContext__) {
      try {
        const ngComponent = appRoot.__ngContext__[8];
        if (ngComponent && typeof ngComponent.selectedTabIndex === 'number') {
          ngComponent.selectedTabIndex = 3;
        }
      } catch {}
    }
    this.router.navigate(['/fin-lit-prog']);
  }
}
