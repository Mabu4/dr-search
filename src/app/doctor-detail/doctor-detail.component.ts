import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.scss'],
})
export class DoctorDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore) { }

  docId: number;
  doc: any = [];
  isLoaded = false;

  ngOnInit(): void {
      this.route.paramMap.subscribe(paraMap => {
        let idInString = paraMap.get('id');
        this.docId = Number(idInString);
        this.loadDoc();
    })
  }


  async loadDoc(){
    this.firestore
    .collection('docs')
    .valueChanges()
    .subscribe((changes: any) => {
      this.doc = changes[this.docId];
      console.log(this.doc);
    })
    this.isLoaded = true;
  }

}
