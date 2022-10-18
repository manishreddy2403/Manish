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
  flag = 1;




  constructor(private router: Router, private shared: SharedService) { }


  ngOnInit(): void {
    
    let data = this.shared.getData();
    this.playerXName = data[0]
    this.playerOName = data[1]
    this.selectOAvatar=data[3];
    this.selectXAvatar=data[2]

    this.playerName = this.playerXName;
    this.turnImage = this.imageX;

  }

  toClick(event: Event) {
    const b = (event.target as HTMLDivElement).id;

    if (this.flag == 1 && (document.getElementById(b) as HTMLDivElement).innerHTML == "") {
      this.playerName = this.playerOName;
      this.turnImage = this.imageO;
      (document.getElementById(b) as HTMLDivElement).innerHTML = "<img src='assets/img/imageX.png' width='80px' height='80px'>"
      this.flag = 0;
      this.xWin[b] = 1;
      this.draw += 1;
      this.check();

    }
    else if (this.flag == 0 && document.getElementById(b)?.innerHTML == "") {
      this.playerName = this.playerXName;
      this.turnImage = this.imageX;
      (document.getElementById(b) as HTMLDivElement).innerHTML = "<img src='assets/img/imageO.png' width='80px' height='80px'>";
      this.flag = 1;
      this.oWin[b] = 1;
      this.draw += 1;
      this.check();
    }

  }
  check() {

    for (var i = 0; i < this.winningCombination.length; i++) {
      if (this.xWin[this.winningCombination[i][0]] > -1 && this.xWin[this.winningCombination[i][1]] > -1 && this.xWin[this.winningCombination[i][2]]) {
        this.toGetStrike(i);
        (document.getElementById("titleWinner") as HTMLHeadingElement).innerHTML = this.playerXName + " " + "<span style=\"color:black\">" + "<br> You won the match";
        (document.getElementById("win-img-edit1") as HTMLDivElement).innerHTML = `<img src="assets/img/winningImage.gif" class="win-img-edit" alt="hgfhg" style="width:300px"> "`;
        setTimeout(this.openModal, 1000);
        this.playerXScore += 1;

        break;
      }
      if (this.oWin[this.winningCombination[i][0]] > -1 && this.oWin[this.winningCombination[i][1]] > -1 && this.oWin[this.winningCombination[i][2]]) {
        this.toGetStrike(i);
        (document.getElementById("titleWinner") as HTMLHeadingElement).innerHTML = this.playerOName + " " + "<span style=\"color:black\">" + "<br> You won the match";
        (document.getElementById("win-img-edit1") as HTMLDivElement).innerHTML = `<img src="assets/img/winningImage.gif" class="win-img-edit" alt="hgfhg" style="width:300px">`;
        setTimeout(this.openModal, 1000);
        this.playerOScore += 1;

        break;
      }
      if (this.draw == 9) {
        (document.getElementById("titleWinner") as HTMLHeadingElement).innerHTML = "It's Draw Match";
        (document.getElementById("win-img-edit1") as HTMLDivElement).innerHTML = `<img src="assets/img/draw.gif" class="win-img-edit" alt="hgfhg" style="width:300px">`;
        let wait = setTimeout(this.openModal, 1000);

      }
    }

  }


  openModal() {
    (document.getElementById("myModal") as HTMLDialogElement).showModal();
  }

  toGetStrike(i: number) {
    this.id = this.strikeClass[i];
    this.win = true;

  }

  playAgain() {

    this.id = " ";
    (document.getElementById('myModal') as HTMLDialogElement).close();
    document.querySelectorAll('.grid-cell').forEach(e => { e.innerHTML = '' });
    this.xWin = [];
    this.oWin = [];
    this.draw = 0;
    this.flag = 1;
    this.win = false
    this.playerName = this.playerXName;
    this.turnImage = this.imageX;

  }
}