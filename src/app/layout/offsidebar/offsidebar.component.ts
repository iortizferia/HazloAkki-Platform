import { Component, OnInit, OnDestroy } from '@angular/core';
declare var $: any;

import { SettingsService } from '../../core/settings/settings.service';
import { ThemesService } from '../../core/themes/themes.service';

@Component({
    selector: 'app-offsidebar',
    templateUrl: './offsidebar.component.html',
    styleUrls: ['./offsidebar.component.scss']
})
export class OffsidebarComponent implements OnInit, OnDestroy {

    currentTheme: any;
    clickEvent = 'click.offsidebar';
    $doc: any = null;

    constructor(public settings: SettingsService, public themes: ThemesService ) {
        this.currentTheme = themes.getDefaultTheme();
    }

    ngOnInit() {
        this.anyClickClose();
    }

    setTheme() {
        this.themes.setTheme(this.currentTheme);
    }

    anyClickClose() {
        this.$doc = $(document).on(this.clickEvent, (e) => {
            if (!$(e.target).parents('.offsidebar').length) {
                this.settings.layout.offsidebarOpen = false;
            }
        });
    }

    ngOnDestroy() {
        if (this.$doc)
            this.$doc.off(this.clickEvent);
    }
}
