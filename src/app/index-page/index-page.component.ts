import { STRING_TYPE } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})
export class IndexPageComponent implements OnInit {
  // [x: string]: any;
  arr: number[][] = [[], []]
  avatarClass = '';
  selectXAvatar = '';
  selectOAvatar = '';
  // names=[" "," "];
  // playerXName="";
  // playerOName="";
  // images=["assets\img\imageX.png",]

  names = [{ image: "assets/img/imageX.png", name: "playerX", value: "" },
  { image: "assets/img/imageO.png", name: "playerO", value: "" }
  ];


  select(event: Event, row: number, col: number) {
    this.avatarClass = 'avaXSelected';

    const id = (event.target as HTMLDivElement).id;

  }
  constructor(private router: Router, private shared: SharedService) { }

  ngOnInit(): void {


  }
  sendplayerData() {
    this.shared.setData(this.names[0].value, this.names[1].value, this.selectXAvatar, this.selectOAvatar);
  }
  goToPage() {
    this.router.navigate([`/GamePage`]);
  }
  saveData() {
    if (this.names[1].value !== " " && this.names[0].value !== " ") {
      this.goToPage()
    } else {
      alert("Enter values")
    }

  }


}


