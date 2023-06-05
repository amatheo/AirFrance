import {Component, Input, OnInit} from '@angular/core';
import {IVol} from "../../models/vol.model";
import {COMPAGNIES} from "../../constants/compagnie.constant";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-vol',
  templateUrl: './vol.component.html',
  styleUrls: ['./vol.component.scss']
})
export class VolComponent {

  @Input() vol: IVol;
  @Input() type: string;

  constructor() { }

  getLogo(companyName: string) : string{
    if (companyName == COMPAGNIES.AFR){
      return "assets/Air France.png";
    }
    else if (companyName == COMPAGNIES.HOP){
      return "assets/Air France Hop.png";
    }
    else if (companyName == COMPAGNIES.TVF){
      return "assets/Transavia France.png";
    }
    return "";
  }

}
