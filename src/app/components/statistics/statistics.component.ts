import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as d3 from 'd3';
import { Issue } from '../../models/issue/issue';
import { BasicInfo } from '../../models/basic-info/basic-info';
import {stringify} from 'querystring';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})

export class StatisticsComponent implements OnInit, OnChanges {

  @Input() public issues: Issue[]; // Issues array
  @Input() public basicInfo: BasicInfo; // Repository basic info

  constructor() {}

  ngOnInit() {
    this.drawCharts();
  }

  ngOnChanges(changes: SimpleChanges): void {

    // If the Issues array changes, re-draws the charts
    if (changes.issues)  {
      this.drawCharts();
    }
  }

  drawCharts() {
    this.drawIssuesByCreationDate();
    this.drawIssuesByUpdateDate();
    this.drawOpenVsClosedIssues();
  }

  // Draws a bar plot showing the amount of issues created per month
  drawIssuesByCreationDate() {
    const containerId = '#issues-by-creation-date';
    const dateType = 'createdAt';
    const title = 'Amount of issues created per Month';

    // Clean chart area
    d3.selectAll(containerId + ' svg').remove();

    // Aggregates issues by date
    const issuesAggregated = this.aggregateIssuesByDate(dateType);
    // Sorts and takes the las 18 months
    const issuesList = this.sortAndSlice(issuesAggregated);
    this.formatDate(issuesList);
    // Formats the date so is more legible
    this.drawBarChart(containerId, issuesList, title, 'rgb(252, 141, 98)');
  }

  // Draws a bar plot showing the amount of issues updated per month
  drawIssuesByUpdateDate() {
    const containerId = '#issues-by-update-date';
    const dateType = 'updatedAt';
    const title = 'Amount of issues updated per Month';

    // Clean chart area
    d3.selectAll(containerId + ' svg').remove();

    // Aggregates issues by date
    const issuesAggregated = this.aggregateIssuesByDate(dateType);
    // Sorts and takes the las 18 months
    const issuesList = this.sortAndSlice(issuesAggregated);
    // Formats the date so is more legible
    this.formatDate(issuesList);

    this.drawBarChart(containerId, issuesList, title, 'rgb(225, 174, 39)');
  }

  // Draws a pie chart showing the amount of open issues against to the closed issues
  drawOpenVsClosedIssues() {
    const containerId = '#open-vs-closed-issues';
    const title = 'Open vs Closed issues';

    // Clean chart area
    d3.selectAll(containerId + ' svg').remove();

    // Builds teh slices of the pie for open and closed issues
    const openIssues = this.issues.filter((issue) => issue.state === 'open').length;
    const closedIssues = this.issues.filter((issue) => issue.state === 'closed').length;
    const slices = { open: openIssues, closed: closedIssues };

    this.drawPieChart(containerId, slices, title);
  }

  /*
    Aggregates the issues by date
    param dateType: string
      Type of date to aggregate by (could be createdAt or updatedAt)
    return: Object
      Object where the keys are the dates (months) where the issues were created/updated
      and the values are the number of issues thar were created/updated in that month
   */
  aggregateIssuesByDate(dateType) {
    const issuesAggregated = {};

    this.issues.forEach((issue) => {

      const date = issue[dateType];
      const month = date.getMonth();
      const year = date.getFullYear();
      const dateStr = (month + 1) + '/01/' + year;

      if (issuesAggregated.hasOwnProperty(dateStr)) {
        issuesAggregated[dateStr] += 1;
      } else {
        issuesAggregated[dateStr] = 1;
      }
    });

    return issuesAggregated;
  }

  /* Sorts and extracts only the last 18 months of data
    param issues: Object
      Object where the keys are the dates (months) where the issues were created/updated
      and the values are the number of issues thar were created/updated in that month
    return: Array
      An array of objects containing the date (key date) and the number of issues (key nIssues) created/updated in that date
   */
  sortAndSlice(issues) {

    let issuesList: { date: Date, nIssues: number }[] = [];

    // Creates an array of objects
    d3.keys(issues).forEach((dt) => {
      issuesList.push({ date: new Date(dt), nIssues: issues[dt] });
    });

    // Sort by date
    issuesList = issuesList.sort( (i1, i2) => (i1.date > i2.date) ? 1 : -1 );

    // Takes the last 18 months where an issue was created
    if (issuesList.length > 18) {
      issuesList = issuesList.slice((issuesList.length - 18), (issuesList.length));
    }

    return issuesList;

  }

  /*
    Formats the date of the issues to make it more readable
    param issues: Array
      An array of objects containing the date (key date) and the number of issues (key nIssues) created/updated in that date
    return: Array
      The modified array with the formatted date
   */
  formatDate(issues) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    issues.map((item) => {
      item.date = (months[item.date.getMonth()] + ' ' + item.date.getFullYear());
    });

