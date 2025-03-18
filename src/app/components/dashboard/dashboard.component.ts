import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxDatatableModule} from '@swimlane/ngx-datatable';


@Component({
  selector: 'app-dashboard',
  imports: [NgxDatatableModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  config: any = {
    rows: [],
    columns: [],
    ColumnMode: {
      force: true
    },

    rowHeight: 'auto',
    externalPaging: true,
    summaryRow: true,
    summaryHeight: 55,
    headerHeight: 50,
    footerHeight: 150,
    page: {
      totalElements: null,
      pageNumber: null,
      size: null,
    }
  }

  columns = [
    {
      "key": "fname",
      "prop": "fname",
      "name": "First Name"
    },
    {
      "key": "lname",
      "prop": "lname",
      "name": "Last Name"
    },
    {
      "key": "gender",
      "prop": "gender",
      "name": "Gender"
    },
    {
      "key": "email",
      "prop": "email",
      "name": "Email"
    }
  ]

  rows = [
    { fname: 'Austin', lname: 'Jen', gender: 'Male', email: 'austine.jen@gmail.com'},
    { fname: 'Anoop', lname: 'Jee', gender: 'Male', email: 'anoop.jee@gmail.com'},
    { fname: 'Rani', lname: 'Ben', gender: 'Female', email: 'rani.ben@gmail.com'},
  ];

  constructor() {

  }

  ngOnInit() {
    this.config.columns = this.columns;
    this.config.rows = this.rows;
  }

  // @ViewChild(MatPaginator) paginator: MatPaginator;

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

}
