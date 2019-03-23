import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { SpeechKit } from '@ionic-native/speechkit';
import { AndroidPermissions } from '@ionic-native/android-permissions';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProductListPage } from '../pages/product-list/product-list'
import { ProductDetailPage } from '../pages/product-detail/product-detail'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProductListPage,
    ProductDetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProductListPage,
    ProductDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SpeechRecognition,
    SpeechKit,
    AndroidPermissions,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
