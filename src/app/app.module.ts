import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { InputComponent } from './components/questionnaire/components/input/input.component';
import { ApiAssistantService } from './services/apiAssistant.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
import { metaReducers, reducers } from './state/reducers';
import { DateComponent } from './components/questionnaire/components/date/date.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { CountryComponent } from './components/questionnaire/components/country/country.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CardsComponent } from './components/questionnaire/components/cards/cards.component';
import { ColorComponent } from './components/questionnaire/components/color/color.component';
import { StrengthComponent } from './components/questionnaire/components/strength/strength.component';
import { CheckboxComponent } from './components/questionnaire/components/checkbox/checkbox.component';
import { ResultsComponent } from './components/results/results.component';
import { CigarSearchEffects } from './state/effects/cigarSearch.effects';
import { AgeGuard } from './state/guards/age.guard';
import { RestrictedComponent } from './components/questionnaire/components/restricted/restricted.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    InputComponent,
    QuestionnaireComponent,
    DateComponent,
    CountryComponent,
    CardsComponent,
    ColorComponent,
    StrengthComponent,
    CheckboxComponent,
    ResultsComponent,
    RestrictedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSkeletonLoaderModule,
    EffectsModule.forRoot([CigarSearchEffects]),
    StoreRouterConnectingModule.forRoot(),
    AngularSvgIconModule.forRoot(),
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    FontAwesomeModule,
    FormsModule,
  ],
  providers: [ApiAssistantService, AgeGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
