import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { AddDoctorComponent } from '../add-doctor/add-doctor.component';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.scss']
})
export class StartpageComponent implements OnInit {

  constructor(public dialog: MatDialog, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.loadDocs();
  }


  docs: any = [];


  async loadDocs(){
    this.firestore
    .collection('docs')
    .valueChanges({idField: 'customIdName'})
    .subscribe((changes: any) => {
      // console.log(changes);
      this.docs = changes;
      console.log(this.docs.customIdName)
    })
  }

  openDialog(): void{
  const dialogRef = this.dialog.open(AddDoctorComponent);
  }

}
