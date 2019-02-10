import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { BusinessModalComponent } from '../../../modals/business-modal/business-modal.component';
import { Business } from '../../../shared/models/business.model';
import { BusinessService } from '../../../core/http/business/business.service';
import { User } from '../../../shared/models/user.model';
import { AuthService } from '../../../core/auth/auth.service';
import { OfferModalComponent } from 'src/app/modals/offer-modal/offer-modal.component';
import { Offer } from 'src/app/shared/models/offer.model';
import { Router } from '@angular/router';

const swal = require('sweetalert');

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html'
})
export class BusinessComponent implements OnInit {

  business: Array<Business>;
  bSelectedId: string;

  bsModalRef: BsModalRef;
  constructor(private modalService: BsModalService,
    private businessService: BusinessService,
    private authService: AuthService,
    private route: Router) { }

  ngOnInit() {
    this.authService.pupulate();
    this.loadBusiness();
  }

  loadBusiness() {
    let userAccout = this.authService.getCurrentUser();
    console.log("CurrentUser", userAccout);
    this.businessService.getByAccount(userAccout.idCuenta).subscribe(
      business => {
        console.log("Lista de negocios", business);
        this.business = business;
      }
    );
  }

  addNewBusiness() {
    let config = new ModalOptions();
    config.initialState = { business: null };
    this.showModal(config);
  }

  showModal(config: ModalOptions) {
    config.class = 'gray modal-lg';
    config.ignoreBackdropClick = true;
    this.bsModalRef = this.modalService.show(BusinessModalComponent, config);
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.onSaved = (resp) => {
      console.log("Retornando de modal", resp);
      if (resp) {
        this.loadBusiness();
      }
      this.bsModalRef.hide();
    };
  }

  deleteBusiness() {
    if (this.bSelectedId && this.bSelectedId != null
      && this.bSelectedId != '') {
      this.businessService.delete(this.bSelectedId).subscribe(
        ok => {
          this.loadBusiness();
        }
      );
    }
  }

  editCloneBusiness(type: number) {
    if (this.bSelectedId && this.bSelectedId != null
      && this.bSelectedId != '') {
      let bu;
      this.businessService.getBusinessById(this.bSelectedId).subscribe(
        business => {
          console.log("Negocio encontrado", business);
          bu = business;
          if (type == 1) {
            bu.idNegocio = null;
          }
          console.log("Inicia proceso de " + (bu.idNegocio == null ? 'clonado' : 'edición') + "!!");
          let config = new ModalOptions();
          config.initialState = {
            business: Object.assign({}, bu)
          };
          this.showModal(config);
        }
      );
    }
  }

  offerBusiness() {
    console.log("Inicia proceso de oferta");
    if (this.bSelectedId && this.bSelectedId != null
      && this.bSelectedId != '') {

      let config = new ModalOptions();
      config.initialState = { offer: new Offer(this.bSelectedId) };
      config.class = 'gray modal-lg';
      config.ignoreBackdropClick = true;
      this.bsModalRef = this.modalService.show(OfferModalComponent, config);
      this.bsModalRef.content.closeBtnName = 'Close';
      this.bsModalRef.content.onSaved = (resp) => {
        console.log("Retornando de modal", resp);
        if (resp) {
          swal({
            title: "Se guardo correctamente la oferta!",
            text: "Desear ir a la sección de ofertas?",
            icon: "success",
            buttons: ["Cancelar", "Sí, ir a ofertas"]
          }).then((goOffers) => {
            if (goOffers) {
              console.log("Navegando a ofertas");
              this.route.navigate(['/operations','offer']);
            } else {
              console.log("Permanecer en negocios");
              this.loadBusiness();
            }
          });
        }
        this.bsModalRef.hide();
      };
    }

  }
}
