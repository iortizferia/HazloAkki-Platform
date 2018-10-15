import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { FileUploadModule } from 'ng2-file-upload';
import { SharedModule } from '../shared/shared.module';
import { BusinessModalComponent } from './business-modal/business-modal.component';

@NgModule({
  imports: [
    SharedModule,
    FileUploadModule,
    AgmCoreModule.forRoot({
      apiKey: ''
  })
  ],
  declarations: [BusinessModalComponent],
  exports:[BusinessModalComponent],
  entryComponents:[BusinessModalComponent]
})
export class ModalsModule { }
