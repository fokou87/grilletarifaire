import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GrilleTarifaireService} from "../Service/GrilleTarifaireService";
import {IonSlides} from "@ionic/angular";

@Component({
  selector: 'app-dotation',
  templateUrl: './dotation.page.html',
  styleUrls: ['./dotation.page.scss'],
})
export class DotationPage implements OnInit {
  @ViewChild('slides', { static: false }) slider: IonSlides;
  segment = 0;
  form:FormGroup;
  constructor(public grilletarifaireService:GrilleTarifaireService) { }

  ngOnInit() {
    this.initForm();
    this.grilletarifaireService.getAllGrille();
  }

  initForm(){
    this.form=new FormGroup({
      libelle:new FormControl('',{validators:[Validators.required]}),
      prix:new FormControl('',{validators:[Validators.required]}),
      description:new FormControl('',{validators:[Validators.required]}),
      distancemin:new FormControl('',{validators:[Validators.required]}),
      distancemax:new FormControl('',{validators:[Validators.required]}),
    })
  }

  onSubmit() {
    if (!this.form.valid) return;
    this.grilletarifaireService.saveGrille(this.form.value);
  }


  segmentChanged(ev) {
    console.log('segment change', ev.target.value)
    this.slider.slideTo(ev.target.value)
  }
  slideChanged() {
    this.slider.getActiveIndex().then(index => {
      this.segment = index;
    });

  }
}
