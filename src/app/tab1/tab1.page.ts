import {Component} from '@angular/core';
import {AppService} from '../app.service';
import * as Parse from 'parse';
import {Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {ProductPage} from '../product/product.page';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
    constructor(private router: Router, public navCtrl: NavController, private appService: AppService) {

    }

    listProduct = [];
    listProductShow=[];
    show = false;

    navigateLaptop() {
        this.router.navigate(['product']);
        // this.navCtrl.push(ProductPage);
    }
    navigatePhone(){
        this.router.navigate((['phone']));
    }
}

