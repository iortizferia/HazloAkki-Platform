import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NgxSelectModule } from 'ngx-select-ex'
import { TextMaskModule } from 'angular2-text-mask';

import { FlotDirective } from './directives/flot/flot.directive';
import { SparklineDirective } from './directives/sparkline/sparkline.directive';
import { ScrollableDirective } from './directives/scrollable/scrollable.directive';
import { EasypiechartDirective } from './directives/easypiechart/easypiechart.directive';
import { VectormapDirective } from './directives/vectormap/vectormap.directive';
import { ColorsService } from './colors/colors.service';
import { NowDirective } from './directives/now/now.directive';

// https://angular.io/styleguide#!#04-10
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TabsModule.forRoot(),
        CollapseModule.forRoot(),
        BsDropdownModule.forRoot(),
        ProgressbarModule.forRoot(),
        ModalModule.forRoot(),
        CarouselModule.forRoot(),
        TabsModule.forRoot(),
        NgxSelectModule,
        TextMaskModule
    ],
    providers: [
        ColorsService
    ],
    declarations: [
        FlotDirective,
        SparklineDirective,
        NowDirective,
        ScrollableDirective,
        EasypiechartDirective,
        VectormapDirective
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        TabsModule,
        BsDropdownModule,
        CollapseModule,
        ProgressbarModule,
        ModalModule,
        CarouselModule,
        TabsModule,
        FlotDirective,
        SparklineDirective,
        NowDirective,
        ScrollableDirective,
        EasypiechartDirective,
        VectormapDirective,
        NgxSelectModule,
        TextMaskModule
    ]
})

// https://github.com/ocombe/ng2-translate/issues/209
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }
}
