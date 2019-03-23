import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import {  NgZone } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions';

import { ProductListPage } from '../product-list/product-list';

import { utilService } from '../../providers/providers'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[utilService]
})
export class HomePage {

  isListening: boolean = false;
  matches: Array<String>;
  singleMatch: string = 'laptop';

  constructor(public navCtrl: NavController, public speech: SpeechRecognition,
    private zone: NgZone, public androidPermissions: AndroidPermissions,
    public platform: Platform, private util:utilService) {
  }

  listen() {
    let _this = this;
    this.speech.isRecognitionAvailable()
    .then((available: boolean) => {
      if(available) {
        _this.isListening = true;
        _this.startListing()
      } else {
        _this.util.showToast('Sorry Speech Recognition is not avilable', 3000);
      }
    })
  }

  startListing(){
    let _this = this;
    let options = {
      language : "en-IN",
      matches: 1,
      prompt: "",
      showPopup : false,
      showPartial: false
    }
    this.speech.startListening(options)
      .subscribe(matches => {
        _this.zone.run(() => {
          _this.matches = matches;
          _this.singleMatch = matches[0];
          _this.speech.stopListening();
          _this.isListening = false;
        })
      }, error => console.error(error));
  }

  goToProducts(){
    this.isListening = false;
    this.navCtrl.push(ProductListPage, {'data': this.singleMatch});
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.androidPermissions.requestPermissions(
        [ this.androidPermissions.PERMISSION.RECORD_AUDIO ]
      )
    });
  }

}
