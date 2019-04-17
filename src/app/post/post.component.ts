import {Component, Input, OnInit} from '@angular/core';
import {Strings} from '../strings';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() url = '';

  comments: any[] = [];
  post = '';
  get reversedComments() {
    return this.reverse ? this.comments.reverse() : this.comments;
  }

  reverse = false;
  limit = 10;

  constructor() { }

  process(data) {
    data.forEach(comment => {
      if (comment.kind === 't1') {
        this.comments.push(comment);
      } else if (comment.kind === 'more') {
        comment.data.children.forEach(async id => {
          const fetchedComment = await this.getAComment(id);
          this.comments.push(fetchedComment);
          this.comments.sort((a, b) => b.data.score - a.data.score);
        });
      }
    });
  }

  async getAComment(id) {
    let comment = {};
    let dataFound = false;
    while (!dataFound) {
      await fetch(Strings.PRE + this.url + '/' + id + '.json', { mode: 'cors' }).then(x => x.json()).then(x => comment = x);
      dataFound = !!comment[1].data.children[0];
    }
    return comment[1].data.children[0];
  }

  ngOnInit() {
    // this.view(this.url);
  }

  view(newUrl) {
    this.url = newUrl;
    this.comments = [];
    fetch(Strings.PRE + this.url + '.json', { mode: 'cors' })
      .then(x => x.json()).then(x => {
      this.post = x[0].data.children[0].data.title;
      this.process(x[1].data.children);
    });
  }

}
