import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { BusinessComponent } from './business/business.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [ 
  {path:"business", component: BusinessComponent}
];
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BusinessComponent],
  exports:[
    RouterModule
  ]
})
export class BusinessModule { }
