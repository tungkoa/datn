import {Component} from '@angular/core';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

    username;
    password;

    signUp() {
        alert('sign up');
    }

    signIn() {
        alert('sign in');
    }
}
