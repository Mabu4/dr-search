import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.scss']
})
export class EditDoctorComponent implements OnInit {

  constructor(private route: Router, public dialogRef: MatDialogRef<EditDoctorComponent>, private firestore: AngularFirestore) { }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  doctor: any;
  docId = '';
  times = ['07:00', '07:15', '07:30', '07:45', '08:00', '08:15', '08:30', '08:45', '09:00', '09:15', '09:30', 
  '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45', 
  '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45',
  '16:00', '16:15', '16:30', '16:45', '17:00', '17:15', '17:30', '17:45', '18:00', '18:15', '18:30', '18:45', '19:00',
  '19:15', '19:30', '19:45', '20:00'];
  notes = ['1,0', '1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0', '2,1', '2,2', '2,3',
  '2,4', '2,5', '2,6', '2,7', '2,8', '2,9', '3,0', '3,1', '3,2', '3,3', '3,4', '3,5', '3,6', '3,7', '3,8', '3,9',
  '4,0', '4,1', '4,2', '4,3', '4,4', '4,5', '4,6', '4,7', '4,8', '4,9', '5,0', '5,1', '5,2', '5,3', '5,4', '5,5',
  '5,6', '5,7', '5,8', , '5,9', '6,0']

  ngOnInit(): void {
  }

  onNoClick(){
    this.dialogRef.close();
  }

  saveDoc(){
    this.firestore
    .collection('docs')
    .doc(this.docId)
    .update(this.doctor.toJSON())
    .then(() => {
      this.dialogRef.close();
    });
  }

  deleteDoc() {
    this.firestore
    .collection('docs')
    .doc(this.docId)
    .delete()
    .then(() => {
      this.dialogRef.close();
      this.route.navigate(['/']);
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our fruit
    if (value) {
      this.doctor.specialities.push(value);
    }
    // Clear the input value
    event.chipInput!.clear();
  }


  remove(spec): void {
    const index = this.doctor.specialities.indexOf(spec);
    if (index >= 0) {
      this.doctor.specialities.splice(index, 1);
    }
  }


  addSecond(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our fruit
    if (value) {
      this.doctor.themes.push(value);
    }
    // Clear the input value
    event.chipInput!.clear();
  }


  removeSecond(theme): void {
    const index = this.doctor.themes.indexOf(theme);
    if (index >= 0) {
      this.doctor.themes.splice(index, 1);
    }
  }

}
