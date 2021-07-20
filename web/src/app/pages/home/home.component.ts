import { Component, OnInit } from '@angular/core';
import { MatCarousel, MatCarouselComponent } from '@ngbmodule/material-carousel';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  slides = [
    { image: '../../../assets/img/banners/alimentacao-prejudicial.svg' },
    { image: '../../../assets/img/banners/coisas-legais.gif' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
