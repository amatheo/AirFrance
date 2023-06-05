import {Component, OnDestroy, OnInit} from '@angular/core';
import { IFiltres } from 'src/app/models/filtres.model';
import { Vol } from 'src/app/models/vol.model';
import { VolService } from '../../services/vol.service';
import {Subscription} from "rxjs";
import {PassagerService} from "../../services/passager.service";
import {Passager} from "../../models/passager.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-view-airfrance',
  templateUrl: './view-airfrance.component.html',
  styleUrls: ['./view-airfrance.component.scss']
})
export class ViewAirFranceComponent implements OnDestroy, OnInit {

  vols: Vol[] = [];
  passagers: Passager[] = [];
  volSubscription?: Subscription;
  passagerSubscription?: Subscription;
  routeSubscription?: Subscription;
  type: "decollages" | "atterrissages";

  constructor(private _volService: VolService, private _passagerService: PassagerService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSubscription = this._activatedRoute.data.subscribe((data$) => {
      this.type = data$['type'] ? data$['type'] : 'decollages';
    });
  }

  /**
   * Réaction à la mise à jour des filtres
   * On souhaite récupérer les vols qui correspondent aux filtres passés en paramètre
   * en utilisant le service défini dans le constructeur
   * @param filtres récupérés depuis le composant enfant
   */
  onFiltresEvent(filtres: IFiltres): void {
    if(this.type == 'decollages'){
      this.volSubscription = this._volService.getVolsDepart(filtres.aeroport.icao, filtres.debut.getTime(), filtres.fin.getTime()).subscribe((value) => {
        this.vols = value;
      })
    }
    else {
      this.volSubscription = this._volService.getVolsArrivee(filtres.aeroport.icao, filtres.debut.getTime(), filtres.fin.getTime()).subscribe((value) => {
        this.vols = value;
      });
    }
  }

  loadPassagers(vol: Vol): void {
    this.passagerSubscription = this._passagerService.getPassagers(vol.icao).subscribe((value) => {
      this.passagers = value;
    })
  }

  ngOnDestroy(){
    this.volSubscription?.unsubscribe();
    this.passagerSubscription?.unsubscribe();
    this.routeSubscription?.unsubscribe();
  }

}
