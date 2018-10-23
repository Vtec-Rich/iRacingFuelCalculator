import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-lap',
  templateUrl: './lap.component.html',
  styleUrls: ['./lap.component.scss']
})
export class LapComponent implements OnInit {

  lapAmount: number;
  fuelReq: string;
  fullFuelStops: number;
  partialFuelStopAmount: number;
  tankLaps: string;
  show: boolean = false;

  raceCalcForm: FormGroup;
  raceLaps: FormControl;
  maxFuel: FormControl;
  lapTime: FormControl;
  fuelUsage: FormControl;

  constructor() { }

  ngOnInit() { 
    this.raceLaps = new FormControl('raceLaps');
    this.maxFuel = new FormControl('maxFuel');
    this.lapTime = new FormControl('lapTime');
    this.fuelUsage = new FormControl('fuelUsage');

    this.raceCalcForm = new FormGroup({
      raceLaps: this.raceLaps,
      maxFuel: this.maxFuel,
      lapTime: this.lapTime,
      fuelUsage: this.fuelUsage
    });
  }

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
    tankLapsNR = form.value.maxFuel / form.value.fuelUsage;
    this.tankLaps = tankLapsNR.toFixed(1);

    /********
    * pit stops
    ********/
    this.lapAmount = form.value.raceLaps;

    pitStopAmount = this.lapAmount / tankLapsNR;
    remainder = pitStopAmount - Math.floor(pitStopAmount);
    partialPitStop = remainder / 1 * 100;
    partialPitStop = partialPitStop / 100 * form.value.maxFuel;
    partialPitStop = Math.round(partialPitStop * 100) / 100;

    this.fullFuelStops = Math.floor(pitStopAmount) - 1;

    this.partialFuelStopAmount = partialPitStop;

    form.reset();
  }

}
