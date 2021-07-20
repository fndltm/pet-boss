import { TokenStorageService } from './../../auth/token-storage.service';
import { AuthService } from './../../auth/auth.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() selectedThemeChange = new EventEmitter();
  get userFirstName(): string {
    return this.tokenStorageService.getUsername().split(' ')[0];
  }

  constructor(public authService: AuthService, public tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
  }

  openAngularMaterial(): void {
    window.open('https://material.angular.io/components/categories', '_blank');
  }
}
