import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  public menus=[
    {title: "Enregistrement ", url: "/menu/home", icon: "caisse"},
    {title: "Distance/prix", url: "/menu/tester", icon: "priority"},
    {title: "Grille tarifaire", url: "/menu/dotation", icon: "grille"},
  ];
  constructor(private router: Router) { }

  ngOnInit() {
  }
  onMenuAction(url: string) {
    this.router.navigateByUrl(url)
  }
}
