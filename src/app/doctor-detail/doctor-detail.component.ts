import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StartpageComponent } from '../startpage/startpage.component';

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.scss'],
  providers: [StartpageComponent]
})
export class DoctorDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private startpage: StartpageComponent) { }

  docId: number;
  allDocs = [];
  allInfos = this.startpage.allInfos;
  doc = {};
  infos = {};
  checkForArray = true;


  ngOnInit(): void {
      this.route.paramMap.subscribe(paraMap => {
        let idInString = paraMap.get('id');
        this.docId = Number(idInString);
        this.loadDocs();
    })
  }


  async loadDocs(){
    let response = await fetch('http://maximilian-budziat.developerakademie.net/doctor-database/get_doctors.php');
    this.allDocs = await response.json();
    this.checkForArray = Array.isArray(this.allDocs);
    this.getDoc();
  }


  getDoc(){
    this.doc = this.allDocs.find((doc) => doc.id == this.docId);
    console.log(this.doc);
    this.infos = this.allInfos[this.docId - 1];
    console.log(this.infos);
  }

}
