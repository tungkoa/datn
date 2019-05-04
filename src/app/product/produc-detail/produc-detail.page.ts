import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-produc-detail',
    templateUrl: './produc-detail.page.html',
    styleUrls: ['./produc-detail.page.scss'],
})
export class ProducDetailPage implements OnInit {

    constructor(private navCtrl: NavController) {
    }

    back() {
        this.navCtrl.back();
    }

    ngOnInit() {
    }

}
