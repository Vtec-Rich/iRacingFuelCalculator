import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeComponent } from './time.component';
import { FormsModule } from '@angular/forms';

import { BrowserModule, By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('TimeComponent', () => {
  let component: TimeComponent;
  let fixture: ComponentFixture<TimeComponent>;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should call the CalculateFuel method', async(() => {
    fixture.detectChanges();
    spyOn(component, 'CalculateFuel');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.CalculateFuel).toHaveBeenCalledTimes(1);
  }));

  //lapAmount
  it('for a race of 60 mins, fuel usage of 0.5, lap time of 1:16.5 and a max tank of 17.8 race should be 48 laps', async(() => {

    const initialValue = component.lapAmount; //this will be 0;
    component.raceCalcForm.controls['raceTime'].setValue('60');
    component.raceCalcForm.controls['maxFuel'].setValue('17.8');
    component.raceCalcForm.controls['lapTime'].setValue('1:16.5');
    component.raceCalcForm.controls['fuelUsage'].setValue('0.5');

    let form = component.raceCalcForm;
    component.CalculateFuel(form);
    fixture.detectChanges();
    const newValue = component.lapAmount;
    expect(newValue).toBe(48);

  }));

  //tankLaps
  it('for a race of 60 mins, fuel usage of 0.5, lap time of 1:16.5 and a max tank of 17.8 tank should last 35.6', async(() => {

    const initialValue = component.tankLaps; //this will be 0;
    component.raceCalcForm.controls['raceTime'].setValue('60');
    component.raceCalcForm.controls['maxFuel'].setValue('17.8');
    component.raceCalcForm.controls['lapTime'].setValue('1:16.5');
    component.raceCalcForm.controls['fuelUsage'].setValue('0.5');

    let form = component.raceCalcForm;
    component.CalculateFuel(form);
    fixture.detectChanges();
    const newValue = component.tankLaps;
    expect(newValue).toBe('35.6');

  }));

  //fuelReq
  it('for a race of 60 mins, fuel usage of 0.5, lap time of 1:16.5 and a max tank of 17.8 fuel required is 24.0', async(() => {

    const initialValue = component.fuelReq; //this will be 0;
    component.raceCalcForm.controls['raceTime'].setValue('60');
    component.raceCalcForm.controls['maxFuel'].setValue('17.8');
    component.raceCalcForm.controls['lapTime'].setValue('1:16.5');
    component.raceCalcForm.controls['fuelUsage'].setValue('0.5');

    let form = component.raceCalcForm;
    component.CalculateFuel(form);
    fixture.detectChanges();
    const newValue = component.fuelReq;
    expect(newValue).toBe('24.0');

  }));

  //fullFuelStops
  it('for a race of 60 mins, fuel usage of 0.5, lap time of 1:16.5 and a max tank of 17.8 there will be 0 full fuel stops', async(() => {

    const initialValue = component.fullFuelStops; //this will be 0;
    component.raceCalcForm.controls['raceTime'].setValue('60');
    component.raceCalcForm.controls['maxFuel'].setValue('17.8');
    component.raceCalcForm.controls['lapTime'].setValue('1:16.5');
    component.raceCalcForm.controls['fuelUsage'].setValue('0.5');

    let form = component.raceCalcForm;
    component.CalculateFuel(form);
    fixture.detectChanges();
    const newValue = component.fullFuelStops;
    expect(newValue).toBe(0);

  }));

  //partialFuelStopAmount
  it('for a race of 60 mins, fuel usage of 0.5, lap time of 1:16.5 and a max tank of 17.8 there will be a pit stop for 6.2 units of fuel', async(() => {

    const initialValue = component.partialFuelStopAmount; //this will be 0;
    component.raceCalcForm.controls['raceTime'].setValue('60');
    component.raceCalcForm.controls['maxFuel'].setValue('17.8');
    component.raceCalcForm.controls['lapTime'].setValue('1:16.5');
    component.raceCalcForm.controls['fuelUsage'].setValue('0.5');

    let form = component.raceCalcForm;
    component.CalculateFuel(form);
    fixture.detectChanges();
    const newValue = component.partialFuelStopAmount;
    expect(newValue).toBe(6.2);

  }));

  it('form is not valid when unsubmitted' , async(() => {
    let valid = component.show;
    expect(valid).toBe(false);
  }));

  it('form is valid when all fields are correctly entered' , async(() => {

    component.raceCalcForm.controls['raceTime'].setValue('60');
    component.raceCalcForm.controls['maxFuel'].setValue('17.8');
    component.raceCalcForm.controls['lapTime'].setValue('1:16.5');
    component.raceCalcForm.controls['fuelUsage'].setValue('0.5');

    spyOn(component, 'CalculateFuel');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    fixture.detectChanges();
    let valid = component.show;
    expect(valid).toBe(true);

  }));


});
