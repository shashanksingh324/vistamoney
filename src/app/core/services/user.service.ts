import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpService: HttpService
  ) { }

  getDropdownValues() {
    return this.httpService.get('/api/iBan/add-edit-user');
  }
}
