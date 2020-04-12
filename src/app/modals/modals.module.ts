import { NgModule } from '@angular/core';
import { FileUploadModule } from 'ng2-file-upload';
import { SharedModule } from '../shared/shared.module';
import { BusinessModalComponent } from './business-modal/business-modal.component';
import { OfferModalComponent } from './offer-modal/offer-modal.component';
import { PublishOfferComponent } from './publish-offer/publish-offer.component';

@NgModule({
  imports: [
    SharedModule,
    FileUploadModule
  ],
  declarations: [BusinessModalComponent, OfferModalComponent, PublishOfferComponent],
  exports:[BusinessModalComponent],
  entryComponents:[BusinessModalComponent, OfferModalComponent, PublishOfferComponent]
})
export class ModalsModule { }
