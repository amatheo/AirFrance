import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import { MAT_DATE_RANGE_SELECTION_STRATEGY } from '@angular/material/datepicker';
import { FiveDayRangeSelectionStrategy } from 'src/app/date-adapter';
import { IAeroport } from 'src/app/models/aeroport.model';
import { AEROPORTS } from './../../constants/aeroport.constant';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IFiltres} from "../../models/filtres.model";

@Component({
  selector: 'app-filtres',
  templateUrl: './filtres.component.html',
  styleUrls: ['./filtres.component.scss'],
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: FiveDayRangeSelectionStrategy,
    },
  ],
  encapsulation: ViewEncapsulation.None
})
export class FiltresComponent implements OnInit {

  /**
   * La liste des aéroports disponibles est une constante,
   * on n'utilise que les principaux aéroports français pour l'instant
   */
  aeroports: IAeroport[] = AEROPORTS;

  @Output() filter: EventEmitter<IFiltres> = new EventEmitter<IFiltres>();

  filtreGroup : FormGroup;

  constructor( private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    // Init Formgroup wih formcontrol for each input. Each input is required and should not be null.
    this.filtreGroup = this.formBuilder.group({
      start: [null, Validators.required],
      end: [null, Validators.required],
      aero: [null, Validators.required],
    });
  }

  sendFilter() {
    let filtres : IFiltres = {
      aeroport: this.filtreGroup.value.aero.aeroport,
      debut: this.filtreGroup.value.start,
      fin: this.filtreGroup.value.end
    }
    this.filter.emit(filtres);
  }

}
