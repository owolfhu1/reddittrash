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
  showSub = true;
  url = 'popular';
  ngOnInit() {
    setTimeout(ghosts => this.visitSub(this.url), 500);
  }
  visitSub(sub){
    this.url = sub;
    this.showSub = true;
    this.titleService.setTitle('Reddit Trash | r/' + sub);
    setTimeout(() => {
      this.subComponent.url = sub;
      this.subComponent.refresh();
    }, 100);
  }
  viewPost(postUrl) {
    this.url = postUrl;
    this.showSub = false;
    setTimeout(() => this.postComponent.view(postUrl), 100);
  }
}
