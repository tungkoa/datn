import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AppService} from '../app.service';

@Component({
    selector: 'app-phone',
    templateUrl: './phone.page.html',
    styleUrls: ['./phone.page.scss'],
})
export class PhonePage {
    constructor(private router: Router, private appService: AppService) {
        this.get();
    }

    isShowLoadingBar = false;
    listProduct = [];
    listProductShow = [];
    show = false;
    doRefresh(event){
        this.get();
        event.target.complete();
    }
    get() {
        this.isShowLoadingBar = true;
        this.appService.get(2, () => {
            this.listProduct = Object.assign(this.appService.listProduct);
            this.listProductShow = Object.assign(this.listProduct);
            this.isShowLoadingBar = false;
            console.log(this.listProduct);
        });
        this.appService.listProduct = [];
    }

    navigateProductDetail() {
        this.router.navigate(['phone-detail']);

    }

}
