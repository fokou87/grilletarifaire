import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LoadingController, ToastController} from "@ionic/angular";
import {GrilleTarifaire} from "../Model/GrilleTarifaire";
import {AdresseService} from "./AdresseService";
import {AddressIP} from "./AddressIP";
import {Cotation} from "../Model/Cotation";

@Injectable()
export class GrilleTarifaireService{

  grillTarifaires:GrilleTarifaire[];
  grillTari:GrilleTarifaire;

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


  getAllGrille(){
    this.loadingController.create({
      cssClass:'loader',
      message:'chargement des localisations'
    }).then(l=>{
      l.present();
      return this.http.get<GrilleTarifaire[]>(AddressIP.host+'grille/all').subscribe(
        data=>{
          this.grillTarifaires=data;
          l.dismiss();
        },error => {
          this.presentToast(error.error.message);
          l.dismiss();
        }
      )
    })
  }

  saveGrille(grille:GrilleTarifaire){
    this.loadingController.create({
      cssClass:'loader',
      message:'chargement des localisations'
    }).then(l=>{
      l.present();
      return this.http.post<GrilleTarifaire>(AddressIP.host+'grille/save',grille).subscribe(
        data=>{
          this.grillTari=data;
          if (this.grillTarifaires){
            this.grillTarifaires.push(data);
          }else {
            this.grillTarifaires=[];
            this.grillTarifaires.push(data);
          }
          l.dismiss();
        },error => {
          this.presentToast(error.error.message);
          l.dismiss();
        }
      )
    })
  }

}
