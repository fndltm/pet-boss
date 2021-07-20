import { RequestStatus } from 'src/app/resources/enums/request-status';
import { SnackService } from 'src/app/components/boss-snack/snack.service';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-petshop',
  templateUrl: './petshop.component.html',
  styleUrls: ['./petshop.component.scss']
})
export class PetshopComponent implements OnInit {
  isLoading = false;
  defaultPos: google.maps.LatLngLiteral = { lat: -19.91648963095628, lng: -43.934471644795686 };
  places: google.maps.places.PlaceResult[] = [];

  @ViewChild('search')
  public searchElementRef!: ElementRef;

  @ViewChild('placesService')
  public placesServiceElementRef!: ElementRef;

  constructor(private httpClient: HttpClient, private snackService: SnackService) {
    httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyAC6hrM3rkTJ3AXezhSWLtg3jSbbpM6-rs&libraries=places', 'callback')
      .subscribe(_ => this.getUserLocation());
  }

  ngOnInit(): void { }

  getUserLocation(): void {
    this.initializeAutocomplete(this.defaultPos);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.initializeAutocomplete({ lat: position.coords.latitude, lng: position.coords.longitude });
      });
    }
  }

  initializeAutocomplete(pos: google.maps.LatLngLiteral): void {
    const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
      componentRestrictions: { country: 'BR' },
      fields: ['address_components', 'geometry', 'icon', 'name'],
      bounds: new google.maps.LatLngBounds(pos),
    });

    autocomplete.addListener('place_changed', () => { this.handlePlaceChanged(autocomplete) });
  }

  handlePlaceChanged = (autocomplete: google.maps.places.Autocomplete) => {
    this.places = [];
    this.isLoading = true;
    this.searchElementRef.nativeElement.click();
    this.searchElementRef.nativeElement.blur();

    const location = autocomplete.getPlace().geometry?.location;

    const placesService = new google.maps.places.PlacesService(this.placesServiceElementRef.nativeElement);

    setTimeout(() => {
      placesService.nearbySearch({
        location,
        rankBy: google.maps.places.RankBy.DISTANCE,
        keyword: 'Pet Shop'
      }, (results, status) => {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          results.forEach((result, i) => {
            if (result && result.place_id) {
              placesService.getDetails({
                placeId: result.place_id
              }, (res, status) => {
                if (res) {
                  this.places.push(res);
                }
                if (results.length - 1 == i) {
                  this.isLoading = false;
                  this.searchElementRef.nativeElement.click();
                  this.searchElementRef.nativeElement.blur();
                }
              });
            }
          });
        }
      });
    }, 200);
  }

  openMaps(url?: string) {
    if (url) { window.open(url, '_blank'); }
    else { this.snackService.openSnackBar('Erro ao abrir Google Maps! Tente novamente mais tarde!', RequestStatus.Error); }
  }
}
