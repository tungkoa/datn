import {Component} from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import * as Parse from 'parse';
import {AlertController} from "@ionic/angular";
import {LoadingController} from "@ionic/angular";

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    constructor(private camera: Camera, public alertController: AlertController, public loadingController: LoadingController) {
        Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
        Parse.initialize(
            'g0zgt6wUmW8XEYHc334KkHOEhf2gUSSJ1xIzalFx', // This is your Application ID
            'nuXaZQc8jtojQ25TBHXAS3hy8EJqZ800UOYO9sdh' // This is your Javascript key
        );
    }

    isShowLoadingBar = false;
    category;
    price;
    photo = '../../assets/default.jpg';
    photo1 = '';
    photo2 = '';
    title;

    async presentAlert() {
        const alert = await this.alertController.create({
            header: 'Thong bao',
            message: 'Hay kiem tra lai thong tin',
            buttons: ['OK'],
            animated: true,
            translucent: true,
        });
        await alert.present();
    }

    getPicture(photo) {
        const options: CameraOptions = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            saveToPhotoAlbum: false,
            correctOrientation: true,
            targetWidth: 300,
            targetHeight: 400
        };
        switch (photo) {
            case 'photo':
                this.camera.getPicture(options).then((imageData) => {
                    this.photo = 'data:image/jpeg;base64,' + imageData;
                    this.photo1 = '../../assets/default.jpg';
                }, (err) => {
                });
                break;
            case 'photo1':
                this.camera.getPicture(options).then((imageData) => {
                    this.photo1 = 'data:image/jpeg;base64,' + imageData;
                    this.photo2 = '../../assets/default.jpg';
                }, (err) => {
                });
                break;
            case 'photo2':
                this.camera.getPicture(options).then((imageData) => {
                    this.photo2 = 'data:image/jpeg;base64,' + imageData;
                }, (err) => {
                });
                break;
        }


    }

    post() {
        if (this.category && this.title && this.price) {
            this.isShowLoadingBar = true;
            const MyCustomClass = Parse.Object.extend('Product');
            const myNewObject = new MyCustomClass();
            myNewObject.set('category', +this.category);
            myNewObject.set('title', this.title);
            myNewObject.set('price', +this.price);
            myNewObject.set('images', new Parse.File('photo', {base64: this.photo}));
            this.category = '';
            this.price = '';
            this.title = '';
            this.photo = '../../assets/default.jpg';
            myNewObject.save().then(
                (result) => {
                    this.isShowLoadingBar = false;
                    alert('Đăng bán thành công');
                    console.log(result);
                },
                (error) => {
                    alert('fail');
                    console.log(error);
                }
            );
        } else {
            this.presentAlert();
        }
    }
}
