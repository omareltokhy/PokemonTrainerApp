import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { PokemonComponent } from "./pokemon/pokemon.component";
import { TrainerComponent } from "./trainer/trainer.component";
import { AuthGuard } from "./services/auth.guard";

//Declare routing for pokemon app
const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'trainer',
        component: TrainerComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: 'pokemons',
        component: PokemonComponent,
        canActivate: [ AuthGuard ]
    }

];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
    
})
export class AppRoutingModule {}