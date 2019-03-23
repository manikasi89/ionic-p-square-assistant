import { Component } from '@angular/core';
import { Platform, App, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  alert:any;

  constructor(public platform: Platform, statusBar: StatusBar, 
    splashScreen: SplashScreen, public app: App, public alertCtrl:AlertController) {
    platform.ready().then(() => {
      statusBar.overlaysWebView(false);
      statusBar.backgroundColorByHexString('#0046be');
      splashScreen.hide();
    });

    this.platform.registerBackButtonAction(() => {
      let nav = this.app._appRoot._getActivePortal() || app.getActiveNav();
      let activeView = nav.getActive();
      if(activeView != null) {
       if(activeView.name === 'HomePage') {
          this.showExitAlert();
        } else if (nav.canGoBack()){
          nav.pop();
        } else if(activeView.isOverlay) {
          activeView.dismiss();
        }
      }
    })
  }

  showExitAlert(){
    this.alert = this.alertCtrl.create({
      title: 'Exit',
      message: 'Are you sure want to exit?',
      cssClass: 'custome-alert',
      buttons: [{
          text: 'No',
          role: 'cancel',
          handler: () => {
          }
      },{
          text: 'Yes',
          handler: () => {
            this.platform.exitApp();
          }
      }]
  });
  this.alert.present();
  }
  
}

