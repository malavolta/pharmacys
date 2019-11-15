import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent {
  name = new FormControl('');
  profileForm = this.fb.group({
    nombrelocal: ['', Validators.required],
    comuna: ['']
  });

  pharmacys: any;
  pharmacysFilter: any;
  comunas: any;
  api = 'https://vast-fortress-01643.herokuapp.com/api'
  pharmacyUrl = this.api + '/pharmacy/turn'
  comunasUrl = this.api + '/comunas'


  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.getRestPharmacy()
    this.getComunas()
  }

  ngOnInit() {
  }

  getRestPharmacy(): void {
    this.restItemsServiceGetRestItems()
      .subscribe(
        restItems => {
          this.pharmacys = restItems
        }
      )
  }
  getComunas(): void {
    this.restServiceGetComunas()
    .subscribe(
      comunas => {
        this.comunas = comunas
      }
    )
  }

  restItemsServiceGetRestItems() {
    return this.http
      .get<any[]>(this.pharmacyUrl)
      .pipe(map(data => data))
  }
  restServiceGetComunas() {
    return this.http
      .get(this.comunasUrl,{responseType: 'text'})
      .pipe(map(data => data));
  }

  onSubmit() {
    this.pharmacysFilter  = this.pharmacys.filter(a => a.fk_comuna === this.profileForm.value.comuna && a.local_nombre.includes(this.profileForm.value.nombrelocal))
    console.warn(this.pharmacysFilter);
  }
}
