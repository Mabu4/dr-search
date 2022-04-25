import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { AddDoctorComponent } from '../add-doctor/add-doctor.component';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Doc } from 'src/models/doc.class';
import { DialogThemesComponent } from '../dialog-themes/dialog-themes.component';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.scss']
})
export class StartpageComponent implements OnInit {

  constructor(public dialog: MatDialog, private firestore: AngularFirestore) { }

  docs = [];
  shownDocs = [];
  myControl = new FormControl();
  myControl1 = new FormControl();
  citys = [];
  themes = [];
  filteredCitys: Observable<Doc[]>;
  filteredThemes: Observable<Doc[]>;

  ngOnInit(): void {
    this.loadDocs();
    //Die Städte werden gefiltert
    this.filteredCitys = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.citys.slice())),
    );
    //Die Themen werden gefiltert
    this.filteredThemes = this.myControl1.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter1(name) : this.themes.slice())),
    );
  }

  // Die Ärzte werden vom Server geladen
  async loadDocs(){
    this.firestore
    .collection('docs')
    .valueChanges({idField: 'customIdName'})
    .subscribe((changes: any) => {
      this.docs = changes;
      this.shownDocs = changes;
      this.filterElements();
    })
  }

// Die Themen und Spezialitäten der Ärzte werden aus dem JSON Array geladen und
// in ein array gepackt
  filterElements(){
    let unfilteredThemes = [];
    for (let i = 0; i < this.docs.length; i++) {
      let doc = this.docs[i];
      this.citys.push({city: doc.city});
      doc.specialities.forEach(speialty => {
        unfilteredThemes.push(speialty);
      });
      doc.themes.forEach(theme => {
        unfilteredThemes.push(theme);
      });
    }
    // Das Array wird von Duplikaten befreit und in ein JSON Array umgewandelt und in this.themes gepusht
    let filteredArray = this.removeDuplicateUsingFilter(unfilteredThemes);
    for (let i = 0; i < filteredArray.length; i++) {
      const element = filteredArray[i];
      this.themes.push({themes: element});
    }
  }

  openDialogThemes(id){
    const dialog = this.dialog.open(DialogThemesComponent);
    let doc = this.shownDocs.filter((doc) => doc.customIdName == id);
    dialog.componentInstance.doctor = doc;
  }


//Es kommt z.B. {city: München} rein
  displayFn(doc: any): any {
    return doc && doc.city ? doc.city : '';
  }

//Es kommt z.B. {themes: Hautarzt} rein
  displayFn1(doc: any): any {
    return doc && doc.themes ? doc.themes : '';
  }


  private _filter(name: any): Doc[] {
    const filterValue = name.toLowerCase();
    return this.citys.filter(citys => citys.city.toLowerCase().includes(filterValue));
  }


  private _filter1(name: any) {
    const filterValue = name.toLowerCase();
    return this.themes.filter(theme => theme.themes.toLowerCase().includes(filterValue));
  }


  openDialog(): void{
  const dialogRef = this.dialog.open(AddDoctorComponent);
  }


  filterList(theme, city, booking) {
    if(theme.length >= 1 && city.length == 0 && !booking){
      let themes = this.docs.filter((doc) => doc.themes.includes(theme));
      let specialty = this.docs.filter((doc) => doc.specialities.includes(theme));
      let unfilteredDocs = [...themes, ...specialty];
      this.shownDocs = this.removeDuplicateUsingFilter(unfilteredDocs);
    } else if (city.length >= 1 && theme.length == 0 && !booking){
      let citys = this.docs.filter((doc) => doc.city == city);
      this.shownDocs = citys;
    } else if (city.length >= 1 && theme.length >= 1 && !booking){
      let themes = this.docs.filter((doc) => doc.themes.includes(theme));
      let specialty = this.docs.filter((doc) => doc.specialities.includes(theme));
      let citys = this.docs.filter((doc) => doc.city == city);
      let unfilteredDocsFirst = [...themes, ...specialty];
      let filteredFirst = this.removeDuplicateUsingFilter(unfilteredDocsFirst);
      let unfilteredDocs = [...filteredFirst, ...citys];
      this.shownDocs = this.findDuplicatesUsingFilter(unfilteredDocs);
    } else if (city.length == 0 && theme.length == 0 && !booking){
      this.shownDocs = this.docs;
    } else if (booking && theme.length == 0 && city.length == 0){
      let bookings = this.docs.filter((doc) => doc.appointment == booking);
      this.shownDocs = bookings;
    } else if (booking && theme.length >= 1 && city.length == 0) {
      let bookings = this.docs.filter((doc) => doc.appointment == booking);
      let themes = this.docs.filter((doc) => doc.themes.includes(theme));
      let specialty = this.docs.filter((doc) => doc.specialities.includes(theme));
      let unfilteredDocsFirst = [...themes, ...specialty];
      let filteredFirst = this.removeDuplicateUsingFilter(unfilteredDocsFirst);
      let unfilteredDocs = [...filteredFirst, ...bookings];
      this.shownDocs = this.findDuplicatesUsingFilter(unfilteredDocs);
    } else if (booking && theme.length == 0 && city.length >= 1) {
      let bookings = this.docs.filter((doc) => doc.appointment == booking);
      let citys = this.docs.filter((doc) => doc.city == city);
      let unfilteredDocs = [...citys, ...bookings];
      this.findDuplicatesUsingFilter(unfilteredDocs);
    } else if (booking && theme.length >= 1 && city.length >= 1) {
      let bookings = this.docs.filter((doc) => doc.appointment == booking);
      let themes = this.docs.filter((doc) => doc.themes.includes(theme));
      let specialty = this.docs.filter((doc) => doc.specialities.includes(theme));
      let citys = this.docs.filter((doc) => doc.city == city);
      let unfilteredDocsFirst = [...themes, ...specialty];
      let filteredFirst = this.removeDuplicateUsingFilter(unfilteredDocsFirst);
      let unfilteredDocsSecond = [...bookings, ...citys];
      let filteredSecond = this.findDuplicatesUsingFilter(unfilteredDocsSecond);
      let unfilteredDocs = [...filteredFirst, ...filteredSecond];
      this.shownDocs = this.findDuplicatesUsingFilter(unfilteredDocs);
    }
  }

  // Duplikate werden aus Array entfernt
  removeDuplicateUsingFilter(arr){
    return arr.filter(function(elem, index, self) {
        return index == self.indexOf(elem);
    });
  }

  // Duplikate werden gepseichert und wieder zurückgegeben
  findDuplicatesUsingFilter(arr){
    let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) !== index);
    let duplicates = findDuplicates(arr);
    return duplicates;
  }

}
