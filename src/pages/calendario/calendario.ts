import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CalendarioFormPage } from "../calendario-form/calendario-form";
import * as moment from 'moment';
import { CalendarioProvider } from "../../providers/calendario/calendario";
import { Calendario } from "../../models/calendario";
import { LoginProvider } from "../../providers/login/login";

@Component({
  selector: 'page-calendario',
  templateUrl: 'calendario.html',
})
export class CalendarioPage {

  eventSource;
    viewTitle;
    isToday: boolean;
    calendar = {
        mode: 'month',
        currentDate: new Date()
    }; // these are the variable used by the calendar.

    listaCalendario:Array<Calendario>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public ngZone: NgZone, public calendarioProvider:CalendarioProvider, public loginProvider:LoginProvider) {
        this.listaCalendario = new Array<Calendario>();
        this.loadEvents();
        
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarioPage')
    this.loadEvents();
  }

  loadEvents() {
    this.eventSource = new Array();
    this.eventSource = this.createRandomEvents();
  }
    onViewTitleChanged(title) {
        this.viewTitle = title;
    }
    onEventSelected(event) {
        console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    }
    changeMode(mode) {
        this.calendar.mode = mode;
    }
    today() {
        this.calendar.currentDate = new Date();
    }
    onTimeSelected(ev) {
        console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
            (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    }
    onCurrentDateChanged(event:Date) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();
    }
   
    createRandomEvents() {
        var events = [];

        this.calendarioProvider.getReference().on("value", (snapshot) =>{
            this.listaCalendario = new Array<Calendario>();
            this.ngZone.run(() => { 
               snapshot.forEach((calendario =>{
                   calendario.forEach((calendarioUsuario)=>{
                       if(calendarioUsuario.key == this.loginProvider.currentUser.uid){
                            var calendar:Calendario = calendarioUsuario.val();
                            var dataInicio:Date = moment(calendar.dataInicio, "YYYY-MM-DD").toDate();
                            var dataFim:Date = moment(calendar.dataFim, "YYYY-MM-DD").toDate();
                            var horaInicio:Date = moment(calendar.horaInicio, "hh:mm").toDate();
                            dataInicio.setHours(horaInicio.getHours(), horaInicio.getMinutes());
                            var horaFim:Date = moment(calendar.horaFim, "hh:mm").toDate();
                            dataFim.setHours(horaFim.getHours(), horaFim.getMinutes());
                            events.push({
                                title: calendar.titulo,
                                startTime: dataInicio,
                                endTime: dataFim,
                                allDay: false
                            });
                       }
                   });
                }));
            });
        });
        return events;

    
        


        /*for (var i = 0; i < 50; i += 1) {
            var date = new Date();
            var eventType = Math.floor(Math.random() * 2);
            var startDay = Math.floor(Math.random() * 90) - 45;
            var endDay = Math.floor(Math.random() * 2) + startDay;
            var startTime;
            var endTime;
            if (eventType === 0) {
                startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
                if (endDay === startDay) {
                    endDay += 1;
                }
                endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
                events.push({
                    title: 'All Day - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: true
                });
            } else {
                var startMinute = Math.floor(Math.random() * 24 * 60);
                var endMinute = Math.floor(Math.random() * 180) + startMinute;
                startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
                endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
                events.push({
                    title: 'Event - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: false
                });
            }
        }*/
    }
    onRangeChanged(ev) {
        console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
    }
    markDisabled = (date:Date) => {
        var current = new Date();
        current.setHours(0, 0, 0);
        return date < current;
    };

    adicionarEvento(){
      this.navCtrl.push(CalendarioFormPage);
    }

}
