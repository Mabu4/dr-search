import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Doc } from 'src/models/doc.class';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss']
})
export class AddDoctorComponent implements OnInit {

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  doctor = new Doc();
  specialities = ['Allgemeinarzt'];
  themes = [];

  constructor(public dialogRef: MatDialogRef<AddDoctorComponent>, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveDoc() {
    this.doctor.specialities = this.specialities;
    this.doctor.themes = this.themes;
    console.log('Doc ist', this.doctor);
    this.firestore
    .collection('docs')
    .add(this.doctor.toJSON());
    // .then((result: any) => {
    //   console.log('Adding user finished', result);
    // });
    this.dialogRef.close();
  
  }

  addToThemes() {
    this.themes.push(this.doctor.themes);
    this.doctor.themes = '';
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.specialities.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(spec): void {
    const index = this.specialities.indexOf(spec);

    if (index >= 0) {
      this.specialities.splice(index, 1);
    }
  }

}
