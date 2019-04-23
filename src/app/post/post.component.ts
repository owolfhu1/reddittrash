import {Component, Input, OnInit} from '@angular/core';
import {Strings} from '../strings';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() url = '';
  comments = [];
  post;
  reverse = false;
  limit = 10;

  get displayComments() {
    return this.reverse ? this.comments.reverse() : this.comments;
  }

  close(comment) {
    this.comments.splice(this.comments.indexOf(comment), 1);
  }

  process(data) {
    data.forEach(comment => {
      if (comment.kind === 't1') {
        this.comments.push(comment);
      } else if (comment.kind === 'more') {
        comment.data.children.forEach(async id => {
          const fetchedComment = await this.getAComment(id);
          this.comments.push(fetchedComment);
        });
      }
    });
  }

  async getAComment(id) {
    let comment = {};
    let dataFound = false;
    while (!dataFound) {
      await fetch(Strings.PRE + this.url + '/' + id + '.json', { mode: 'cors' }).then(x => x.json()).then(B => comment = B);
      dataFound = !!comment[1].data.children[0];
    }
    return comment[1].data.children[0];
  }

  ngOnInit() {}

  view(newUrl) {
    this.url = newUrl;
    this.comments = [];
    fetch(Strings.PRE + this.url + '.json', { mode: 'cors' })
      .then(x => x.json()).then(x => {
      this.post = x[0].data.children[0];
      this.process(x[1].data.children);
    });
  }

  getLinkImg(post) {
    return !post.data.thumbnail || post.data.thumbnail === 'default' ?
      'https://img.icons8.com/metro/104/000000/external-link.png' : post.data.thumbnail;
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
    this.comments.sort((a, b) => b.data.score - a.data.score);
    this.reverse = !this.reverse;
  }
}
