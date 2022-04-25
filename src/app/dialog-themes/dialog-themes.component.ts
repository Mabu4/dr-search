import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Doc } from 'src/models/doc.class';

@Component({
  selector: 'app-dialog-themes',
  templateUrl: './dialog-themes.component.html',
  styleUrls: ['./dialog-themes.component.scss']
})
export class DialogThemesComponent implements OnInit {

  doctor: any;

  constructor(public dialogRef: MatDialogRef<DialogThemesComponent>) { }

  ngOnInit(): void {
    console.log(this.doctor);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
