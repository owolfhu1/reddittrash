import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Strings} from '../strings';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment: any;
  @Input() url;
  @Input() op;
  show = false;
  replies: any[] = [];
  @Input() level = 1;
  limit = 2;
  reverse = false;
  @Output() close: EventEmitter<void> = new EventEmitter();

  closeComment(comment) {
    this.replies.splice(this.replies.indexOf(comment), 1);
  }

  get repliesReverse() {
    return this.reverse ? this.replies.reverse() : this.replies;
  }

  get type() {
    let level = this.level;
    while (level > 6) {
      level -= 6;
    }
    if (level === 6) {
      return 'success';
    } else if (level === 5) {
      return 'info';
    } else if (level === 4) {
      return 'warning';
    } else if (level === 3) {
      return 'danger';
    } else if (level === 2) {
      return 'primary';
    } else {
      return 'secondary';
    }
  }

  getReplies(data) {
    data.forEach(comment => {
      if (comment.kind === 't1') {
        this.replies.push(comment);
      } else if (comment.kind === 'more') {
        comment.data.children.forEach(async id => {
          const fetchedComment = await this.getAComment(id);
          this.replies.push(fetchedComment);
        });
      }
    });
  }

  async getAComment(id) {
    let comment = {};
    let dataFound = false;
    const url = Strings.PRE + this.url + '/' + id + '.json';
    while (!dataFound) {
      await fetch(url, { mode: 'cors' }).then(x => x.json()).then(x => comment = x);
      dataFound = !!comment[1].data.children[0];
    }
    return comment[1].data.children[0];
  }

  ngOnInit() {
    if (this.comment.data.replies) {
      this.getReplies(this.comment.data.replies.data.children);
    }
  }

  date(created) {
    const data = new Date(created * 1000);
    const date = data.toLocaleDateString();
    const m = data.getHours() > 12 ? 'pm' : 'am';
    const hours = data.getHours() > 12 ? data.getHours() - 12 : data.getHours();
    const mins = data.getMinutes();
    return date + ' at ' + hours + ':' + mins + ' ' + m;
  }

  flip() {
    this.replies.sort((a, b) => b.data.score - a.data.score);
    this.reverse = !this.reverse;
  }
}
