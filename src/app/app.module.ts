import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import {RouterModule} from '@angular/router';
import{FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { ItemComponent } from './item/item.component';
import { FocusDirective } from './focus.directive';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    ItemComponent,
    FocusDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      {path:'',component:TodoComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
