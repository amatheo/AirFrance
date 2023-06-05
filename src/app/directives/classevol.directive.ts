import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import {ClasseVol} from "../models/passager.model";

@Directive({
  selector: '[appClasseVol]'
})
export class ClasseVolDirective implements OnInit {
  @Input('appClasseVol') classeVol: string;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.setColor();
  }

  private setColor() {
    switch (this.classeVol) {
      case "STANDARD":
        this.el.nativeElement.style.color = 'blue';
        break;
      case "BUSINESS":
        this.el.nativeElement.style.color = 'green';
        break;
      case "PREMIUM":
        this.el.nativeElement.style.color = 'orange';
        break;
      default:
        this.el.nativeElement.style.color = 'black';
        break;
    }
  }
}
