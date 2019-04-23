import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PostComponent } from './post/post.component';
import { CommentComponent } from './comment/comment.component';
import { SubComponent } from './sub/sub.component';
import { GildingsComponent } from './gildings/gildings.component';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    CommentComponent,
    SubComponent,
    GildingsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
