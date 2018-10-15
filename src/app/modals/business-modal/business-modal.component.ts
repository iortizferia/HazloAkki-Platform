import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MXLocationService } from '../../core/http/utils/location.service';
import { CategoryService } from '../../core/http/business/category.service';
import { Item } from '../../shared/models/item.model';
import { PaymentMethodService } from '../../core/http/business/payment-method.service';
import { Category } from '../../shared/models/category.model';
import { ServiceService } from '../../core/http/business/service.service';
import { CardTypeService } from '../../core/http/business/cardtype.service';

import { MapsAPILoader, AgmMap } from '@agm/core';
import { Location } from '../../shared/models/map.model';
import { MXLocation } from '../../shared/models/mxlocation.model';

declare var google: any;

@Component({
  selector: 'app-business-modal',
  templateUrl: './business-modal.component.html',
  encapsulation: ViewEncapsulation.None
})
export class BusinessModalComponent implements OnInit {

  categories: Array<Category>;
  pMethods: Array<Item>;
  services: Array<Item>;
  cardtypes: Array<Item>;
  value: any = {};
  currentLocation=new MXLocation();

  //Handling Map
  geocoder: any;
  location: Location = {
    lat: 19.432608,
    lng: -99.133208,
    marker: {
      lat: 19.432608,
      lng: -99.133208,
      draggable: true
    },
    country: "México",
    zoom: 12
  };

  @ViewChild(AgmMap) map: AgmMap;

  constructor(public bsModalRef: BsModalRef,
    public mapsApiLoader: MapsAPILoader,
    private mxLocationService: MXLocationService,
    private categoryService: CategoryService,
    private paymentMethodService: PaymentMethodService,
    private serviceService: ServiceService,
    private cardTypeService: CardTypeService) {

    this.mapsApiLoader = mapsApiLoader;
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(
      categories => {
        this.categories = categories;
      });
    this.paymentMethodService.getPaymentMethods().subscribe(
      pm => {
        this.pMethods = pm.map(pm => {
          let item = new Item();
          item.id = pm.id;
          item.text = pm.nombre;
          return item;
        });
      }
    );
    this.serviceService.getServices().subscribe(
      services => {
        this.services = services.map(serv => {
          let item = new Item();
          item.id = serv.id;
          item.text = serv.nombre;
          return item;
        });
      }
    );
    this.cardTypeService.getCardType().subscribe(
      cardtypes => {
        this.cardtypes = cardtypes.map(cardtype => {
          let item = new Item();
          item.id = cardtype.id;
          item.text = cardtype.nombre;
          return item;
        });
      }
    );
  }

  getLocation(zipcode: string, form:any) {
    console.log("Consultando zip code:" + zipcode,form);

    this.mxLocationService.getLocation(zipcode).subscribe(
      location => {
        console.log(location);
        if (location.municipio) {
          this.currentLocation = location;
          let full_address: string = (form.street || "" ) + form.extnum;
          full_address = full_address+ " " + location.municipio+ " " 
          + location.estado+ " " + this.location.country

          this.findLocation(full_address);
        }
      },
      ERROR => {
        console.error("Error al obtener el código postal");
      }
    );
  }

  findLocation(address) {
    if (!this.geocoder) this.geocoder = new google.maps.Geocoder()
    this.geocoder.geocode({
      'address': address
    }, (results, status) => {
      console.log(results);
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0].geometry.location) {
          this.location.lat = results[0].geometry.location.lat();
          this.location.lng = results[0].geometry.location.lng();
          this.location.marker.lat = results[0].geometry.location.lat();
          this.location.marker.lng = results[0].geometry.location.lng();
          this.location.marker.draggable = true;
          this.location.viewport = results[0].geometry.viewport;
          this.location.zoom = 12;
        }
        this.map.triggerResize()
      } else {
        alert("No hay suficientes datos para localizar tu ubicación exacta");
      }
    })
  }

}
