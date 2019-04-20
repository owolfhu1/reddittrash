import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Strings} from '../strings';

@Component({
  selector: 'app-sub',
  templateUrl: './sub.component.html',
  styleUrls: ['./sub.component.scss']
})
export class SubComponent implements OnInit {
  @Input() url;
  @Output() viewPost: EventEmitter<string> = new EventEmitter<string>();

  list: any[] = [];
  next;
  error;

  constructor() { }

  ngOnInit() {
  }

  refresh() {
    fetch(Strings.PRE + this.url + '.json', { mode: 'cors' }).then(r => r.json()).then(
      data => {
        this.error = '';
        this.list = data.data.children;
        this.next = data.after;
        console.log(this.list);
      },
      error => this.error = error
    );
  }

  getUrl(permLink) {
    return permLink.substring(3, permLink.length - 1);
  }

  date = created => {
    const data = new Date(created * 1000);
    const date = data.toLocaleDateString();
    const m = data.getHours() > 12 ? 'pm' : 'am';
    const hours = data.getHours() > 12 ? data.getHours() - 12 : data.getHours();
    const mins = data.getMinutes();
    return date + ' at ' + hours + ':' + mins + ' ' + m;
  }

}
