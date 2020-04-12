import { Component, OnInit } from '@angular/core';
import { Location } from '../../../shared/models/map.model';
import { BusinessService } from 'src/app/core/http/business/business.service';

const firebaseConfig = {
    apiKey: "AIzaSyDYjD6nimvnmscxUHADdQuvNdfYLXGKRDQ",
    authDomain: "hazloakki-236304.firebaseapp.com",
    databaseURL: "https://hazloakki-236304.firebaseio.com",
    projectId: "hazloakki-236304",
    storageBucket: "hazloakki-236304.appspot.com",
    messagingSenderId: "231795037656",
    appId: "1:231795037656:web:fc920ecd277959b3"
};

// Init Firebase
import * as firebaseApp from 'firebase/app';
firebaseApp.initializeApp(firebaseConfig);
// Init GeoFireX
import * as geofirex from 'geofirex';
import { Observable } from 'rxjs';
const geo = geofirex.init(firebaseApp);


@Component({
    selector: 'app-dashboardv1',
    templateUrl: './dashboardv1.component.html',
    styleUrls: ['./dashboardv1.component.scss']
})
export class Dashboardv1Component implements OnInit {

    location: Location = {
        lat: 19.432608,
        lng: -99.133208,
        marker: {
            lat: 19.432608,
            lng: -99.133208,
            draggable: true
        },
        country: "México",
        zoom: 16
    };

    businessIcon = { url: 'assets/img/business-marker.png', scaledSize: {height: 40, width: 40}};
    points: Observable<any>;
    radius : number = 1.0;
    

    constructor(private businessService: BusinessService) {

    }

    ngOnInit() { }


    getBusiness(businessId: string) {
        this.location.lat = 19.3304269;
        this.location.lng = -99.1681734;
        this.location.marker.lat = 19.3304269;
        this.location.marker.lng = -99.1681734;
        this.location.marker.draggable = true;
        this.location.zoom = 16;
    }

    guardarUsuario() {
        const users = geo.collection('users');
        /*const point = geo.point(19.338370, -99.183942);
        users.add({ name: 'Zenon', point: point.data });*/
        users.setPoint('RtfQ5r89nmmWPCikIbZB','point',19.334406, -99.167927);//19.324069, -99.182604
    }

    verUsuarios() {
        const users = geo.collection('users');
        //users.data('ZhX8Lz0errQlCgcK3ca1').subscribe(data => console.log(data));        
        const center = geo.point(this.location.lat, this.location.lng);
        const field = "point";

        this.points = users.within(center, this.radius, field);
        users.within(center, this.radius, field).subscribe(data =>{
            console.log(data);
        });
    }

    trackByFn(_, doc) {
        return doc.id;
    }

}
