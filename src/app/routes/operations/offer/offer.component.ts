import { Component, OnInit } from '@angular/core';
import { Business } from 'src/app/shared/models/business.model';
import { OfferService } from 'src/app/core/http/offer/offer.service';
import { BusinessService } from 'src/app/core/http/business/business.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Offer } from 'src/app/shared/models/offer.model';
import { BsModalService, ModalOptions, BsModalRef } from 'ngx-bootstrap/modal';
import { OfferModalComponent } from 'src/app/modals/offer-modal/offer-modal.component';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html'
})
export class OfferComponent implements OnInit {

  business: Array<Business>;
  offers: Array<Offer>;
  bsModalRef: BsModalRef;
  bSelectedId: string;  

  constructor(private modalService: BsModalService,
    private offerService:OfferService, 
    private businessService:BusinessService,
    private authService: AuthService) { }

  ngOnInit() {
    let userAccout = this.authService.getCurrentUser();
    console.log("CurrentUser on offer", userAccout);
    this.businessService.getByAccount(userAccout.idCuenta).subscribe(
      business => {
        console.log("Lista de negocios", business);
        this.business = business;
      }
    );   
    
  }

  createOffer(){
    console.log("Inicia proceso de oferta");
    let config = new ModalOptions();
    config.initialState ={offer:new Offer(this.bSelectedId)};
    config.class = 'gray modal-lg';
    this.bsModalRef = this.modalService.show(OfferModalComponent, config);
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.onSaved = (resp) => {
      console.log("Retornando de modal de ofertas",resp);
      if(resp){
        this.showOffer(this.bSelectedId);
      }
      this.bsModalRef.hide();
    };
  }

  showOffer(businessId:string){
    console.log("Cargar ofertas para el negocio "+businessId);
    this.bSelectedId = businessId;
    if(businessId!=null && businessId!='' && businessId!='-1'){
      this.offerService.getOfferByBusiness(businessId).subscribe(
        offers =>{
          this.offers = offers;
        },error =>{
          console.error("Error al cargar las ofertas para el negocion con id="+businessId,error);
        }
      );
    }
    if(businessId==='-1'){
      console.error("Negocios", this.business);
      this.offers = new Array();
      this.business.forEach(business =>{
        console.log("Consultando negocio "+business.idNegocio);
        this.offerService.getOfferByBusiness(business.idNegocio).subscribe(
          offers =>{
            this.offers = this.offers.concat(offers);
            console.log("Listando todas las ofertas", this.offers, offers);
          },error =>{
            console.error("Error al cargar las ofertas para el negocion con id="+businessId,error);
          }
        );
      });
    }
  }

}
