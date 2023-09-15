import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EntityService } from 'src/app/services/entity.service';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HttpClientModule],
})

export class HomePage implements OnInit {
  restaurants: Array<any> = new Array<any>();
  idx: number = 0;
  current = {
    'name': null,
    'price': null,
    'image_url': null
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getRestaurants("restaurants in san antonio").subscribe(response => {
      console.log(response);
      this.restaurants = response.businesses;
      this.current = this.restaurants[0];
    });
  }

  getRestaurants(location: string): Observable<any> {
		let url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${location}&term=restaurants`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer zMgwEv-3U3-M-guXI69P-0fCHNfcxvARlFzeNJZsvVV2PuXOgTlL8CWoO3uTA4dIUstpnuv9s5229-ZYo-snN7vphvVG6BNJY9w7GxXxFLELyxzxNdrYht5OdQAEZXYx'
    });
		return this.http.get<any>(url, { headers: headers });
	}

  like(): void {
    if(this.idx < this.restaurants.length) {
      this.idx++;
      this.current = this.restaurants[this.idx];
    } else {
      this.idx = 0;
      this.current = this.restaurants[this.idx];
    }
  }

  dislike(): void {
    this.like();
  }
}
