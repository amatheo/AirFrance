import {Component, Input} from '@angular/core';
import {Passager} from "../../models/passager.model";

@Component({
  selector: 'app-passager',
  templateUrl: './passager.component.html',
  styleUrls: ['./passager.component.scss']
})
export class PassagerComponent {
  @Input() passager: Passager;
  @Input() afficherPhoto: boolean = false;
}
