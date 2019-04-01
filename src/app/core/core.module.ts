import { NgModule, Optional, SkipSelf } from '@angular/core';

import { SettingsService } from './settings/settings.service';
import { ThemesService } from './themes/themes.service';
import { MenuService } from './menu/menu.service';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { ErrorHandlerInterceptor } from './interceptors/error-handler.interceptor';
@NgModule({
    imports: [
    ],
    providers: [
        SettingsService,
        ThemesService,
        MenuService,
        ErrorHandlerInterceptor
    ],
    declarations: [],
    exports: []
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
