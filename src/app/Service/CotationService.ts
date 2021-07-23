import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LoadingController, ToastController} from "@ionic/angular";
import {CotationDto} from "../Model/CotationDto";
import {Pays} from "../Model/Pays";
import {AddressIP} from "./AddressIP";
import {Cotation} from "../Model/Cotation";
import {AdresseDto} from "../Model/AdresseDto";

@Injectable()
export class CotationService{

  cotation:Cotation;

  constructor(public http:HttpClient,public loadingController: LoadingController,public toastController: ToastController) {
  }

  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position:"top"
    });
    toast.present();
  }


  getCotationByPosition(cotationdtd:CotationDto){
    this.loadingController.create({
      cssClass:'loader',
      message:'chargement des localisations'
    }).then(l=>{
      l.present();
      return this.http.post<Cotation>(AddressIP.host+'adresse/all/pays',cotationdtd).subscribe(
        data=>{
          this.cotation=data;
          l.dismiss();
        },error => {
          this.presentToast(error.error.message);
          l.dismiss();
        }
      )
    })
  }

  getCotationByAdresse(adresseDto:AdresseDto){
    this.loadingController.create({
      cssClass:'loader',
      message:'chargement des localisations'
    }).then(l=>{
      l.present();
      return this.http.post<Cotation>(AddressIP.host+'adresse/prix',adresseDto).subscribe(
        data=>{
          this.cotation=data;
          l.dismiss();
        },error => {
          this.presentToast(error.error.message);
          l.dismiss();
        }
      )
    })
  }
}
