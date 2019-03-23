import {Injectable} from '@angular/core';
import { NavController, ToastController, 
    LoadingController, AlertController  } from 'ionic-angular';

@Injectable()

export class utilService {
    loader: any;

    constructor(private navCtrl:NavController,
        private toastCtrl: ToastController, public loadingCtrl: LoadingController,
        public alertCtrl: AlertController) {
    }

    //Change root page
    updateRootPage(page, data:any=[]) {
        if(page) { 
            //this.app.getRootNav().push(page)
            this.navCtrl.push(page, {'data': data});
        }
    }

    //Toast show/hide
    showToast(msg:string, timeToshow:number = 1000) {
        if(msg) {
            const toast = this.toastCtrl.create({
            message: msg,
            duration: timeToshow
            });
            toast.present();
        }
    }

    //Show Loader
    showLoader(text: any = "Please wait...", duration: any = 3000) {
        this.loader = this.loadingCtrl.create({
            content: text,
            duration: duration
        });
        this.loader.present();
    }

    hideLoader(){
        this.loader.dismiss();
    }

    //Alert
    presentAlertWithCallback(title: string, message: string, inputs:any = [], cssName:string = ''): Promise<any> {
        return new Promise((resolve, reject) => {
          const confirm = this.alertCtrl.create({
            title,
            message,
            inputs: inputs,
            cssClass: cssName,
            buttons: [{
              text: 'Cancel',
              role: 'cancel',
              handler: (data) => {
                confirm.dismiss().then(() => resolve({'data':data, 'doAction':false}));
                return false;
              }
            }, {
              text: 'Yes',
              handler: (data) => {
                confirm.dismiss().then(() => resolve({'data':data, 'doAction':true}));
                return false;
              }
            }]
          });
          return confirm.present();
        });
      }
}