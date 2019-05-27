import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { OfferService } from 'src/app/core/http/offer/offer.service';
import { OfferConfiguration } from 'src/app/shared/models/offer.config.model';
import { NgForm } from '@angular/forms';

const swal = require('sweetalert');

@Component({
  selector: 'app-publish-offer',
  templateUrl: './publish-offer.component.html',
  styles: []
})
export class PublishOfferComponent implements OnInit {

  bsValue = new Date();
  bsConfig = {
    containerClass: 'theme-angle'
  }

  accion: number; // 2 - Programar oferta, 3 - Publicar oferta
  source: number; // 1 - Pantalla negocio, 2 - pantalla oferta
  onSaved: any;
  offerConfig: OfferConfiguration
  tituloOferta: string;
  submitted: boolean;
  validTime: boolean;

  inicio: Date;
  fin: Date;

  constructor(public bsModalRef: BsModalRef,
    private route: Router,
    private offerService: OfferService) { }

  getCurrentDateFormat(sumDay:number) :string {
    var today = new Date();
    var dd = today.getDate()+sumDay;
    var mm = today.getMonth() + 1;
    var hh = today.getHours();
    var min = today.getMinutes();
    var yyyy = today.getFullYear();
    let ddString, mmString, hhString, minString;
    if (dd < 10) {
      ddString = '0' + dd;
    }else{
      ddString = dd;
    }
    if (mm < 10) {
      mmString = '0' + mm;
    }else{
      mmString = mm;
    }
    if (hh < 10) {
      hhString = '0' + hh;
    }else{
      hhString = hh;
    }
    if (min < 10) {
      minString = '0' + min;
    }else{
      minString = min;
    }

    return today.getFullYear() + "-"+ mmString + "-"+ddString+"T"+hhString+":"+minString;

  }

  ngOnInit() {
    console.log("Programar", this.offerConfig);
    if (this.offerConfig.idSexo == null || !this.offerConfig.idSexo) {
      this.offerConfig.idSexo = 1;
    }
    if ((this.offerConfig.inicio == null || !this.offerConfig.inicio ) && this.accion == 3) {
      this.offerConfig.inicio = this.getCurrentDateFormat(0);
      this.offerConfig.fin = null;
    } else if((this.offerConfig.inicio == null || !this.offerConfig.inicio ) && this.accion == 2){
      this.offerConfig.inicio = this.getCurrentDateFormat(0);
      this.offerConfig.fin = this.getCurrentDateFormat(1);      
    }else if(this.offerConfig.inicio && this.offerConfig.inicio != null){
      this.offerConfig.inicio = this.offerConfig.inicio.replace(" ", "T");
    }
    if (this.offerConfig.fin != null && this.offerConfig.fin) {
      this.offerConfig.fin = this.offerConfig.fin.replace(" ", "T");
    }
  }

  publicar(form: NgForm) {
    this.submitted = true;
    console.log("La forma", form);
    if (form.valid) {
      console.log("Configuracion a guardar", this.offerConfig);
      this.offerConfig.inicio = this.offerConfig.inicio.replace("T", " ");
      if (this.offerConfig.fin != null && this.offerConfig.fin) {
        this.offerConfig.fin = this.offerConfig.fin.replace("T", " ");
      }
      this.offerConfig.idEstatus = this.accion;
      this.offerService.updateConfig(this.offerConfig).subscribe(
        ok =>{
          console.log("Configuración actualizada correctamente", ok);
        }
      );
      this.onSaved(this.accion,this.source);
    }

  }

  isValidTime(event: boolean): void {
    this.validTime = event;
  }

}
