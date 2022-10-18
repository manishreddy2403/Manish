import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})
export class IndexPageComponent implements OnInit {
  [x: string]: any;

  selectXAvatar = " ";
  selectOAvatar = " ";
  playerXName = " ";
  playerOName = " ";


  constructor(private router: Router, private shared: SharedService) { }

  ngOnInit(): void {

  }

  sendplayerData() {
    this.shared.setData(this.playerXName,this.playerOName,this.selectXAvatar, this.selectOAvatar);
 

  }
  goToPage() {

    this.router.navigate([`/GamePage`]);
  }
  saveData() {
    if (this.playerXName !== " " && this.playerOName !== " ") {
      this.goToPage()
    } else {
      alert("Enter values")
    }

  }


}


