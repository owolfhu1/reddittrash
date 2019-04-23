import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Strings} from '../strings';

@Component({
  selector: 'app-sub',
  templateUrl: './sub.component.html',
  styleUrls: ['./sub.component.scss']
})
export class SubComponent {
  @Input() url;
  @Output() viewPost: EventEmitter<string> = new EventEmitter<string>();
  @Output() viewSub: EventEmitter<string> = new EventEmitter<string>();

  list: any[] = [];
  next;
  error;

  refresh() {
    this.list = [];
    const url = Strings.PRE + this.url + '.json';
    fetch(url, { mode: 'cors' }).then(r => r.json()).then(
      data => {
        this.error = '';
        this.list = data.data.children;
        this.next = data.data.after;
      },
      error => this.error = error
    );
  }

  getUrl(permLink) {
    return permLink.substring(3, permLink.length - 1);
  }

  date(created) {
    const data = new Date(created * 1000);
    const date = data.toLocaleDateString();
    const m = data.getHours() > 12 ? 'pm' : 'am';
    const hours = data.getHours() > 12 ? data.getHours() - 12 : data.getHours();
    const mins = data.getMinutes();
    return date + ' at ' + hours + ':' + mins + ' ' + m;
  }

  getLinkImg(post) {
    return !post.data.thumbnail || post.data.thumbnail === 'default' ?
      'https://img.icons8.com/metro/104/000000/external-link.png' : post.data.thumbnail;
  }

  close(post) {
    this.list.splice(this.list.indexOf(post), 1);
  }

  getMore() {
    const url = Strings.PRE + this.url + '.json' + '?after=' + this.next;
    fetch(url, { mode: 'cors' }).then(r => r.json()).then(data => {
        data.data.children.forEach(item => this.list.push(item));
        this.next = data.data.after;
    });
  }
}
