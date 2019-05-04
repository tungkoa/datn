import {Injectable} from '@angular/core';
import * as Parse from 'parse';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor() {
        Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
        Parse.initialize(
            'g0zgt6wUmW8XEYHc334KkHOEhf2gUSSJ1xIzalFx', // This is your Application ID
            'nuXaZQc8jtojQ25TBHXAS3hy8EJqZ800UOYO9sdh' // This is your Javascript key
        );
    }

    listProduct = [];

    get(category:number,callback) {
        const MyCustomClass = Parse.Object.extend('Product');
        const query = new Parse.Query(MyCustomClass);
         query.equalTo("category", category);
        query.find().then((results) => {
            for (let i of results) {
                this.listProduct.push(i.attributes);
            }
            callback(results);
        }, (error) => {
        });
    }

    post() {
        const MyCustomClass = Parse.Object.extend('Product');
        const myNewObject = new MyCustomClass();
        myNewObject.set('name', 'myCustomKey1Value');
        myNewObject.set('price', 333);

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
