import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from "ionic-angular";
import { AuthService } from "../../providers/auth-service";
import { Http } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { Headers } from '@angular/http';
import chartJs from 'chart.js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    //INICIO VARIABLES GRAFICOS
    @ViewChild('lineCanvas') lineCanvas;

    lineChart: any;
    //FIN VARIABLES GRAFICOS

  results: Array<any> = [];
  statics: Array<any> = [];
  years: Array<any> = [];

  ramo:any;

  constructor(
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public http: Http,
    public authService: AuthService
  ) {}
  
  
  ionViewDidLoad(){
  	this.getAsignaturas();
    this.getYears();
  }

  onChange(selecRamo) { 
    this.ramo = selecRamo;
  }

  getAsignaturas() {
  	let url = 'https://api.sebastian.cl/academia/api/v1/courses/subjects';
  
    let headers = new Headers();
	  headers.append('X-API-KEY', this.authService.apiKey);

	  return this.http.get(url, { headers: headers })
        .subscribe((data) => {
          //lleva datos objeto a un array ordenado
          this.results = JSON.parse(data['_body']);
        },
        err => {
          console.log("ERROR!: ", err);
        });
  }

  getYears() {
    let url = 'https://api.sebastian.cl/academia/api/v1/rankings/years';
  
    let headers = new Headers();
    headers.append('X-API-KEY', this.authService.apiKey);

    return this.http.get(url, { headers: headers })
        .subscribe((data) => {
          //lleva datos objeto a un array ordenado
          this.years = JSON.parse(data['_body']);
        },
        err => {
          console.log("ERROR!: ", err);
        });
  }

  getEstadist(code:string){
    let url = 'https://api.sebastian.cl/academia/api/v1/rankings/years/';
  
    let headers = new Headers();
    headers.append('X-API-KEY', this.authService.apiKey);

    return this.http.get(url+code, { headers: headers })
        .subscribe((data) => {
          //lleva datos objeto a un array ordenado
          this.statics = JSON.parse(data['_body']);
          console.log(this.statics);
        },
        err => {
          console.log("ERROR!: ", err);
        });

  }


  //=====================INI CODIGO GRAFICOS===========================

  ngAfterViewInit(){
    setTimeout(() => {
      this.lineChart = this.getLineChart();
    }, 150)
  }

  getChart(context, chartType, data, options?) {
    return new chartJs(context, {
      data,
      options,
      type: chartType
    })
  }

  getLineChart(){
    const data = {
      labels: ['2015', '2016', '2017', '2018'],
      datasets: [{
        label: 'Curso Actual',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgb(255, 0, 0)',
        borderColor: 'rgb(255, 0, 0)',
        borderCapStyle: 'butt',
        borderJoinStyle: 'miter',
        pointRadius: 1,
        pointHitRadius: 10,
        data:[57, 41, 47, 67],
        scanGaps: false,
      }, {
        label: 'Otros años',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgb(20, 0, 255)',
        borderColor: 'rgb(20, 0, 255)',
        borderCapStyle: 'butt',
        borderJoinStyle: 'miter',
        pointRadius: 1,
        pointHitRadius: 10,
        data:[49, 35, 23, 61],
        scanGaps: false,
      }
    ]
    }

    return this.getChart(this.lineCanvas.nativeElement, 'line', data)
  }


  //=====================FIN CODIGO GRAFICOS===========================

}
