import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MXLocationService } from '../../core/http/utils/location.service';
import { CategoryService } from '../../core/http/business/category.service';
import { PaymentMethodService } from '../../core/http/business/payment-method.service';
import { Category } from '../../shared/models/category.model';
import { ServiceService } from '../../core/http/business/service.service';
import { CardTypeService } from '../../core/http/business/cardtype.service';

import { MapsAPILoader, AgmMap } from '@agm/core';
import { Location } from '../../shared/models/map.model';
import { MXLocation } from '../../shared/models/mxlocation.model';
import { Business } from '../../shared/models/business.model';
import { PaymentMethod } from '../../shared/models/payment-method.model';
import { Service } from '../../shared/models/service.model';
import { CardType } from '../../shared/models/card-type.model';
import { NgForm } from '@angular/forms';
import { BusinessService } from '../../core/http/business/business.service';

declare var google: any;

@Component({
  selector: 'app-business-modal',
  templateUrl: './business-modal.component.html',
  encapsulation: ViewEncapsulation.None
})
export class BusinessModalComponent implements OnInit {

  categories: Array<Category>;
  pMethods = { methods: new Array<PaymentMethod>(), currentPmethods: new Array<string>() };
  services = { svc: new Array<Service>(), currentServices: new Array<string>() };
  cards = { types: new Array<CardType>(), currentCardTypes: new Array<string>() };
  currentLocation = new MXLocation();

  business: Business;
  submitted: boolean;
  onSaved:any;

  mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  timeMask = [/[0-9]/, /\d/,':', /[0-9]/, /\d/];

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
    zoom: 16
  };

  @ViewChild(AgmMap) map: AgmMap;

  constructor(public bsModalRef: BsModalRef,
    private modalService: BsModalService,
    public mapsApiLoader: MapsAPILoader,
    private businessService: BusinessService,
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
        this.pMethods.methods = pm;
      }
    );
    this.serviceService.getServices().subscribe(
      services => {
        this.services.svc = services;
      }
    );
    this.cardTypeService.getCardType().subscribe(
      cardtypes => {
        this.cards.types = cardtypes;
      }
    );

    console.log("Llegando business", this.business);

    if (this.business == null || !this.business) {
      this.business = new Business();
      this.business.idCategoria = 0;
    } else {
      this.business.serviciosList.map((serv => this.services.currentServices.push(serv.id)));
      this.business.metodoPagoList.map((method => this.pMethods.currentPmethods.push(method.id)));
      this.business.tipoTarjetaList.map((cardType => this.cards.currentCardTypes.push(cardType.id)));
      this.location.lat = this.business.latitud;
      this.location.lng = this.business.longitud;
      this.location.marker.lat = this.business.latitud;
      this.location.marker.lng = this.business.longitud;
      this.getLocation(this.business.codigoPostal,null,false);
    }
  }

  getLocation(zipcode: string, form: any, findLocation:boolean) {
    console.log("Consultando zip code:" + zipcode, form);
    if (zipcode && zipcode != '') {
      this.mxLocationService.getLocation(zipcode).subscribe(
        location => {
          console.log(location);
          if (location.municipio) {
            this.currentLocation = location;            
            if(findLocation){
              let full_address: string = (form.street || "") + form.extnum;
              full_address = full_address + " " + location.municipio + " "
              + location.estado + " " + this.location.country
              this.findLocation(full_address);
            }
            this.business.delegacion = location.municipio;
            this.business.colonia = location.colonias.length === 1 ? location.colonias[0] : null;
          }
        },
        ERROR => {
          console.error("Error al obtener el código postal");
        }
      );
    }
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
          this.location.zoom = 16;
        }
        this.map.triggerResize()
      } else {
        console.error("No hay suficientes datos para localizar tu ubicación exacta");
      }
    })
  }

  markerDragEnd(event:any){
    console.log("Updating marker",event);
    this.location.marker.lat = event.coords.lat;
    this.location.marker.lng = event.coords.lng;
  }

  saveBusiness(form: NgForm) {
    console.log("Consultando zip code:", form);    
    console.log("Services", this.services.currentServices);
    console.log("Value", this.business.serviciosList);
    this.submitted = true;
    if (form.valid) {
      console.log("El formulario es valido");
      this.business.serviciosList = new Array<Service>();
      this.business.metodoPagoList = new Array<PaymentMethod>();
      this.business.tipoTarjetaList = new Array<CardType>();

      this.services.currentServices.map( serviceId => this.business.serviciosList.push(new Service(serviceId)));
      this.pMethods.currentPmethods.map( methodId => this.business.metodoPagoList.push(new PaymentMethod(methodId)));
      this.cards.currentCardTypes.map(cardTypeId => this.business.tipoTarjetaList.push(new CardType(cardTypeId)));
      //Set location
      this.business.latitud = this.location.marker.lat;
      this.business.longitud = this.location.marker.lng;

      this.business.telefono = this.business.telefono.replace(/\D+/g, '');
      let user = JSON.parse(sessionStorage.getItem("currentUser"));
      this.business.idCuenta = user.idCuenta;
      this.business.estatus = true;

      console.log("Business", this.business);

      if(this.business.idNegocio!=null && this.business.idNegocio!=''){
        this.businessService.update(this.business).subscribe(
          updateBusiness =>{
            console.log("Se actualizó correctament el negocio", updateBusiness);    
            this.onSaved(true);
          }, 
          error =>{
            console.error("Error al actualizar el negocio en el sistema", error, this.business);
            this.onSaved(false);
          });
      }else{
        this.businessService.create(this.business).subscribe(
          newBusiness =>{
            console.log("Se guardo correctament el negocio", newBusiness);    
            this.onSaved(true);
          }, 
          error =>{
            console.error("Error al guardar el negocio en el sistema", error);
            this.onSaved(false);
          });
      }      
    }
  }

}
