import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { OfferService } from 'src/app/core/http/offer/offer.service';
import { Offer } from 'src/app/shared/models/offer.model';
import { NgForm } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { Accion } from 'src/app/shared/models/accion.model';
import { Imagen } from 'src/app/shared/models/imagen.model';
import { OfferImagesService } from 'src/app/core/http/offer/offer-images.service';
import { AccionesService } from 'src/app/core/http/business/acciones.service';
import { OfferConfiguration } from 'src/app/shared/models/offer.config.model';

@Component({
  selector: 'app-offer-modal',
  templateUrl: './offer-modal.component.html',
  styleUrls: ['./offer-modal.component.scss']
})
export class OfferModalComponent implements OnInit {

  offer: Offer;
  onSaved: any;
  submitted: boolean;

  actions = { actions: new Array<Accion>(), currentActions: new Array<string>() };


  uploader: FileUploader = new FileUploader({ isHTML5: true });
  hasBaseDropZoneOver: boolean = false;

  constructor(public bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private offerService: OfferService,
    private offerImagesService: OfferImagesService,
    private accionesService: AccionesService) { }


  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  imagenes = new Array<Imagen>();
  imgToDelete = new Array<Imagen>();

  ngOnInit() {

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      var reader = new FileReader();
      reader.readAsDataURL(file._file);
      reader.onload = (_event) => {
        let newImage = new Imagen(reader.result);
        newImage.idexFile = this.uploader.queue.length - 1;
        this.imagenes.push(newImage);
      }
    };

    this.accionesService.getActions().subscribe(acciones => {
      console.log("Recuperando acciones", acciones);
      this.actions.actions = acciones;
    });

    if ( this.offer && this.offer.idOferta != null) {
      this.offerImagesService.obtenerImagenes(this.offer.idOferta).subscribe(imagenes => {
        console.log("Recuperando imagenes de ofertas", imagenes);
        this.imagenes = imagenes;
      });
      this.cargarAcciones();
    } 
    

  }

  cargarAcciones(){
    if(this.offer.acciones && this.offer.acciones!=null){
      this.offer.acciones.forEach(idAccion => this.actions.currentActions.push("" + idAccion));
    }
  }

  /*
  *No existe fecha inicio ni fin de esta oferta, 
  *al menos que la cancelen o establescan la programación de la oferta despues.
  **/
  publicarOfertaAhora(form: NgForm) {
    this.submitted = true;
    if (!form.valid)
      return;

    this.crearOferta(3);
  }

  //Se establece el inicio exacto que se publicara la oferta
  sheduleOferta(form: NgForm) {
    this.submitted = true;
    if (!form.valid)
      return;

    this.crearOferta(2);
  }

  //Solo se guarda la oferta, para publicarla es necesario hacerlo en otro momento
  guardarActualizarOferta(form: NgForm) {
    this.submitted = true;
    if (!form.valid)
      return;
    
    this.crearOferta(1);
  }

  crearOferta(accion: number) {
    console.log("Creando oferta....", this.offer);
    let config = new OfferConfiguration()
    config.idEstatus = 1;
    this.offer.configuracion = config;
    this.offer.acciones = [];
    this.actions.currentActions.map(idAccion => this.offer.acciones.push(Number(idAccion)));

    if (this.offer.idOferta != null && this.offer.idOferta != '') {
      this.offerService.update(this.offer).subscribe(
        updateOffer => {
          console.log("Se actualizó correctament la oferta", updateOffer);
          this.uploadImagen(this.offer.idOferta);
          this.onSaved(accion, this.offer);
        },
        error => {
          console.error("Error al actualizar el negocio en el sistema", error, this.offer);
          this.onSaved(false);
        });
    } else {      
      this.offerService.create(this.offer).subscribe(
        newOffer => {
          console.log("Se guardo correctament la oferta", newOffer);
          this.offer = newOffer;
          this.uploadImagen(newOffer.idOferta);
          this.onSaved(accion, newOffer);
        },
        error => {
          console.error("Error al guardar la oferta", error);
          this.onSaved(-1);
        }
      );
    }

  }

  uploadImagen(idOferta: string) {
    let data = new FormData();
    console.log("Subiendo imagen")
    this.imagenes.forEach(img => {
      console.log("Iterando", img);
      if (img.idImagen === null) {
        let file = this.uploader.queue[img.idexFile]._file;
        data.append("imagenes", file);
      }
    });
    console.log("Comprobando tag imagenes")
    if (data.has("imagenes")) {
      console.log("Se tiene el form de imagenes");
      //Subir imagen
      this.offerImagesService.guardarImagenes(idOferta, data).subscribe(ok => {
        console.log("Se guardaron correctamente las imagenes nuevas");
      }, error => {
        console.error("Error al guardar las imagenes", error)
      });
    }
    if (this.imgToDelete.length > 0) {
      console.info("Eliminando imagenes");
      this.imgToDelete.forEach(imgToDelete => {
        this.offerImagesService.eliminarImagen(idOferta, imgToDelete.idImagen).subscribe();
      });
    }
  }
}
