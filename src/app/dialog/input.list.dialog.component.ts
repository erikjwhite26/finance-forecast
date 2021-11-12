import { Component, Inject, OnInit } from '@angular/core';
import { Input } from '../app.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgControlStatusGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './input.list.dialog.component.html',
  styleUrls: ['../app.component.css']
})
export class InputListDialogComponent implements OnInit{
  inputs: Input[] = [];

  constructor(
    private dialogRef: MatDialogRef<InputListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: Input[]){
      console.log("Dialog output:", data)
      this.inputs = data;
  }

  ngOnInit(){
      
  }

  close() {
      this.dialogRef.close();
  }
}