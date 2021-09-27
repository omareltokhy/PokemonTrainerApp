import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './Login/login.component';
import { PokemonComponent } from './Pokemon/pokemon.component';
import { TrainerComponent } from './Trainer/trainer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PokemonComponent,
    TrainerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
