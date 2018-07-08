import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LocalModalComponent } from '../../../modals/local-modal/local-modal.component';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html'
})
export class LocalComponent implements OnInit {
  
  bsModalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }
  showLocalModal() {
    const initialState = {
      list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        '...'
      ],
      title: 'Modal with component'
    };
    this.bsModalRef = this.modalService.show(LocalModalComponent, Object.assign({}, { class: 'gray modal-lg' }));
    this.bsModalRef.content.closeBtnName = 'Close';
  }

}
