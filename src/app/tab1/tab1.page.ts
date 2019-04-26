import {Component} from '@angular/core';
import * as Parse from 'parse';
// import {} from '@types/node';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
    constructor() {

    }

    post() {

        Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
        Parse.initialize(
            'g0zgt6wUmW8XEYHc334KkHOEhf2gUSSJ1xIzalFx', // This is your Application ID
            'nuXaZQc8jtojQ25TBHXAS3hy8EJqZ800UOYO9sdh' // This is your Javascript key
        );
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

    get(){
        Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
        Parse.initialize(
            'g0zgt6wUmW8XEYHc334KkHOEhf2gUSSJ1xIzalFx', // This is your Application ID
            'nuXaZQc8jtojQ25TBHXAS3hy8EJqZ800UOYO9sdh' // This is your Javascript key
        );
        const MyCustomClass = Parse.Object.extend('Product');
        const query = new Parse.Query(MyCustomClass);
        query.equalTo("price", 333);
        query.find().then((results) => {
            // You can use the "get" method to get the value of an attribute
            // Ex: response.get("<ATTRIBUTE_NAME>")
            console.log(results[0].attributes.name);
        }, (error) => {
            if (typeof document !== 'undefined') document.write(`Error while fetching ParseObjects: ${JSON.stringify(error)}`);
            console.error('Error while fetching ParseObjects', error);
        });
    }
}


