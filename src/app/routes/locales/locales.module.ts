import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { LocalComponent } from './local/local.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [ 
  {path:"local", component: LocalComponent}
];
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LocalComponent],
  exports:[
    RouterModule
  ]
})
export class LocalesModule { }
