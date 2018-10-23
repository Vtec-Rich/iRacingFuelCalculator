import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent implements OnInit {

  lapAmount: number;
  tankLaps: string;
  fuelReq: string;
  fullFuelStops: number;
  partialFuelStopAmount: number;
  show: boolean = false;

  raceCalcForm: FormGroup;
  raceTime: FormControl;
  maxFuel: FormControl;
  lapTime: FormControl;
  fuelUsage: FormControl;

  constructor() {
    this.lapAmount = 0;
  }

  ngOnInit() { 
    this.raceTime = new FormControl('raceTime');
    this.maxFuel = new FormControl('maxFuel');
    this.lapTime = new FormControl('lapTime');
    this.fuelUsage = new FormControl('fuelUsage');

    this.raceCalcForm = new FormGroup({
      raceTime: this.raceTime,
      maxFuel: this.maxFuel,
      lapTime: this.lapTime,
      fuelUsage: this.fuelUsage
    });
  }

  CalculateFuel(form){

    console.log(this.show);

    console.log(form);

    // var declarations
    let raceSeconds = form.value.raceTime * 60;
    let splitted = form.value.lapTime.split(":"); 
    let lapSeconds = +splitted[0] * 60;
    let totalSeconds = lapSeconds + +splitted[1];
    let remainder: number;
    let pitStopAmount: number;
    let partialPitStop: number;
    let fuelReqNR: number;
    let tankLapsNR: number;

    /********
    * No of laps in race
    ********/
	  this.lapAmount = raceSeconds / totalSeconds;
    this.lapAmount = Math.ceil(this.lapAmount);

	  /********
    * how many laps 1 tank will get you
    ********/
    tankLapsNR = form.value.maxFuel / form.value.fuelUsage;
    this.tankLaps = tankLapsNR.toFixed(1);

    /********
    * fuel required
    ********/
    fuelReqNR = Math.ceil(this.lapAmount) * form.value.fuelUsage;
    this.fuelReq = fuelReqNR.toFixed(1);

    /********
    * pit stops
    ********/
    pitStopAmount = Math.ceil(this.lapAmount) / tankLapsNR;
    remainder = pitStopAmount - Math.floor(pitStopAmount);
    partialPitStop = remainder / 1 * 100;
    partialPitStop = partialPitStop / 100 * form.value.maxFuel;
    partialPitStop = Math.round(partialPitStop * 100) / 100;

    this.fullFuelStops = Math.floor(pitStopAmount) - 1;

    this.partialFuelStopAmount = partialPitStop;

    form.reset();
  }

}
