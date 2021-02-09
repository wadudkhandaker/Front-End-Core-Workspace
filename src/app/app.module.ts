import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PhotoUploaderModule } from '@test21-core/photo-uploader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, PhotoUploaderModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
