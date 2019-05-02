import {Component} from '@angular/core';
import {AppService} from "../app.service";
import * as Parse from 'parse';
import {Phone} from "../phone";

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
// export class phone {
// constructor(public name,public price){};
// }
export class Tab1Page {
    constructor() {
        Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
        Parse.initialize(
            'g0zgt6wUmW8XEYHc334KkHOEhf2gUSSJ1xIzalFx', // This is your Application ID
            'nuXaZQc8jtojQ25TBHXAS3hy8EJqZ800UOYO9sdh' // This is your Javascript key
        )
    }

    name=[];
    price;
obj=[];
show=false;
    get() {
        this.show=true;
        const MyCustomClass = Parse.Object.extend('Product');
        const query = new Parse.Query(MyCustomClass);
        // query.equalTo("price", 333);
        query.find().then((results) => {
            // Ex: response.get("<ATTRIBUTE_NAME>")
            for (let i of results) {
                console.log(i.attributes);
                this.name.push(i.attributes);
            }
            console.log(this.name)
            this.show=false;
        }, (error) => {
        });
    }
}
