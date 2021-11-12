import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { Input, Balance } from '../app.component';

@Injectable({
  providedIn: 'root',
})
export class InputService {

  constructor() { }

  inputs: Input[] = [];

  addInput(i: Input): Input[] {
    var input = new Input(i.name,i.amount,i.type,i.occurrence,i.date);
    this.inputs.push(input);
    if(input.occurrence=='Weekly'){
        var date = new Date(i.date.getTime());
        date = new Date(date.setDate(date.getDate()+7));
        var input2 = new Input(i.name,i.amount,i.type,i.occurrence,date);
        this.inputs.push(input2);
    } else if(input.occurrence=='Bi-Weekly'){
        var date = new Date(i.date.getTime());
        date = new Date(date.setDate(date.getDate()+14));
        var input2 = new Input(i.name,i.amount,i.type,i.occurrence,date);
        this.inputs.push(input2);
    } else if(input.occurrence=='Semi-Monthly'){

    } else if(input.occurrence=='Monthly'){
        var date = new Date(i.date.getTime());
        date = new Date(date.setMonth(date.getMonth()+1));
        var input2 = new Input(i.name,i.amount,i.type,i.occurrence,date);
        this.inputs.push(input2);
    }
    return this.inputs;
  }

  calculateBalanceList(balance: number): Balance[]{
    var balanceList: Balance[] = [];
    var date = new Date();
    date.setDate(date.getDate()-1);
    //start the cards on a Sunday for formatting
    while(date.getDay()!=6){
      date.setDate(date.getDate()-1);
    }
    //28 iterations for 4 week forecast
    for (let i = 0; i < 28; i++) {
        var b = new Balance();
        b.date = new Date(date.setDate(date.getDate()+1));
        b.amount = balance;
        for(let input of this.inputs){
            var date1 = formatDate(b.date,'yyyy-MM-dd','en_US');
            var date2 = formatDate(input.date,'yyyy-MM-dd','en_US');
            if(date1==date2){
                if(input.type=='Income'){
                    balance = +balance + +input.amount;
                    var amount = balance;
                    b.amount = amount;
                } else{
                    balance = +balance - +input.amount;
                    var amount = balance;
                    b.amount = amount;
                }
            }
        }
        balanceList.push(b);
    }
    return balanceList;
  }

}