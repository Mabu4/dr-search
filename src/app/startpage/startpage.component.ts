import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDoctorComponent } from '../add-doctor/add-doctor.component';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.scss']
})
export class StartpageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadDocs();
  }

  allDocs = [];

  allInfos = [
    {
      first: 'Allergologie',
      second: 'Akne',
      third: 'Photodynamische Therapie',
      rating: 45,
      type: 'Privatpraxis',
      note: '1,4'
    },
    {
      first: 'ambulande Operationen',
      second: 'Analyse des Blutbildes',
      third: 'Hautkrebs-Früherkennung',
      rating: 34,
      type: 'Freie Praxis',
      note: '2,4'
    },
    {
      first: 'Allergietest',
      second: 'Lasertherapie',
      third: 'Labormedizin',
      rating: 76,
      type: 'Privatpraxis',
      note: '1,7'
    },
    {
      first: 'Psoriasis',
      second: 'Laserbehandlung Gefäße',
      third: 'Haarbehandlung',
      rating: 103,
      type: 'Privatpraxis',
      note: '2,2'
    },
    {
      first: 'Venencheck',
      second: 'Hyaluronsäure',
      third: 'Verödung von Besenreisern',
      rating: 12,
      type: 'Freie Praxis',
      note: '2,3'
    },
  ];

  checkForArray = true;


  async loadDocs(){
      let response = await fetch('http://maximilian-budziat.developerakademie.net/doctor-database/get_doctors.php');
      this.allDocs = await response.json();
      this.checkForArray = Array.isArray(this.allDocs);
  }

  openDialog(): void{
  const dialogRef = this.dialog.open(AddDoctorComponent);
  }

}
