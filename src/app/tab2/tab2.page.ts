import {Component} from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import * as Parse from 'parse';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
    constructor(private camera:Camera) {
        Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
        Parse.initialize(
            'g0zgt6wUmW8XEYHc334KkHOEhf2gUSSJ1xIzalFx', // This is your Application ID
            'nuXaZQc8jtojQ25TBHXAS3hy8EJqZ800UOYO9sdh' // This is your Javascript key
        );
    }
    category;
    price;
    photo: any;
    title;
    getPicture() {
        const options: CameraOptions = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            saveToPhotoAlbum: false
        };

        this.camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            this.photo = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
            // Handle error
        });
    }

    post() {
        const MyCustomClass = Parse.Object.extend('Product');
        const myNewObject = new MyCustomClass();
        myNewObject.set('category', this.category);
        myNewObject.set('title', this.title);
        myNewObject.set('price', this.price);
        myNewObject.set('images', new Parse.File('photo', {base64: this.photo}));
        myNewObject.save().then(
            (result) => {
                console.log(result);
            },
            (error) => {
                console.log(error);
            }
        );
    }
}
