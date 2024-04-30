import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environment';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  profile: ProfileType | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getProfile(environment.apiConfig.uri);
  }
  getProfile(uri: string) {
    this.http.get(uri).subscribe((profile) => {
      console.log(profile);
      this.profile = profile;
    });
  }
}

type ProfileType = {
  givenName?: string;
  surname?: string;
  userPrincipalName?: string;
  id?: string;
};
