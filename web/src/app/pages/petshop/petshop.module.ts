import { AppMaterialModule } from './../../modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { PetshopComponent } from './petshop.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [PetshopComponent],
  imports: [
    CommonModule,
    GoogleMapsModule,
    HttpClientJsonpModule,
    ReactiveFormsModule,
    AppMaterialModule
  ],
  exports: [
    PetshopComponent
  ]
})
export class PetshopModule { }
