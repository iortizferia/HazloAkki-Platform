import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MXLocationService } from '../../core/http/utils/location.service';
import { CategoryService } from '../../core/http/business/category.service';
import { PaymentMethodService } from '../../core/http/business/payment-method.service';
import { Category } from '../../shared/models/category.model';
import { Horario, Dia, HorarioNegocio } from '../../shared/models/horario.model';
import { Imagen } from "../../shared/models/imagen.model";
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
import { FileUploader } from 'ng2-file-upload';
import { BusinessImageService } from 'src/app/core/http/business/business.image.service';
import { AccionesService } from 'src/app/core/http/business/acciones.service';
import { Accion } from 'src/app/shared/models/accion.model';

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
  actions = { actions: new Array<Accion>(), currentActions: new Array<string>() };
  currentLocation = new MXLocation();

  business: Business;
  submitted: boolean;
  onSaved: any;

  mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  timeMask = [/[0-9]/, /\d/, ':', /[0-9]/, /\d/];

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

  horarios = new Array<Horario>();
  dias = new Array<Dia>();
  catHoras = [{ hora: "0" }, { hora: "1" },
  { hora: "08:00 AM" }, { hora: "08:30 AM" }, { hora: "09:00 AM" }, { hora: "09:30 AM" },
  { hora: "10:00 AM" }, { hora: "10:30 AM" }, { hora: "11:00 AM" }, { hora: "11:30 AM" },
  { hora: "12:00 PM" }, { hora: "12:30 PM" }, { hora: "01:00 PM" }, { hora: "01:30 PM" },
  { hora: "02:00 PM" }, { hora: "02:30 PM" }, { hora: "03:00 PM" }, { hora: "03:30 PM" },
  { hora: "04:00 PM" }, { hora: "04:30 PM" }, { hora: "05:00 PM" }, { hora: "05:30 PM" },
  { hora: "06:00 PM" }, { hora: "06:30 PM" }, { hora: "07:00 PM" }, { hora: "07:30 PM" },
  { hora: "08:00 PM" }, { hora: "08:30 PM" }, { hora: "09:00 PM" }, { hora: "09:30 PM" },
  { hora: "10:00 PM" }, { hora: "10:30 PM" }
  ];

  uploader: FileUploader = new FileUploader({ isHTML5: true });
  hasBaseDropZoneOver: boolean = false;

  constructor(public bsModalRef: BsModalRef,
    private modalService: BsModalService,
    public mapsApiLoader: MapsAPILoader,
    private businessService: BusinessService,
    private mxLocationService: MXLocationService,
    private categoryService: CategoryService,
    private paymentMethodService: PaymentMethodService,
    private serviceService: ServiceService,
    private cardTypeService: CardTypeService,
    private businessImageService: BusinessImageService,
    private accionesService: AccionesService) {

    this.mapsApiLoader = mapsApiLoader;
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });

  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  imagenes = new Array<Imagen>();
  imgToDelete = new Array<Imagen>();
  imgProfileSelected = 0;

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      var reader = new FileReader();
      reader.readAsDataURL(file._file);
      reader.onload = (_event) => {
        let newImage = new Imagen(reader.result);
        newImage.idexFile = this.uploader.queue.length - 1;
        this.imgProfileSelected = this.imagenes.length === 0 ? 0: this.imgProfileSelected;
        this.imagenes.push(newImage);
      }
    };

    this.accionesService.getActions().subscribe(acciones => {
      console.log("Recuperando acciones", acciones);
      this.actions.actions = acciones;
    });

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
    this.dias.push(new Dia(1, "Sábado", new Array<Horario>(new Horario("0", "0"))));
    this.dias.push(new Dia(2, "Domingo", new Array<Horario>(new Horario("0", "0"))));
    this.dias.push(new Dia(3, "Lunes", new Array<Horario>(new Horario("0", "0"))));
    this.dias.push(new Dia(4, "Martes", new Array<Horario>(new Horario("0", "0"))));
    this.dias.push(new Dia(5, "Miércoles", new Array<Horario>(new Horario("0", "0"))));
    this.dias.push(new Dia(6, "Jueves", new Array<Horario>(new Horario("0", "0"))));
    this.dias.push(new Dia(7, "Viernes", new Array<Horario>(new Horario("0", "0"))));

    if (this.business == null || !this.business) {
      this.business = new Business();
      this.business.idCategoria = 0;
    } else {
      this.business.servicios.map((serv => this.services.currentServices.push(serv.id)));
      this.business.metodoPago.map((method => this.pMethods.currentPmethods.push(method.id)));
      this.business.tipoTarjeta.map((cardType => this.cards.currentCardTypes.push(cardType.id)));
      this.business.acciones.forEach(idAccion => this.actions.currentActions.push(""+idAccion));

      this.business.horario.map(horario => {
        let dia = this.dias[horario.idDia - 1];
        dia.abierto = horario.abierto;
        dia.veintiCuatroHrs = horario.veinticuatroHrs;
        dia.horario = new Array<Horario>();
        dia.horario.push(new Horario(horario.abre, horario.cierra));
      });

      this.businessImageService.obtenerImagenes(this.business.idNegocio).subscribe(imagenes => {
        console.log("Recuperando imagenes", imagenes);
        this.imagenes = imagenes;
        this.imagenes.forEach( (img, index) =>{
          if(img.perfil)
            this.imgProfileSelected = index;
        });
      });

      this.location.lat = Number(this.business.latitud);
      this.location.lng = Number(this.business.longitud);
      this.location.marker.lat = Number(this.business.latitud);
      this.location.marker.lng = Number(this.business.longitud);
      this.getLocation(this.business.codigoPostal, null, false);
    }

  }

  getLocation(zipcode: string, form: any, findLocation: boolean) {
    console.log("Consultando zip code:" + zipcode, form);
    if (zipcode && zipcode != '') {
      this.mxLocationService.getLocation(zipcode).subscribe(
        location => {
          console.log(location);
          if (location.municipio) {
            this.currentLocation = location;
            if (findLocation) {
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

  markerDragEnd(event: any) {
    console.log("Updating marker", event);
    this.location.marker.lat = event.coords.lat;
    this.location.marker.lng = event.coords.lng;
  }

  saveBusiness(form: NgForm) {
    console.log("Consultando zip code:", form);
    console.log("Services", this.services.currentServices);
    console.log("Value", this.business.servicios);
    this.submitted = true;
    if (form.valid) {
      console.log("El formulario es valido");
      this.business.servicios = new Array<Service>();
      this.business.metodoPago = new Array<PaymentMethod>();
      this.business.tipoTarjeta = new Array<CardType>();
      this.business.acciones = new Array<number>();
      this.business.horario = new Array<HorarioNegocio>();

      this.services.currentServices.map(serviceId => this.business.servicios.push(new Service(serviceId)));
      this.pMethods.currentPmethods.map(methodId => this.business.metodoPago.push(new PaymentMethod(methodId)));
      this.cards.currentCardTypes.map(cardTypeId => this.business.tipoTarjeta.push(new CardType(cardTypeId)));
      this.actions.currentActions.map(idAccion => this.business.acciones.push(Number(idAccion)));

      this.dias.map(dia => {
        let horario = new HorarioNegocio();
        horario.idNegocio = this.business.idNegocio;
        horario.idDia = dia.idDia;
        horario.abierto = dia.abierto;
        horario.veinticuatroHrs = dia.veintiCuatroHrs;

        dia.horario.forEach(h => {
          if(h.abre == '1' || h.cierra == '1'){
            horario.veinticuatroHrs = true;
            return;
          }
          horario.abre = h.abre;
          horario.cierra = h.cierra;
        })
        this.business.horario.push(horario);
      });

      console.log("Horarios a guardar", this.business.horario);

      //Set location
      this.business.latitud = this.location.marker.lat;
      this.business.longitud = this.location.marker.lng;

      this.business.telefono = this.business.telefono.replace(/\D+/g, '');
      let user = JSON.parse(sessionStorage.getItem("currentUser"));
      this.business.idCuenta = user.idCuenta;
      this.business.idEstatus = 1;

      console.log("Business", this.business);
      
      if (this.business.idNegocio != null && this.business.idNegocio != '') {
        this.businessService.update(this.business).subscribe(
          updateBusiness => {
            console.log("Se actualizó correctament el negocio", updateBusiness);
            this.uploadImagen(this.business.idNegocio);
            this.onSaved(true);
          },
          error => {
            console.error("Error al actualizar el negocio en el sistema", error, this.business);
            this.onSaved(false);
          });
      } else {
        this.businessService.create(this.business).subscribe(
          newBusiness => {
            console.log("Se guardo correctament el negocio", newBusiness);
            this.uploadImagen(newBusiness.idNegocio);
            this.onSaved(true);
          },
          error => {
            console.error("Error al guardar el negocio en el sistema", error);
            this.onSaved(false);
          });
      }
    }
  }

  eliminarImagen(index:number){
    let imagen = this.imagenes[index];
    this.imagenes.splice(index, 1);
    this.uploader.queue.splice(index, 1); 
    if(imagen.idImagen != null){
      this.imgToDelete.push(imagen);
    }  
    this.imgProfileSelected = 0;
  }

  uploadImagen(idNegocio: string) {    
    this.imagenes[this.imgProfileSelected].perfil = true;
    let data = new FormData();
    console.log("Subiendo imagen")    
    this.imagenes.forEach(img => {
      console.log("Iterando", img);
      if (img.idImagen === null) {
        let file = this.uploader.queue[img.idexFile]._file;
        data.append("imagenes", file);
        if (img.perfil) {
          console.log("La imagen de perfil es "+ file.name);
          data.append("profile", file.name);
        }
      }
    });

    let imagePerfil = this.imagenes[this.imgProfileSelected];
    console.log("Validando idImagePerfil", data);
    if(imagePerfil!=null && imagePerfil.idImagen 
      && !imagePerfil.idImagen===null ){
      console.log("Actualizando imagen como perfil", imagePerfil.idImagen );
      //Actualizar imagen perfíl
      this.businessImageService.actualizarPerfil(idNegocio, imagePerfil.idImagen).subscribe( ok => {
        console.log("Se guardo correctamente la imagen");
      }, error =>{
        console.error("Error al actualizar la imagen como perfil", error)
      });
    }
    console.log("Comprobando tag imagenes")
    if(data.has("imagenes")){
      console.log("Se tiene el form de imagenes");
      if(!data.has("profile")){
        let file = this.uploader.queue[0]._file;
        console.log("No se tiene seleccionado un perfil se tomara ", file.name);        
        data.append("profile", file.name);
      }
      //Subir imagen
      this.businessImageService.guardarImagenes(idNegocio, data).subscribe( ok => {
        console.log("Se guardaron correctamente las imagenes nuevas");
      }, error =>{
        console.error("Error al guardar las imagenes", error)
      });
    }
    if(this.imgToDelete.length>0){
      console.info("Eliminando imagenes");
      this.imgToDelete.forEach(imgToDelete =>{
        this.businessImageService.eliminarImagen(idNegocio, imgToDelete.idImagen).subscribe();
      });      
    }
  }

  removerHorario(indexP: number, indexH: number) {
    this.dias[indexP].horario.splice(indexH, 1);
  }

  agregarHorario(indexP: number) {
    let idDia = this.dias[indexP].idDia;
    console.log("Agregando " + indexP + " dia " + idDia);
    this.dias[indexP].horario.push(new Horario("0", "0"));
  }

}
