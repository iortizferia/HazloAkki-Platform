import { Component, OnInit } from '@angular/core';

import { UserblockService } from './userblock.service';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
    selector: 'app-userblock',
    templateUrl: './userblock.component.html',
    styleUrls: ['./userblock.component.scss']
})
export class UserblockComponent implements OnInit {
    user: any;
    constructor(public userblockService: UserblockService, 
        private authService: AuthService) {

        this.user = {
            picture: 'assets/img/user/02.jpg',
            nombre: "Sin nombre"
        };
    }

    ngOnInit() {
    }

    userBlockIsVisible() {
        this.authService.pupulate();
        let userAccout = this.authService.getCurrentUser();
        if(userAccout){
            this.user.nombre = userAccout.nombre;
            return this.userblockService.getVisibility();
        }
        return true;
    }

}
