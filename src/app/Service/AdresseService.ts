import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AddressIP} from "./AddressIP";
import {LoadingController, ToastController} from "@ionic/angular";
import {Pays} from "../Model/Pays";
import {Positions} from "../Model/Positions";
import {Secteurs} from "../Model/Secteurs";
import {PointSpecifique} from "../Model/PointSpecifique";

@Injectable()
export class AdresseService{

  pays:Pays;
  constructor(public http:HttpClient,public loadingController: LoadingController,public toastController: ToastController) {
  }


  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }


  getAllAdresse(){
     this.loadingController.create({
      cssClass:'loader',
      message:'chargement des localisations'
    }).then(l=>{
      l.present();
      return this.http.get<Pays[]>(AddressIP.host+'adresse/all/pays').subscribe(
        data=>{
          this.pays=data[0];
          l.dismiss();
        },error => {
          this.presentToast(error.error.message);
          l.dismiss();
        }
      )
    })
  }

  addCordonnerSecteur(idsecteur:number,position:Positions){
   return  this.http.put<Secteurs>(AddressIP.host+'adresse/update/secteur/cordonne/'+idsecteur,position)
  }

  addCordonnerPointSpe(idpointSpe:number,position:Positions){
    return  this.http.put<PointSpecifique>(AddressIP.host+'adresse/update/pointspecifique/cordonne/'+idpointSpe,position)
  }
}
