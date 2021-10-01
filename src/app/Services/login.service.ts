import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable, of, throwError } from "rxjs";
import { User } from "../models/user.model";
import { catchError, finalize, map, retry, switchMap, tap } from "rxjs/operators";
import { SessionService } from "./session.service"



const API_URL = environment.apiBaseUrl

@Injectable({
	providedIn: 'root'
})
export class LoginService {

	public attempting: boolean = false;
	public error: string = '';

	constructor(private readonly http: HttpClient, private sessionService: SessionService) {
	}

	private findByUsername(username: string): Observable<User[]> {
		return this.http.get<User[]>(`${ API_URL }/trainers?username=${ username }`)
	}

	private createUser(username: string): Observable<User> {
		const headers = new HttpHeaders({
			'x-api-key': environment.publicApiKey
		})
		return this.http.post<User>(`${ API_URL }/trainers`, { username }, { headers })
	}


	public authenticate(username: string, onSuccess: () => void): void {

		this.attempting = true;

		// If a user is not found, switch to Register
		const mapToRegister = (users: User[]) => {
			if (users.length) {
				return of(users[0])
			}
			return this.createUser(username)
		}

		// Catch general errors
		const catchRequestError = (user: User) => {
			return throwError('Could not create a user.');
		}

		// Put user in session
		const tapToSession = (user: User) => {
			this.sessionService.setUser(user)
		}

		// Finalize response
		const finalizeRequest = () => this.attempting = false;

		this.findByUsername(username)
			.pipe(
				retry(3),
				switchMap(mapToRegister),
				tap(tapToSession),
				catchError(catchRequestError),
				finalize(finalizeRequest)
			)
			.subscribe(
				(user: User) => { // Success
					onSuccess();
				},
				(error: string) => { // error
					this.error = error;
				}
			)
	}

}
