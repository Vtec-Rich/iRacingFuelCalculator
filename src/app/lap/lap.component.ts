import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lap',
  templateUrl: './lap.component.html',
  styleUrls: ['./lap.component.scss']
})
export class LapComponent implements OnInit {

  fuelReq: string;
  fullFuelStops: number;
  partialFuelStopAmount: number;
  tankLaps: string;
  show: boolean;

  constructor() { }

  ngOnInit() { }

    CalculateFuel(form){

    let remainder: number;
    let pitStopAmount: number;
    let partialPitStop: number;
    let tankLapsNR: number;
    let fuelReqNR: number;

    /********
    * fuel required
    ********/
    fuelReqNR = form.value.raceLaps * form.value.fuelUsage;
    this.fuelReq = fuelReqNR.toFixed(1);

	/********
    * how many laps 1 tank will get you
    ********/
    tankLapsNR = Math.round(form.value.maxFuel / form.value.fuelUsage);
    this.tankLaps = tankLapsNR.toFixed(1);

    /********
    * pit stops
    ********/
    pitStopAmount = form.value.raceLaps / tankLapsNR;
    remainder = pitStopAmount - Math.floor(pitStopAmount);

    partialPitStop = remainder / 1 * 100;
    partialPitStop = partialPitStop / 100 * form.value.maxFuel;
    partialPitStop = Math.round(partialPitStop * 100) / 100;

    this.fullFuelStops = Math.floor(pitStopAmount);
    this.partialFuelStopAmount = partialPitStop;

    form.reset();
  }

}
