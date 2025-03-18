import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
// import { UserService } from '../../core/services/user.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

export interface IMerchant {
  mid: string;
  name: string;
}

export interface IVendor {
  vendorId: string;
  name: string;
}

@Component({
  selector: 'app-createemployee',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatButtonModule,
    ToastrModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './createemployee.component.html',
  styleUrl: './createemployee.component.scss'
})
export class CreateemployeeComponent implements OnInit {

  merchants: IMerchant[] = [];
  vendors: IVendor[] = [];
  dropdownVal: any = {
    countryList: [],
    currencyList: [],
    occupationsList: [],
    userTypesList: [],
    idTypes: [],
    intityType: [],
  }
  stateList: any[] = [];
  areaList: any[] = [];
  idTypeList: any[] = [];

  userForm: any;

  constructor(
    private http: HttpClient,
    private _fb: FormBuilder,
    private toastr: ToastrService
    // private userService: UserService
  ) {

  }

  ngOnInit() {
    this.createForm();
    this.getMerchantId();
    this.getDropdownValues();
  }

  createForm() {
    this.userForm = this._fb.group({
      merchant_id: ['', Validators.required],
      userType: ['', Validators.required],
      vendor: ['', Validators.required],
      your_currency: [[], Validators.required],
      nick_name: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: '',
      lastName: '',
      sencondLastName: '',
      idType: ['', Validators.required],
      idNumber: ['', Validators.required],
      idIssue_date: ['', Validators.required],
      idExpiry_date: ['', Validators.required],
      idIssueCountry: ['', Validators.required],
      email: ['', Validators.required],
      contactNumber: ['', Validators.required],
      country: ['', Validators.required],
      state: '',
      city: '',
      area: '',
      address: '',
      zip: '',
      gender: '',
      date_of_birth: '',
      country_of_birth: '',
      residency: '',
      citizenship: '',
      occupation: '',
      sourceOfFund: '',
      intityType: '',
      business_type: '',
      idNumber_2: '',
      idType_2: '',
      firstName_native: '',
      middleName_native: '',
      lastName_native: '',
      address_native: '',
      is_pep: 'yes',
      pep_remark: ''
    })
  }

  getMerchantId() {
    this.http.get('https://uat.theworldwidecard.net/api/get-merchants').subscribe((res: any)=> {
      if(res.code === '200') {
        this.merchants = res?.response;
      }
    })
  }

  getIdTypeList(userType: string) {
    this.idTypeList = this.dropdownVal.idTypes.filter((idType: any) => {
      return idType.applicable_for === userType;
    })
  }
  getVendors(event: any) {
    const merchant_id = event
    const url = `https://uat.theworldwidecard.net/api/get-vendors/${merchant_id}/payouts`;
    this.http.get(url).subscribe((res: any)=> {
      if(res.code === '200') {
        this.vendors = res?.response;
      }
    })
  }

  getDropdownValues() {
    this.http.get('https://uat.theworldwidecard.net/api/iBan/add-edit-user').subscribe((res: any)=> {
      if(res.code === '200') {
        this.dropdownVal = res.response;
      }
    })
  }

  getStateList(event: any) {
    const selectedCountry = this.dropdownVal.countryList.find((country: any)=> {
      return country.id === event;
    });
    const url = `https://uat.theworldwidecard.net/api/TWWC-PayOuts/get-state-area-list/USD/${selectedCountry.iso3}`;
    this.http.get(url).subscribe((res: any)=> {
      if(res.code === '200') {
        console.log(res);
        this.stateList = res.response;
      }
    })
  }

  getAreaList(stateCode: any) {
    const selectedCountry = this.dropdownVal.countryList.find((country: any)=> {
      return country.id === this.userForm.value.country;
    });
    
    const url = `https://uat.theworldwidecard.net/api/TWWC-PayOuts/get-state-area-list/USD/${selectedCountry.iso3}/${stateCode}`;
    this.http.get(url).subscribe((res: any)=> {
      if(res.code === '200') {
        this.areaList = res.response;
      }
    })
  }

  saveUser() {
    if(!this.userForm.valid) {
      this.userForm.markAllAsTouched();
      this.toastr.error('Please provide mandatoey fields.');
      return;
    }

    const _payload = this.removeEmpty(this.userForm.value);
    this.http.post('https://uat.theworldwidecard.net/api/iBan/add-edit-user', _payload).subscribe(res => {
      console.log(res);
    })
  }

  removeEmpty(obj: any) {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != ''));
  }
}
