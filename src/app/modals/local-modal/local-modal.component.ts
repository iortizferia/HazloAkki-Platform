import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-local-modal',
  templateUrl: './local-modal.component.html'
})
export class LocalModalComponent implements OnInit {

  title: string;
  closeBtnName: string;
  list: any[] = [];

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
    this.list.push('PROFIT!!!');
  }
}
