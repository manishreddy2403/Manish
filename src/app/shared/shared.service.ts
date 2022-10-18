import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  playerXName: string = "";
  playerOName: string = "";
  selectXAvatar = "";
  selectOAvatar = "";

  constructor() { }
  setData(nameX: any,nameO: any,X: any, O: any) {

    this.playerXName = nameX
    this.playerOName = nameO
    this.selectXAvatar = X;
    this.selectOAvatar = O;
  }

  getData() {
    return [ this.playerXName ,this.playerOName,this.selectXAvatar,this.selectOAvatar]
  }
 




}