    return issues;

  }

  /*
    Draws a bar chart using d3 js library
    param containerId: string
      HTML contained id where the chart is going to drawn
    param issues: Array
      An array of objects containing the date (key date) and the number of issues (key nIssues) created/updated in that date
    param title: string
      Title of the chart
    param fill: string
      RGB color to fill the chart
   */
  drawBarChart(containerId: string, issues: any[], title: string, fill: string) {

     // Domain labels (dates)
    const domain = issues.map(item => item.date);

    // Margins
    const margin = { top: 50, right: 30, bottom: 100, left: 40 };
    const width = 0.45 * window.innerWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    const maxHeight = Math.max.apply(Math, issues.map((item) => item.nIssues ));

    // SVG
    const svg = d3.select(containerId)
                .append('svg')
                  .attr('width', width)
                  .attr('height', height + margin.top + margin.bottom)
                .append('g')
                  .attr('transform',
                        'translate(' + margin.left + ',' + margin.top + ')');

    // Scale and draw:
    const x = d3.scaleBand()
              .domain(domain)
              .range([0, width - 80])
              .padding(0.15);

    // X axis
    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    // title
    svg.append('text')
        .attr('x', (width / 2))
        .attr('y', 0 - (margin.top / 2))
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .text(title);

    // Div for the tooltip
    const tooltip = d3.select('body').append('div')
                    .style('opacity', 0)
                    .style('position', 'absolute')
                    .style('background-color', 'black')
                    .style('color', 'white')
                    .style('border', 'solid')
                    .style('border-width', '1px')
                    .style('border-radius', '5px')
                    .style('padding', '10px');

    // Y axis
    const y = d3.scaleLinear()
              .domain([0, maxHeight])
              .range([ height, 0]);

    svg.append('g').call(d3.axisLeft(y));

    // Styling the coordinates bars
    svg.selectAll('.domain').style('color', 'lightgray');

    // Bars
    svg.selectAll('mybar')
      .data(issues)
      .enter()
      .append('rect')
        .attr('x', (d) => x(d.date))
        .attr('y', (d) => y(d.nIssues))
        .attr('width', x.bandwidth())
        .attr('height', (d) => height - y(d.nIssues))
        .attr('fill', fill)
        .on('mouseover', (d) => {
          tooltip.transition()
            .duration(200)
            .style('opacity', .7);
          tooltip.html(d.nIssues + ' issues')
            .style('left', (d3.event.pageX) + 'px')
            .style('top', (d3.event.pageY - 28) + 'px');
        })
        .on('mouseout', (d) => {
            tooltip.transition()
                .duration(500)
                .style('opacity', 0);
        });
  }

  /*
    Draws a pie chart using d3 js library
    param containerId: string
      HTML contained id where the chart is going to drawn
    param slices: Array
      An array of integers with the size of the partitions of the pie chart
    param title: string
      Title of the chart
   */
  drawPieChart(containerId: string, slices: any, title: string) {

    // Dimensions
    const width = 450;
    const height = 450;
    const margin = 40;

    // The radius of the pie chart is half the width or half the height (smallest one)
    const radius = Math.min(width, height) / 2 - margin;

    // Append the svg object to the div called containerId
    const svg = d3.select(containerId)
                  .append('svg')
                    .attr('width', width)
                    .attr('height', height)
                  .append('g')
                    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    // Sets the color scale
    const color = d3.scaleOrdinal()
                  .domain(slices)
                  .range(d3.schemeSet2);

    // Computes the position of each group on the pie
    const pie = d3.pie()
                  .value((d: any) => d.value );

    const dataReady = pie((d3.entries(slices) as any));

    // Builds arcs
    const arcGenerator = d3.arc()
                            .innerRadius(0)
                            .outerRadius(radius);

    // title
    svg.append('text')
        .attr('y', 0 - 200)
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .text(title);

    // Builds the pie chart
    svg
      .selectAll('mySlices')
      .data(dataReady)
      .enter()
      .append('path')
        .attr('d', (arcGenerator as any))
        .attr('fill', (d: any) => (color(d.data.key) as any))
        .attr('stroke', 'black')
        .style('stroke-width', '2px')
        .style('opacity', 0.7);

    // Annotations
    svg
      .selectAll('mySlices')
      .data(dataReady)
      .enter()
      .append('text')
      .text((d: any) => d.data.key)
      .attr('transform', (d: any) => 'translate(' + arcGenerator.centroid(d) + ')')
      .style('text-anchor', 'middle')
      .style('font-size', 17);
  }
}
