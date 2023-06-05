import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appPoidsBagages]'
})
export class PoidsBagagesDirective {
  @Input('appPoidsBagages') classeVol: string;
  @Input() nbBagages: number;
  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.setStyles();
  }

  private setStyles() {
    let maxBagages: number;

    switch (this.classeVol) {
      case "STANDARD":
        maxBagages = 1;
        break;
      case "BUSINESS":
        maxBagages = 2;
        break;
      case "PREMIUM":
        maxBagages = 3;
        break;
      default:
        maxBagages = 0;
        break;
    }

    if (this.nbBagages > maxBagages) {
      this.el.nativeElement.style.backgroundColor = 'red';
    }
  }

}
