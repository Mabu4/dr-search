import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { AddDoctorComponent } from '../add-doctor/add-doctor.component';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Doc } from 'src/models/doc.class';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.scss']
})
export class StartpageComponent implements OnInit {

  constructor(public dialog: MatDialog, private firestore: AngularFirestore) { }

  docs = [];
  myControl = new FormControl();
  myControl1 = new FormControl();
  citys = [];
  themes = [];
  filteredCitys: Observable<Doc[]>;
  filteredThemes: Observable<Doc[]>;

  ngOnInit(): void {
    this.loadDocs();
    this.filteredCitys = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.citys.slice())),
    );
    this.filteredThemes = this.myControl1.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter1(name) : this.themes.slice())),
    );
  }


  async loadDocs(){
    this.firestore
    .collection('docs')
    .valueChanges({idField: 'customIdName'})
    .subscribe((changes: any) => {
      // console.log(changes);
      this.docs = changes;
      this.filterElements();
    })
  }


  filterElements(){
    for (let i = 0; i < this.docs.length; i++) {
      let doc = this.docs[i];
      this.citys.push({city: doc.city});
      doc.specialities.forEach(speialty => {
        this.themes.push({themes: speialty});
      });
      doc.themes.forEach(theme => {
        this.themes.push({themes: theme});
      });
    }
  }


//Es kommt z.B. {city: München} rein
  displayFn(doc: any): any {
    return doc && doc.city ? doc.city : '';
  }

  displayFn1(doc: any): any {
    return doc && doc.themes ? doc.themes : '';
  }


  private _filter(name: any): Doc[] {
    const filterValue = name.toLowerCase();
    return this.citys.filter(citys => citys.city.toLowerCase().includes(filterValue));
  }

  private _filter1(name: any) {
    const filterValue = name.toLowerCase();
    return this.themes.filter(themes => themes.themes.toLowerCase().includes(filterValue));
  }


  openDialog(): void{
  const dialogRef = this.dialog.open(AddDoctorComponent);
  }

}
