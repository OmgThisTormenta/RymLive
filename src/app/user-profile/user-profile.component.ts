import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  settingsAppear: boolean;
  oldValues: String;
  newValues: string;
  imgRute: string;
  imgRuteActually: string;
  imageDefault: string;
  imageActually: string;

  showTableHeader: boolean;
  totalRowsSongs: number;

  test: any;

  user: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUser("5fce7127c91df933046b0d8a").subscribe(
      res => { 
        this.user = res.user;
        this.oldValues = this.user.description;
        if(this.user.image == null){
          this.user.image = "../../assets/img/account_circle-24px.svg"
        }
      },
      error => {
        console.log(error);
      }
      );


    this.imgRute = "../../assets/img/";
    this.imgRuteActually = this.imgRute;
    this.imageDefault = "account_circle-24px.svg";
    this.imageActually = this.imageDefault;

    this.settingsAppear = false;
    this.showTableHeader = false;

  }

  inSettings(){
    this.settingsAppear = true;
    console.log("In settings");
  }

  saveChanges(){
    //Change Biography
    this.newValues = (document.getElementById('biography-input') as HTMLInputElement).value;
    this.oldValues = this.newValues;

    //Change Image
    const input = <HTMLInputElement>document.getElementById('customFile');
    if(input.files && input.files[0]){
      console.log("File selected : ", input.files[0]);
      this.imageActually =  input.files[0].name;
      //this.imgRuteActually = (document.getElementById("customFile") as HTMLInputElement).value;

    }else 
      console.log("No file selected " + input.files[0]);

    this.settingsAppear = false;
    console.log("Settings disappear");
  }

  loadTable(){
    this.showTableHeader = true;

    this.getSongs();
  }
  
  getSongs(){
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', '../../assets/json/mySongTable.json', true);
    xhttp.send();
    xhttp.onreadystatechange = function(){

      if(this.readyState == 4 && this.status == 200){
        let datos = JSON.parse(this.responseText);
        let res = document.querySelector('#tableBody');
        res.innerHTML='';
        
        for(let item of datos){
          res.innerHTML += `
          <tr>
            <th scope="row">${item.id}</th>
            <td>${item.soungName}</td>
            <td>${item.autor}</td>
            <td>${item.time}</td>
            <td><div id="musicPlayer-icon"><button type="button" class="btn btn-outline-dark btn-sm">Play</button></div></td>
          </tr>
          `
        }
      }
    }
  }

  hazmeunaprueba(){
    console.log("funciona");
  }
}