import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-gildings',
  templateUrl: './gildings.component.html',
  styleUrls: ['./gildings.component.scss']
})
export class GildingsComponent {
  @Input() gildings;
  numbers = [1, 2, 3];
  types = ['silver', 'gold', 'platinum'];
}
