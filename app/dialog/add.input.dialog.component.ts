import { Component } from '@angular/core';
import { Input } from '../app.component';
import { MatDialogRef } from '@angular/material/dialog';
import { NgControlStatusGroup } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker'

@Component({
  selector: 'app-root',
  templateUrl: './add.input.dialog.component.html',
  styleUrls: ['../app.component.css']
})
export class AddInputDialogComponent {
  input = new Input('',0,'','',new Date());

  types = [
    "Income","Expense"
  ];
  occurrences = [
    "One-Time", "Weekly", "Bi-Weekly", "Semi-Monthly", "Monthly"
  ];
  constructor(private dialogRef: MatDialogRef<AddInputDialogComponent>){}
  
  save() {
    this.dialogRef.close(this.input);
  }

  close() {
      this.dialogRef.close();
  }
}