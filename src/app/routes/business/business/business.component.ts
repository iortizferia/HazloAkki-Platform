import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BusinessModalComponent } from '../../../modals/business-modal/business-modal.component';
import { Business } from '../../../shared/models/business.model';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html'
})
export class BusinessComponent implements OnInit {

  business:Array<Business>;
  
  bsModalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }
  addNewBusiness() {
    const initialState = {
      business:null,
      class: 'gray modal-lg'
    };
    this.bsModalRef = this.modalService.show(BusinessModalComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  updateBusiness(){
    const initialState = {
      business:this.business,
      class: 'gray modal-lg'
    };
  }

  deleteBusiness(){

  }

}
