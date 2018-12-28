import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { OfferService } from 'src/app/core/http/offer/offer.service';
import { Offer } from 'src/app/shared/models/offer.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-offer-modal',
  templateUrl: './offer-modal.component.html',
  styleUrls: ['./offer-modal.component.scss']
})
export class OfferModalComponent implements OnInit {

  businessId: string;
  offer: Offer;
  onSaved: any;
  submitted: boolean;

  constructor(public bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private offerService: OfferService) { }

  ngOnInit() {
       
  }

  createOffer(form: NgForm) {
    console.log("Datos de la oferta:", form);
    this.submitted = true;
    if (form.valid) {
      if (this.offer.id != null && this.offer.id != '') {

      } else {
        console.log("Creado oferta", this.offer);
        let date = new Date();
        this.offer.fecha = date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear();
        this.offer.estatus = true;
        this.offerService.create(this.offer).subscribe(
          newOffer => {
            this.offer = newOffer;
            this.onSaved(true);
          },
          error => {
            console.error("Error al guardar la oferta", error);
            this.onSaved(false);
          }
        );
      }
    }
  }

}
