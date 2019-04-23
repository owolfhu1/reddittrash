import {Component, ViewChild, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private titleService: Title) {}
  @ViewChild('subComponent') subComponent;
  @ViewChild('postComponent') postComponent;
  url = 'popular';
  postUrl = '';
  showInput = true;

  ngOnInit() {
    setTimeout(ghost => this.visitSub(this.url), 10);
  }

  visitSub(sub) {
    this.url = sub;
    this.titleService.setTitle('Reddit Trash | r/' + sub);
    setTimeout(() => {
      this.subComponent.url = sub;
      this.subComponent.refresh();
    }, 100);
  }

  viewPost(postUrl) {
    this.postUrl = postUrl;
    setTimeout(() => this.postComponent.view(postUrl), 10);
  }

  closePost() {
    this.postUrl = '';
  }

  onKeyup(event) {
    if (!event || event.key === 'Enter') {
      this.visitSub(event.target.value);
      event.target.value = '';
    }
  }

  onButtonPress(input) {
    this.visitSub(input.value);
    input.value = '';
  }
}
