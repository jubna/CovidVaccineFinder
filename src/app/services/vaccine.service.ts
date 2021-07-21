import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { RootObjectStates } from '../home/models/statesModel';
import { RootObjectDistrict } from '../home/models/districtModel';
import {RootObjectSession} from '../home/models/sessionModel';
import { RootObjectWeekSlot } from '../home/models/slotDateRangeModel';

const URL = "https://cdn-api.co-vin.in/api";

const URL_FINDBYDISTRICT = "/v2/appointment/sessions/public/findByDistrict";


@Injectable({
  providedIn: 'root'
})
export class VaccineService {
  baseURl:string = "https://cdn-api.co-vin.in/api"

   URL_FINDBYDISTRICT_FINAL = URL + URL_FINDBYDISTRICT;
  

  constructor(private http: HttpClient) { }
  

  //States Metadata
  getStates():Observable<HttpResponse<RootObjectStates>>{
    return this.http.get<RootObjectStates>(`${this.baseURl}/v2/admin/location/states`,{observe:'response'});
  }


  //Districts Metadata
  getDistricts(state_id:number):Observable<HttpResponse<RootObjectDistrict>>
  {
    return this.http.get<RootObjectDistrict>(`${this.baseURl}/v2/admin/location/districts/${state_id}`,{observe:'response'});
  }
 

  //Vaccination Session by District
  getSessionByDistrict(district_id:number,date:String):Observable<HttpResponse<RootObjectSession>>
  {

    return this.http.get<RootObjectSession>(this.URL_FINDBYDISTRICT_FINAL + "?district_id=" + district_id + "&date=" + date, {observe:'response'});
  }

  




}
