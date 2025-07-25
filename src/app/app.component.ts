import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedTabIndex = 1;

  constructor(private router: Router) {}

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  goToUpload() {
    this.router.navigate(['/upload']);
  }

  goToOutcome() {
    this.router.navigate(['/outcome']);
  }

  onTabChange(event: any) {
    this.selectedTabIndex = event.index;
    switch (event.index) {
      case 0:
        this.router.navigate(['/dashboard']);
        break;
      case 1:
        this.router.navigate(['/upload']);
        break;
      case 2:
        this.router.navigate(['/outcome']);
        break;
      case 3:
        this.router.navigate(['/fin-lit-prog']);
        break;
    }
  }
}
