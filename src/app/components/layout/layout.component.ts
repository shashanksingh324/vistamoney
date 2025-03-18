import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  showFiller = false;

  folders: Section[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    },
  ];

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {
      this.login();
  }

  login() {
    const payload = {
      "username": "devadmin",
      "password": "It'sVista2021"
    };
    const url = 'https://uat.theworldwidecard.net/api/get-authorised'
    this.http.post(url, payload).subscribe((res: any) => {
      if (res.code === '200') {
        localStorage.setItem('auth_token', res.token);
      }
    })
  }

}
