import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { BusinessComponent } from './business/business.component';
import { Routes, RouterModule } from '@angular/router';
import { OfferComponent } from './offer/offer.component';

const routes: Routes = [ 
  {path:"business", component: BusinessComponent},
  {path:"offer", component: OfferComponent}
];
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BusinessComponent, OfferComponent],
  exports:[
    RouterModule
  ]
})
export class OperationsModule { }
