import { HtmlTagDefinition } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {
  id = '';
  playerName = '';
  turnImage = '';
  playerXName: string = "";
  playerOName: string = "";
  selectXAvatar = "";
  selectOAvatar = "";
  imageX = "assets/img/imageX.png";
  imageO = "assets/img/imageO.png";
  win = false;
  playerXScore = 0;
  playerOScore = 0;
  xWin: any = [];
  oWin: any = [];
  draw = 0;

  winningCombination = [
    ['0', '1', '2'],
    ['3', '4', '5'],
    ['6', '7', '8'],
    ['0', '3', '6'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['0', '4', '8'],
    ['2', '4', '6']
  ];
  strikeClass = ["strike-row-1", "strike-row-2", "strike-row-3", "strike-col-1", "strike-col-2", "strike-col-3", "strike-dal-1", "strike-dal-2"];
  flag = true;




  constructor(private router: Router, private shared: SharedService) { }


  ngOnInit(): void {

    let data = this.shared.getData();
    this.playerXName = data[0]
    this.playerOName = data[1]
    this.selectOAvatar = data[3];
    this.selectXAvatar = data[2]
    this.playerName = this.playerXName;
    this.turnImage = this.imageX;

  }

  toClick(event: Event) {
    const divID = (event.target as HTMLDivElement).id;

    if (this.flag == true && (document.getElementById(divID) as HTMLDivElement).innerHTML == "") {
      this.playerName = this.playerOName;
      this.turnImage = this.imageO;
      (document.getElementById(divID) as HTMLDivElement).innerHTML = "<img src='assets/img/imageX.png' width='80px' height='80px'>"
      this.xWin[divID] = 1;
      this.toget(this.flag)


    }
    else if (this.flag == false && document.getElementById(divID)?.innerHTML == "") {
      this.playerName = this.playerXName;
      this.turnImage = this.imageX;
      (document.getElementById(divID) as HTMLDivElement).innerHTML = "<img src='assets/img/imageO.png' width='80px' height='80px'>";
      this.oWin[divID] = 1;
      this.toget(this.flag)

    }

  }
  check() {
    for (var i = 0; i < this.winningCombination.length; i++) {

      if (this.xWin[this.winningCombination[i][0]] > -1 && this.xWin[this.winningCombination[i][1]] > -1 && this.xWin[this.winningCombination[i][2]]) {
        this.toGetStrike(i);
        this.playerName = this.playerXName
        this.openModal()
        this.playerXScore += 1;

        break;
      }
      if (this.oWin[this.winningCombination[i][0]] > -1 && this.oWin[this.winningCombination[i][1]] > -1 && this.oWin[this.winningCombination[i][2]]) {
        this.toGetStrike(i);
        this.playerName = this.playerOName
        this.openModal()
        this.playerOScore += 1;

        break;
      }
      if (this.draw == 9) {
        this.openModal()
      }
    }

  }


  openModal() {
    setTimeout(() => {
      (document.getElementById("myModal") as HTMLDialogElement).showModal();
    }, 1000);
  }

  toGetStrike(i: number) {
    this.id = this.strikeClass[i];
    this.win = true;

  }
  toget(flag: any,) {
    this.flag = !flag;
    this.draw += 1;
    this.check();

  }

  playAgain() {

    this.id = " ";
    (document.getElementById('myModal') as HTMLDialogElement).close();
    document.querySelectorAll('.grid-cell').forEach(e => { e.innerHTML = '' });
    this.xWin = [];
    this.oWin = [];
    this.draw = 0;
    this.flag = true;
    this.win = false
    this.playerName = this.playerXName;
    this.turnImage = this.imageX;

  }
}
