import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LocalModalComponent } from './local-modal/local-modal.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [LocalModalComponent],
  exports:[LocalModalComponent],
  entryComponents:[LocalModalComponent]
})
export class ModalsModule { }
