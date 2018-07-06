import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuService } from '../core/menu/menu.service';
import { SharedModule } from '../shared/shared.module';
import { PagesModule } from './pages/pages.module';

import { menu } from './menu';
import { routes } from './routes';
import { ModalsModule } from '../modals/modals.module';

@NgModule({
    imports: [
        SharedModule,        
        RouterModule.forRoot(routes),
        PagesModule,
        ModalsModule
    ],
    declarations: [],
    exports: [
        RouterModule
    ]
})

export class RoutesModule {
    constructor(public menuService: MenuService) {
        menuService.addMenu(menu);
    }
}
