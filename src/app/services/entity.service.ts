import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class EntityService {

	constructor(private http: HttpClient) { }

	public getRestaurants(query: string): Observable<any> {
		let url = `https://api.bing.microsoft.com/v7.0/entities?q=${query}&mkt=en-US&responseFilter=places`;

		return this.http.get<any>(url);
	}
}
