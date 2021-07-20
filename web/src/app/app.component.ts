import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @Input() selectedTheme = 'default';
  isLoggedIn$: Observable<boolean> = of();
  get isNotFoundPage(): boolean {
    return this.router.url.includes('not-found');
  }

  constructor(public overlayContainer: OverlayContainer, public authService: AuthService, private router: Router) {
    if (localStorage.getItem('selectedTheme')) {
      this.selectedTheme = localStorage.getItem('selectedTheme') || 'default';
    } else {
      localStorage.setItem('selectedTheme', 'default');
    }
    this.overlayContainer.getContainerElement().classList.add(this.selectedTheme);
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  changeSelectedTheme(theme: string): void {
    this.overlayContainer.getContainerElement().classList.remove(this.selectedTheme);
    this.selectedTheme = theme;
    this.overlayContainer.getContainerElement().classList.add(this.selectedTheme);
  }
}
