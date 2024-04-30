import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environment';
import { ProfileType } from '../../models/profile-type';

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
      this.profile = profile;
    });
  }
}
