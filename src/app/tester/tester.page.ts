import { Component, OnInit } from '@angular/core';
import {AdresseService} from "../Service/AdresseService";
import {LoadingController, ToastController} from "@ionic/angular";
import {Villes} from "../Model/Villes";
import {Quartier} from "../Model/Quartier";
import {Secteurs} from "../Model/Secteurs";
import {CotationService} from "../Service/CotationService";
import {CotationDto} from "../Model/CotationDto";
import {Positions} from "../Model/Positions";
import {AdresseDto} from "../Model/AdresseDto";

@Component({
  selector: 'app-tester',
  templateUrl: './tester.page.html',
  styleUrls: ['./tester.page.scss'],
})
export class TesterPage implements OnInit {

  villeA:Villes;
  quartierA: Quartier;
  secteurA: Secteurs;

  villeB:Villes;
  quartierB: Quartier;
  secteurB: Secteurs;
  constructor(public adresseService:AdresseService,public loadingController: LoadingController,public cotationService:CotationService,
              public toastController: ToastController) { }

  ngOnInit() {
  }

  getPrixByPosition() {
    let pointA:Positions=new Positions();
    let pointB:Positions=new Positions();
    let cotationDto:CotationDto=new CotationDto();
    cotationDto.pointA=pointA;
    cotationDto.pointB=pointB;
    this.cotationService.getCotationByPosition(cotationDto)
  }


  getPrixByAdresse(){
    let adressedto:AdresseDto=new AdresseDto();
    adressedto.idsecteurArriver=this.secteurB.idsecteur;
    adressedto.idsecteurDepart=this.secteurA.idsecteur;
    this.cotationService.getCotationByAdresse(adressedto);
  }


}
