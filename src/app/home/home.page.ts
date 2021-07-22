import {Component, NgZone} from '@angular/core';
import {AdresseService} from "../Service/AdresseService";
import {Villes} from "../Model/Villes";
import {Quartier} from "../Model/Quartier";
import {Secteurs} from "../Model/Secteurs";
import {PointSpecifique} from "../Model/PointSpecifique";
import { Geolocation } from '@capacitor/geolocation';
import {Positions} from "../Model/Positions";
import {LoadingController, ToastController} from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  ville:Villes;
  quartier:Quartier;
  secteur:Secteurs;
  pointspecifique:PointSpecifique;

  positionSecteur:Positions;
  positionPoint:Positions;

  constructor(public adresseService:AdresseService,public loadingController: LoadingController,public toastController: ToastController) {
    adresseService.getAllAdresse();
  }
  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
  getLocation() {
    this.loadingController.create({
      cssClass:'loader',
      message:'chargement des localisations'
    }).then(l=> {
      l.present();
      Geolocation.getCurrentPosition().then(p => {
        this.positionSecteur = new Positions();
        this.positionSecteur.latitude = p.coords.latitude;
        this.positionSecteur.longitude = p.coords.longitude;
        this.adresseService.addCordonnerSecteur(this.secteur.idsecteur, this.positionSecteur)
          .subscribe(
            data => {
              l.dismiss();
              this.presentToast("La position de "+data.libelle+" a été enregistré")
            },error => {
              l.dismiss();
              this.presentToast(error.error.message)
            }
          )
      });
    }
    )
  }

  getLocationPointSpecifi() {
    this.loadingController.create({
      cssClass:'loader',
      message:'chargement des localisations'
    }).then(l=> {
        l.present();
        Geolocation.getCurrentPosition().then(p => {
          this.positionPoint = new Positions();
          this.positionPoint.latitude = p.coords.latitude;
          this.positionPoint.longitude = p.coords.longitude;
          this.adresseService.addCordonnerPointSpe(this.pointspecifique.idpointspecifique, this.positionPoint)
            .subscribe(
              data => {
                this.presentToast("La position de "+data.libelle+" a été enregistré")
                l.dismiss();
              },error => {
                this.presentToast(error.error.message)
                l.dismiss();
              }
            )
        });
      }
    )
  }
}
