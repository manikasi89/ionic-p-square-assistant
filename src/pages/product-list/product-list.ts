  import { Component } from '@angular/core';
  import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
  import { SpeechKit } from '@ionic-native/speechkit';

  import { productDetails } from '../../app/app.settings'
  import { utilService } from '../../providers/providers'

  import { HomePage } from '../home/home'
  import { ProductDetailPage } from '../product-detail/product-detail'

  @IonicPage()
  @Component({
    selector: 'page-product-list',
    templateUrl: 'product-list.html',
    providers:[utilService]
  })

  export class ProductListPage {

  pageTitle: string = 'Product List';
  products:any;
  searchText:string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    private speechkit: SpeechKit, private util:utilService) {
    this.util.showLoader();
    console.log(navParams.get('data'))
    this.searchText = navParams.get('data');
    this.filterData()
  }

  filterData(){
    let result = [];
    console.log(productDetails);
    let key = Object.keys(productDetails).filter(
      (item) => this.searchText.toLowerCase().includes(item.toLowerCase()));
    key.map((item) =>
      productDetails[item].map( data => result.push(data))
    );
    this.products = result;
    this.pageTitle = key.join(' & ');
    console.log(this.products);
    if(this.products.length === 0) {
      this.pageTitle = 'Product List';
      this.util.showToast('Sorry Product not found...', 3000);
    }
  }

  showProduct(productInfo){
      let data = productInfo;
      
      const actionSheet = this.actionSheetCtrl.create({
        title: 'Product Information',
        buttons: [
          {
            text: 'Location',
            role: 'location',
            handler: () => {
              console.log('Location', data.location);
              this.tellUs(data.location);
            }
          },{
            text: 'Details',
            role: 'details',
            handler: () => {
              console.log('Details', data.description);
              this.navCtrl.push(ProductDetailPage, {'data': productInfo});
            }
          },{
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel');
            }
          }
        ]
      });
      actionSheet.present();
    }

    goToHomePage() {
      this.navCtrl.push(HomePage)
    }

    tellUs(text:string=''){
      if(text){
        this.speechkit.tts(text, 'eng-IND', 'Serena').then(
          (msg) => { console.log(msg); },
          (err) => { console.log(err); }
        );
      }
    }



    ionViewDidLoad() {
      this.util.hideLoader();
      console.log('ionViewDidLoad ProductListPage');
    }

  }
