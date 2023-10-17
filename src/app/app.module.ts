import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { InputComponent } from './components/input/input.component';
import { ApiAssistantService } from './utils/apiAssistantService';
import { HttpClientModule } from '@angular/common/http';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
import { FormLinkingDirective } from './link-form.directive';
import { metaReducers, reducers } from './state/reducers';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    InputComponent,
    QuestionnaireComponent,
    FormLinkingDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSkeletonLoaderModule,
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [ApiAssistantService],
  bootstrap: [AppComponent],
})
export class AppModule {}
