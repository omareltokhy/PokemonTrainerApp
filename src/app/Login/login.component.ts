import { Component } from '@angular/core'
import { LoginService } from "../services/login.service"
import { Router } from "@angular/router"

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent{
    username: string = "";

    constructor(
        private readonly router: Router,
        private readonly loginService: LoginService
    ) {
    }
            get attempting(): boolean {
                return this.loginService.attempting;
            }


            onLoginClick(): void {
                console.log("you are: ", this.username)
                this.loginService.authenticate(this.username, async () => {

                    await this.router.navigate(['pokemons'])
                })
            }
        }