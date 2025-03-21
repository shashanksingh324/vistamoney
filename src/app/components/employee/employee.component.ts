import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-employee',
  imports: [NgxDatatableModule, RouterLink, MatButtonModule,],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent implements OnInit {
  reorderable: boolean = true;
  loadingIndicator: boolean = true;



  rows = [
    { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    { name: 'Dany', gender: 'Male', company: 'KFC' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
  ];
  columns = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company' }
  ];
  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.getUsersList();
  }

  getUsersList() {
    const url = `https://uat.theworldwidecard.net/api/iBan/get-users`;
    this.http.get(url).subscribe(res => {
      console.log(res);
    })
  }

  createEmployee() {

  }

}
