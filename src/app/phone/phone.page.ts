import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {AppService} from '../app.service';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.page.html',
  styleUrls: ['./phone.page.scss'],
})
export class PhonePage {
  constructor(private router: Router, public navCtrl: NavController, private appService: AppService) {
    this.get();
  }

  back() {
    this.navCtrl.back();
  }

  listProduct = [];
  listProductShow = [];
  show = false;

  get() {
    this.show = true;
    this.appService.get(2,results => {
      this.listProduct = Object.assign(this.appService.listProduct)
      this.listProductShow = Object.assign(this.listProduct);
      this.show = false;
      console.log(this.listProduct)
    })
    this.appService.listProduct=[];
  }

  navigateProductDetail() {
    this.router.navigate(['phone-detail']);

  }

}
