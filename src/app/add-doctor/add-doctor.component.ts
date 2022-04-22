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
  themes = ['Darmkrebsvorsorge'];
  times = ['07:00', '07:15', '07:30', '07:45', '08:00', '08:15', '08:30', '08:45', '09:00', '09:15', '09:30', 
  '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45', 
  '13:00', '13:15', '13:30', '13:45', '14:00', '14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45',
  '16:00', '16:15', '16:30', '16:45', '17:00', '17:15', '17:30', '17:45', '18:00', '18:15', '18:30', '18:45', '19:00',
  '19:15', '19:30', '19:45', '20:00'];
  notes = ['1,0', '1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0', '2,1', '2,2', '2,3',
  '2,4', '2,5', '2,6', '2,7', '2,8', '2,9', '3,0', '3,1', '3,2', '3,3', '3,4', '3,5', '3,6', '3,7', '3,8', '3,9',
  '4,0', '4,1', '4,2', '4,3', '4,4', '4,5', '4,6', '4,7', '4,8', '4,9', '5,0', '5,1', '5,2', '5,3', '5,4', '5,5',
  '5,6', '5,7', '5,8', , '5,9', '6,0']


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

  addSecond(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.themes.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }


  removeSecond(theme): void {
    const index = this.themes.indexOf(theme);

    if (index >= 0) {
      this.themes.splice(index, 1);
    }
  }

}
