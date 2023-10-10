import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { InputComponent } from './components/input/input.component';
import { ApiAssistantService } from './utils/apiRequestClass';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [AppComponent, MainComponent, InputComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSkeletonLoaderModule,
  ],
  providers: [ApiAssistantService],
  bootstrap: [AppComponent],
})
export class AppModule {}
