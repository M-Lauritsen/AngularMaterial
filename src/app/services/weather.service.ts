import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  url = environment.WeatherApiConfig.uri;

  constructor(private http: HttpClient) {}
  getWeather() {
    return this.http.get(this.url);
  }
}
