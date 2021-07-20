import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss']
})
export class ThemePickerComponent implements OnInit {
  @Output() selectedThemeChange = new EventEmitter();

  isSelected = false;

  constructor() {
    this.isSelected = localStorage.getItem('selectedTheme') === 'default';
  }

  ngOnInit(): void {
  }

  toggleButtonTheme(): void {
    this.isSelected = !this.isSelected;
    const selectedTheme = this.isSelected ? 'default' : 'petboss-dark-theme';
    localStorage.setItem('selectedTheme', selectedTheme);
    this.selectedThemeChange.emit(selectedTheme);
  }
}
