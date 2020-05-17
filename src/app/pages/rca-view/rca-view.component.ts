import { HttpClientModule } from '@angular/common/http';


import { Component, ViewChild, ElementRef, ViewEncapsulation, OnInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rca-view',
  templateUrl: './rca-view.component.html',
  styleUrls: ['./rca-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RcaViewComponent implements OnInit {
  title = 'ng-d3-graph-editor';
  code = `<svg width="300" height="300"><g class="nodes"><circle r="60" fill="red" cx="0" cy="0"></circle>
  <circle r="60" fill="red" cx="-7.373688780783198" cy="6.754902942615239">
  </circle><circle r="60" fill="red" cx="1.2363864559502138" cy="-14.087985964343622">
  </circle><circle r="60" fill="red" cx="10.538470205147267" cy="13.745568221620495"></circle><circle r="60" fill="red" cx="-19.694269706308575" cy="-3.4836390075862327"></circle><circle r="60" fill="red" cx="18.866941955758957" cy="-12.001604111035421"></circle><circle r="60" fill="red" cx="-6.358980820385529" cy="23.65509169134563"></circle><circle r="60" fill="red" cx="-12.194453649142762" cy="-23.479678451778437"></circle><circle r="60" fill="red" cx="26.568018333748896" cy="9.702597684001061"></circle><circle r="60" fill="red" cx="-27.730366684134143" cy="11.446692254248088"></circle><circle r="60" fill="red" cx="13.403187214918457" cy="-28.64183256151475"></circle></g><g class="links"><line stroke-width="3" x1="0" y1="0" x2="26.568018333748896" y2="9.702597684001061"></line><line stroke-width="3" x1="-7.373688780783198" y1="6.754902942615239" x2="26.568018333748896" y2="9.702597684001061"></line><line stroke-width="3" x1="1.2363864559502138" y1="-14.087985964343622" x2="26.568018333748896" y2="9.702597684001061"></line><line stroke-width="3" x1="10.538470205147267" y1="13.745568221620495" x2="26.568018333748896" y2="9.702597684001061"></line><line stroke-width="3" x1="-19.694269706308575" y1="-3.4836390075862327" x2="0" y2="0"></line><line stroke-width="3" x1="18.866941955758957" y1="-12.001604111035421" x2="-12.194453649142762" y2="-23.479678451778437"></line><line stroke-width="3" x1="18.866941955758957" y1="-12.001604111035421" x2="26.568018333748896" y2="9.702597684001061"></line><line stroke-width="3" x1="-6.358980820385529" y1="23.65509169134563" x2="-27.730366684134143" y2="11.446692254248088"></line><line stroke-width="3" x1="-12.194453649142762" y1="-23.479678451778437" x2="0" y2="0"></line><line stroke-width="3" x1="26.568018333748896" y1="9.702597684001061" x2="26.568018333748896" y2="9.702597684001061"></line></g></svg>`
  constructor(public activeModal: NgbActiveModal) {
  }
  ngOnInit() {
    let svg = d3.select("svg"),
      width = +svg.attr("width"),
      height = +svg.attr("height");
    let nodes_data = [
      { name: 'Ahmed Khurrum', relation: 'Base Node' },
      { name: 'Kareem Khurrum', relation: 'Brother' },
      { name: 'Sultan Khurrum', relation: 'Brother' },
      { name: 'Azhar Khurrum', relation: 'Brother' },
      { name: 'Faiz Ahmed ', relation: 'Son' },
      { name: 'Hina Khurrum', relation: 'Wife' },
      { name: 'Shugufta', relation: 'Mother' },
      { name: 'Alina', relation: 'Mother-in-Law' },
      { name: 'Khurrum Javed', relation: 'Father' },
      { name: 'Zaid', relation: 'father-in-Law' },
      { name: 'Sabiha', relation: 'Sister' }
    ];
    let simulation = (d3.forceSimulation() as any)
      .nodes(nodes_data);

    simulation
      .force("charge_force", d3.forceManyBody())
      .force("center_force", d3.forceCenter(width /2 , height /2));

    let node = svg.append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(nodes_data)
      .enter()
      .append("circle")
      .attr("r", 60)
      .attr("fill", "red");


    var links_data = [
        { source: nodes_data[0].name, target: nodes_data[8].name },
        { source: nodes_data[1].name, target: nodes_data[8].name },
        { source: nodes_data[2].name, target: nodes_data[8].name },
        { source: nodes_data[3].name, target: nodes_data[8].name },
        { source: nodes_data[4].name, target: nodes_data[0].name },
        { source: nodes_data[5].name, target: nodes_data[7].name },
        { source: nodes_data[5].name, target: nodes_data[8].name },
        { source: nodes_data[6].name, target: nodes_data[9].name },
        { source: nodes_data[7].name, target: nodes_data[0].name },
        { source: nodes_data[8].name, target: nodes_data[8].name }
    ]
    var link_force = (d3.forceLink(links_data) as any)
      .id(function (d) { return d.name; })

      simulation.force("links",link_force)

      var link = svg.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(links_data)
    .enter().append("line")
      .attr("stroke-width", 3);  

      simulation.on("tick", this.tickActions(node,link));
      console.log();
  }


  tickActions(node, link) {
    //update circle positions each tick of the simulation 
    node
      .attr("cx", function (d) { return d.x; })
      .attr("cy", function (d) { return d.y; });

    //update link positions 
    //simply tells one end of the line to follow one node around
    //and the other end of the line to follow the other node around
    link
      .attr("x1", function (d) { return d.source.x; })
      .attr("y1", function (d) { return d.source.y; })
      .attr("x2", function (d) { return d.target.x; })
      .attr("y2", function (d) { return d.target.y; });

  }
}