import { Component, OnInit } from '@angular/core';
import { InputService } from './service/input-service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NgControlStatusGroup } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker'
import { AddInputDialogComponent } from './dialog/add.input.dialog.component';
import { InputListDialogComponent } from './dialog/input.list.dialog.component';

export class Input{
  constructor(
    public name: string,
    public amount: number,
    public type: string,
    public occurrence: string,
    public date: Date
  ){}
}

export class Balance{
  constructor(
    public amount?: number,
    public date?: Date
  ){}
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'financeforecast';
  inputService = new InputService();
  balance: number = 0;
  input = new Input('',0,'','',new Date());
  inputs: Input[] = [];
  balanceList: Balance[] = [];
  
  constructor(public dialog: MatDialog) {}

  types = [
    "Income","Expense"
  ];
  occurrences = [
    "One-Time", "Weekly", "Bi-Weekly", "Semi-Monthly", "Monthly"
  ];
  days = [
    "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"
  ]

  onBalanceChange(): void {
    this.balanceList = this.inputService.calculateBalanceList(this.balance);
  }

  onInputSubmit(): void {
    this.inputs = this.inputService.addInput(this.input);
    this.balanceList = this.inputService.calculateBalanceList(this.balance);
  }

  ngOnInit(): void {
    this.balanceList = this.inputService.calculateBalanceList(this.balance);
  }

  // Dialog handling

  addInput() {
    let dialogRef = this.dialog.open(AddInputDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
        // Note: If the user clicks outside the dialog or presses the escape key, there'll be no result
        if (result !== undefined) {
            this.inputs = this.inputService.addInput(result);
            this.balanceList = this.inputService.calculateBalanceList(this.balance);
        }
    });
  }

  inputList(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.inputs;
    let dialogRef = this.dialog.open(InputListDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {});
  }
}