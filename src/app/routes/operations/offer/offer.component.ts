import { Component, OnInit } from '@angular/core';
import { Business } from 'src/app/shared/models/business.model';
import { OfferService } from 'src/app/core/http/offer/offer.service';
import { BusinessService } from 'src/app/core/http/business/business.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Offer } from 'src/app/shared/models/offer.model';
import { BsModalService, ModalOptions, BsModalRef } from 'ngx-bootstrap/modal';
import { OfferModalComponent } from 'src/app/modals/offer-modal/offer-modal.component';
import { PublishOfferComponent } from 'src/app/modals/publish-offer/publish-offer.component';

const swal = require('sweetalert');

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html'
})
export class OfferComponent implements OnInit {

  business: Array<Business>;
  offers: Array<Offer>;
  bsModalRef: BsModalRef;
  bSelectedId: string;
  offerSelectedId: string;

  constructor(private modalService: BsModalService,
    private offerService: OfferService,
    private businessService: BusinessService,
    private authService: AuthService) { }

  ngOnInit() {
    this.authService.pupulate();
    let userAccout = this.authService.getCurrentUser();
    console.log("CurrentUser on offer", userAccout);
    this.businessService.getByAccount(userAccout.idCuenta).subscribe(
      business => {
        console.log("Lista de negocios", business);
        this.business = business;
      }
    );

  }

  editarOffer() {
    if (this.offerSelectedId && this.offerSelectedId != null
      && this.offerSelectedId != '') {
      this.offerService.getOffer(this.offerSelectedId).subscribe(
        offer => {
          this.offerModal(offer);
        });
    }
  }

  cancelOffer() {
    if (this.offerSelectedId && this.offerSelectedId != null
      && this.offerSelectedId != '') {
      swal({
        title: "Estas seguro de cancelar la oferta?",
        text: "Todo lo relacionado a esta oferta se deshabilitaran",
        icon: "warning",
        buttons: ["Cancelar", "Sí"]
      }).then((goOffers) => {
        if (goOffers) {
          console.log("Se cancela la oferta ", this.offerSelectedId);
          this.offerService.updateEstatus(this.offerSelectedId, 4).subscribe(
            ok => {
              console.log("Oferta cancelada!!");
              this.showOffer(this.bSelectedId);
            }
          );
        }
      });
    }
  }

  deleteOffer() {
    if (this.offerSelectedId && this.offerSelectedId != null
      && this.offerSelectedId != '') {
      swal({
        title: "Estas seguro de eliminar la oferta?",
        text: "Todo lo relacionado a esta oferta se eliminará",
        icon: "error",
        buttons: ["Cancelar", "Sí"]
      }).then((goOffers) => {
        if (goOffers) {
          console.log("Se elimina la oferta ", this.offerSelectedId);
          this.offerService.updateEstatus(this.offerSelectedId, 5).subscribe(
            ok => {
              console.log("Oferta eliminada!!");
              this.showOffer(this.bSelectedId);
            }
          );
        }
      });
    }
  }

  sheduleOferta(accion: number) {
    if (this.offerSelectedId && this.offerSelectedId != null
      && this.offerSelectedId != '') {
      let oferta = this.offers.find(n => n.idOferta == this.offerSelectedId);
      this.publicarOferta(accion, oferta);
    }
  }

  createOffer() {
    this.offerModal(new Offer(this.bSelectedId));
  }

  offerModal(offer: Offer) {
    console.log("Inicia proceso de oferta");
    let config = new ModalOptions();
    config.initialState = { offer: offer };
    config.class = 'gray modal-lg';
    this.bsModalRef = this.modalService.show(OfferModalComponent, config);
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.onSaved = (resp, oferta) => {
      console.log("Retornando de modal de ofertas", resp);
      this.bsModalRef.hide();
      if (resp === 2 || resp === 3) {
        this.showOffer(this.bSelectedId);
        this.publicarOferta(resp, oferta);
      }
      if(resp === 1){
        this.showOffer(this.bSelectedId);
      }
    };
  }

  showOffer(businessId: string) {
    console.log("Cargar ofertas para el negocio " + businessId);
    this.bSelectedId = businessId;
    if (businessId != null && businessId != '' && businessId != '-1') {
      this.offerService.getOfferByBusiness(businessId).subscribe(
        offers => {
          this.offers = offers;
          console.log("Lista de ofertas", offers);
        }, error => {
          console.error("Error al cargar las ofertas para el negocion con id=" + businessId, error);
        }
      );
    }
    if (businessId === '-1') {
      console.error("Negocios", this.business);
      this.offers = new Array();
      this.business.forEach(business => {
        console.log("Consultando negocio " + business.idNegocio);
        this.offerService.getOfferByBusiness(business.idNegocio).subscribe(
          offers => {
            this.offers = this.offers.concat(offers);
            console.log("Listando todas las ofertas", this.offers, offers);
          }, error => {
            console.error("Error al cargar las ofertas para el negocion con id=" + businessId, error);
          }
        );
      });
    }
  }


  publicarOferta(accion, oferta: Offer) {

    this.offerService.obtenerConfig(oferta.idOferta).subscribe(
      offerConfig => {
        console.log("Recuperando configuracion de oferta", offerConfig);
        let config = new ModalOptions();
        config.initialState = {
          accion: accion,
          source: 2,
          tituloOferta: oferta.titulo,
          offerConfig: offerConfig
        };
        config.class = 'gray';
        config.ignoreBackdropClick = true;
        config.keyboard = false;
        this.bsModalRef = this.modalService.show(PublishOfferComponent, config);
        this.bsModalRef.content.closeBtnName = 'Close';
        this.bsModalRef.content.onSaved = (resp) => {
          console.log("Retornando de modal", resp);
          this.bsModalRef.hide();
          if (resp === 2 || resp === 3) {
            let accionStrn = resp === 3 ? 'publicó':resp === 2? 'programó': 'creo';
            swal("Se "+ accionStrn +" correctamente la oferta!", "", "success")
              .then((ok) => {
                this.showOffer(this.bSelectedId);
              });
          }
        };
      }
    );
  }

}
