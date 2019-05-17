import {Component} from '@angular/core';
import * as Parse from 'parse';
import {Facebook, FacebookLoginResponse} from "@ionic-native/facebook/ngx";
import {NavController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
    constructor(private facebook: Facebook, public navCtrl: NavController, private router: Router) {
        Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
        Parse.initialize(
            'g0zgt6wUmW8XEYHc334KkHOEhf2gUSSJ1xIzalFx', // This is your Application ID
            'nuXaZQc8jtojQ25TBHXAS3hy8EJqZ800UOYO9sdh' // This is your Javascript key
        );
    }

    username;
    password;
    isUserLogin = false;

    async facebookLogin() {
        try {
            // Log in to Facebook and request user data
            let facebookResponse = await this.facebook.login(['public_profile', 'email']);
            let res = await this.facebook.api('/' + facebookResponse.authResponse.userID + '?fields=id,name,email,first_name,picture.width(720).height(720).as(picture)', []);
            let facebookAuthData = {
                id: facebookResponse.authResponse.userID,
                access_token: facebookResponse.authResponse.accessToken,
                picture: res.picture.data.url,
            };

            console.log(facebookResponse)
            console.log(res);
            // Request the user from parse
            let toLinkUser = new Parse.User();
            let user = await toLinkUser._linkWith('facebook', {authData: facebookAuthData});

            // user.set('username', 'A string');
            user.set('email', res.email);
            user.set('picture', 'res.picture.data.url');
            user.save();

            // If user did not exist, updates its data
            if (!user.existed()) {
                let userData = await this.facebook.api('/' + facebookResponse.authResponse.userID + '?fields=id,name,email,first_name,picture.width(720).height(720).as(picture)', []);
                user.set('username', userData.name);
                user.set('name', userData.name);
                user.set('email', userData.email);
                console.log(userData)
                await user.save();
            }
            this.isUserLogin = true;
// console.log(this.facebook.api('/'+facebookAuthData.id+'?fields=id,name,email,first_name,picture.width(720).height(720).as(picture)', []))
            this.router.navigate(['phone']);
        } catch (err) {
            console.log('Error logging in', err);
            alert(err)
            // this.toastCtrl.create({
            //     message: err.message,
            //     duration: 2000
            // }).present();
        }
    }

    fbLogout() {
        this.facebook.logout().then(logout => this.isUserLogin = false);

    }
}
