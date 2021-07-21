import { Component, OnInit } from '@angular/core';
import {VaccineService} from '../services/vaccine.service';
import { District, RootObjectDistrict } from './models/districtModel';
import { RootObjectSession,Session } from './models/sessionModel';
import { RootObjectStates, State } from './models/statesModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchByDistrict:boolean | undefined;
  showSearchedRecordsByDistrict:boolean | undefined;

  //object for storing result of API
  allStates: RootObjectStates | undefined |null;
  myStateArray: State[]=[];
  allDistricts : RootObjectDistrict | undefined |null;
  myDistrictsArray : District[]=[];
  allSessions:RootObjectSession | undefined |null;
  mySessionArray: Session[]=[];

  allSessions2:RootObjectSession | undefined |null;
  mySessionArray2: Session[]=[];

  //Storing count of district , state and session for looping
  districtCount : number | undefined;
  stateCount:number | undefined;
  sessionCount:number | undefined;



  state_id:number | undefined;
  district_id:number | undefined ;

  //used to store pincode for API
  pincode:number | undefined;

  //Varibles for finding today Date
  today:Date | undefined;
  date:number | undefined;
  month:number | undefined;
  year:number | undefined;
  finalDate:string | undefined;


  vaccine = ["COVAXIN","COVISHIELD","SPUTNIK V"]
  ageGroup = [18,45];
  vaccineType:string | undefined;
  ageLimit:number | undefined;
  constructor(private vaccineService:VaccineService) { }

  ngOnInit(): void {
    this.searchByDistrict = true;
    this.showSearchedRecordsByDistrict=false;

    this.today = new Date();
    //console.log(this.today)
    this.date = this.today.getDate();
    this.month = this.today.getMonth()+1;
    this.year = this.today.getFullYear();
    this.finalDate = this.date + '-' + this.month +'-' +this.year;
    this.vaccineType = "COVAXIN";
    this.ageLimit = 18;
    //console.log(this.finalDate);
    this.getStates();
  }

  getStates():void
  {
    this.vaccineService.getStates()
      .subscribe(response => {this.allStates = response.body
      this.stateCount = this.allStates!.states.length;
        for(var i=0;i<this.stateCount;i++)
        {
          this.myStateArray[i] = this.allStates!.states[i];
        }
      });
  }
  //Show Search By District Input Form
    showFindByDistrictForm()
    {
      this.searchByDistrict = true;
    }

    onSelectState(event:any){
      this.mySessionArray=[];
      this.state_id = event.target.value;
      this.vaccineService.getDistricts(this.state_id!)
        .subscribe(response => {this.allDistricts = response.body
        this.districtCount  = this.allDistricts!.districts.length;
        for(var i=0;i<this.districtCount;i++)
        {
            this.myDistrictsArray[i] = this.allDistricts!.districts[i];
        }
        });
    }

    onSelectDistrictFindSlot(event:any){
     
      this.mySessionArray=[];
      this.mySessionArray2=[];
        this.district_id = event.target.value;
        this.vaccineService.getSessionByDistrict(this.district_id!,this.finalDate!)
          .subscribe(response=> {
            this.allSessions = response.body
            this.sessionCount = this.allSessions!.sessions.length;
            for(var i=0;i<this.sessionCount;i++)
            {
              this.mySessionArray[i] = this.allSessions!.sessions[i];
            }
            if(this.sessionCount>0)
            {
              this.showSearchedRecordsByDistrict = true;
            
            }
            //console.log(this.mySessionArray);
          });
    }

    onAgeGroupSelected(event:any){
      
    this.ageLimit = event.target.value;
    }

    onVaccineSelected(event:any){
      this.vaccineType = event.target.value;
    }
}
