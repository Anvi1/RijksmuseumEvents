import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import { BackButtonService } from '../back-button.service';


@Component({
  selector: 'app-chart-view',
  templateUrl: './chart-view.component.html',
  styleUrls: ['./chart-view.component.css']
})
export class ChartViewComponent implements OnInit {

  events ;
  eventDate;
  noData = false;
  lastDate;
  eventsData = [];
  title = '#Events Scheduled for next Month';
  dateVal;
  initDate;
  endDate;
  weekArr = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    private margin = {top: 20, right: 20, bottom: 30, left: 50};
    private width: number;
    private height: number;
    private x: any;
    private y: any;
    private svg: any;
    private line: d3Shape.Line<[number, number]>; 
    
  constructor(
    public apiService: ApiService,
    public back: BackButtonService
  ) { 
    this.width = 400 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

  private initSvg() {
    this.svg = d3.select('svg')
        .append('g')
        .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')')
        .attr("viewBox", `0 0 400 500`)
        
}

private initAxis() {
    this.x = d3Scale.scaleLinear().domain([0,7]).range([0, this.width]);
    this.y = d3Scale.scaleLinear().range([this.height, 0]);
    this.x.domain(d3Array.extent(this.eventsData, (d) => d.date));
    this.y.domain(d3Array.extent(this.eventsData, (d) => d.value ));
}

private drawAxis() {

    this.svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + this.height + ')')
        .call(d3Axis.axisBottom(this.x))
        
        

    this.svg.append('g')
        .attr('class', 'axis axis--y')
        .call(d3Axis.axisLeft(this.y))
        
}

private drawLine() {
    this.line = d3.line()
        .x( (d: any) => this.x(d.date) )
        .y( (d: any) => this.y(d.value) )
        .curve(d3.curveMonotoneX);
    
    this.svg.append('path')
        .datum(this.eventsData)
        .style("fill","none")
        .attr('class', 'line')
        .attr('d', this.line)
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", 4)

    this.svg.selectAll(".dot")
        .data(this.eventsData)
      .enter().append("circle") // Uses the enter().append() method
        .attr("class", "dot") // Assign a class for styling
        .attr("cx", (d: any) => this.x(d.date) )
        .attr("cy", (d: any) => this.y(d.value))
        .attr("r", 5);   
}

  calLastDate(dateVar){
		dateVar = new Date(dateVar);
		dateVar = dateVar.setDate(dateVar.getDate() + 6); 
		return new Date(dateVar);
  }  




apiCall(dateVal){
  this.lastDate = this.calLastDate(dateVal);
  this.dateVal = {
      "weekDay" : this.weekArr[dateVal.getDay()],
      "month" : this.monthArr[dateVal.getMonth()],
      "startDateVal" : dateVal.getDate(),
      "lastDateVal" : this.lastDate.getDate(),
      "sDate" : dateVal,
      "lDate" : this.lastDate
  }
  
  this.apiService.getMultipleData(dateVal,this.lastDate).subscribe((data: any[])=>{  
    this.eventsData = []; 
    this.events = data;
    this.noData = (this.events.length == 0) ? true : false;
    for(var i=0;i<this.events.length;i++){
      var eventDataObj = {};
      if(this.events[i].options){
        eventDataObj["date"] = new Date(this.events[i].options[0].date).getDate();
        eventDataObj["value"] = this.events[i].options.length;
      }
      else{
        eventDataObj["date"] = new Date(this.events[i]).getDate();
        eventDataObj["value"] = 0;
      }
      this.eventsData.push(eventDataObj);
    }
        this.initSvg();
        this.initAxis();
        this.drawAxis();
        this.drawLine();
    
}) 
}



  ngOnInit(): void {
    this.back.show();
    var date = new Date();
    this.eventDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    this.initDate = this.eventDate;
    this.endDate = new Date(date.getFullYear(), date.getMonth() + 1, 28);
    this.apiCall(this.eventDate); 
    
  }

  
  

  nextWeek(selectedDate){ 
    selectedDate = new Date(selectedDate);
    selectedDate = selectedDate.setDate(selectedDate.getDate() + 1);  
    this.eventDate =  new Date(selectedDate);
    d3.selectAll("svg > *").remove();
    this.apiCall(this.eventDate);
  }  
  
  prevWeek(selectedDate){ 
    selectedDate = new Date(selectedDate);
    selectedDate = selectedDate.setDate(selectedDate.getDate() - 7);  
    this.eventDate =  new Date(selectedDate);
    d3.selectAll("svg > *").remove();
    this.apiCall(this.eventDate);
  } 

}
