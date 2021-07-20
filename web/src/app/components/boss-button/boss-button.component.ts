import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'boss-button',
  templateUrl: './boss-button.component.html',
  styleUrls: ['./boss-button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() size!: string;
  @Input() text!: string;
  @Input() color!: string;
  @Input() icon!: string;
  @Input() iconPosition!: string;
  @Input() outline!: boolean;
  @Input() isLoading = false;
  @Input() disabled = false;

  constructor() { }

  ngOnInit(): void { }
}
