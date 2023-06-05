import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Vol} from "../../models/vol.model";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-liste-vols',
  templateUrl: './liste-vols.component.html',
  styleUrls: ['./liste-vols.component.scss']
})
export class ListeVolsComponent implements OnInit, OnDestroy{

  @Input() vols: Vol[] = [];
  @Output() volSelected: EventEmitter<Vol> = new EventEmitter<Vol>();
  type: string;
  routeSubscription: Subscription;

  constructor(private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSubscription = this._activatedRoute.data.subscribe((data$) => {
      this.type = data$['type'] ? data$['type'] : 'decollages';
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }
}
