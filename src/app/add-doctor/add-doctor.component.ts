import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Doc } from 'src/models/doc.class';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss']
})
export class AddDoctorComponent implements OnInit {

  doctor = new Doc();
  specialities = [];
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

  addToSpecialities() {
    this.specialities.push(this.doctor.specialities);
    this.doctor.specialities = '';
  }

  addToThemes() {
    this.themes.push(this.doctor.themes);
    this.doctor.themes = '';
  }

}
