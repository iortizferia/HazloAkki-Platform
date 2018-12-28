import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { FileUploadModule } from 'ng2-file-upload';
import { SharedModule } from '../shared/shared.module';
import { BusinessModalComponent } from './business-modal/business-modal.component';
import { OfferModalComponent } from './offer-modal/offer-modal.component';

@NgModule({
  imports: [
    SharedModule,
    FileUploadModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCbXBCYL_97dn1I7ek-qitjQhGSS5iQ-2I'
  })
  ],
  declarations: [BusinessModalComponent, OfferModalComponent],
  exports:[BusinessModalComponent],
  entryComponents:[BusinessModalComponent, OfferModalComponent]
})
export class ModalsModule { }
