import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Doc } from 'src/models/doc.class';
import { EditDoctorComponent } from '../edit-doctor/edit-doctor.component';

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.scss'],
})

export class DoctorDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) { }

  docId = '';
  doc: any = [];
  isLoaded = false;

  
  ngOnInit(): void {
      this.route.paramMap.subscribe(paraMap => {
        this.docId = paraMap.get('id');
        //  = Number(idInString);
        this.loadDoc();
    })
  }


  async loadDoc(){
    this.firestore
    .collection('docs')
    .doc(this.docId)
    .valueChanges()
    .subscribe((doc: any) => {
      this.doc = new Doc(doc);
      // 'console.log(this.doc);'
    })
    this.isLoaded = true;
  }


  openSettings(): void {
    const dialog = this.dialog.open(EditDoctorComponent);
    dialog.componentInstance.doctor = new Doc(this.doc.toJSON());
    dialog.componentInstance.docId = this.docId;

  }


}
