import { NgModule, Optional, SkipSelf } from '@angular/core';

import { SettingsService } from './settings/settings.service';
import { ThemesService } from './themes/themes.service';
import { MenuService } from './menu/menu.service';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { ApiPrefixInterceptor } from './interceptors/api-prefix.interceptor';
import { ErrorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { CacheInterceptor } from './interceptors/cache.interceptor';
import { HttpService } from './http/http.service';
import { HttpClient } from '@angular/common/http';
@NgModule({
    imports: [
    ],
    providers: [
        SettingsService,
        ThemesService,
        MenuService,
        ApiPrefixInterceptor,
        ErrorHandlerInterceptor,
        HttpService,
        CacheInterceptor,
        {
            provide: HttpClient,
            useClass: HttpService
        }
    ],
    declarations: [],
    exports: []
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
