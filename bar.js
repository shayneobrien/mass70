var data_bar = [
  // total values
  {id: "'Good'", x: "Trump", y: 11872/27937},
  {id: "'Bad'", x:"Trump", y: 5825/27937},

  {id: "'Good'", x: "Clinton", y: 13067/34141},
  {id: "'Bad'", x:"Clinton", y: 5801/34141},
  //
  {id: "'Good'", x: "Sanders", y: 3120/6944},
  {id: "'Bad'", x:"Sanders", y: 1479/6944},

];

let bar = new d3plus.BarChart()
  .select("#svg_bubble")
  .data(data_bar)
  .stacked(true)
  .xConfig({title: "Candidate"})
  .yConfig({domain: [0.00, 1.00], labels: [0.00, 0.20, 0.40, 0.60, 0.80, 1.00], title: "Percent of All Mentions"})
  .title("Good/Bad Mentions as Percentage of Total Articles")
  .render();

// var bar = d3plus.viz()
//   .container("#svg_bubble")
//   .data(data_bar)
//   .stacked(true)
//   .xConfig({title: "Candidate"})
//   .yConfig({domain: [0.00, 1.00], labels: [0.00, 0.20, 0.40, 0.60, 0.80, 1.00], title: "Percent of All Mentions"})
//   .title("Good/Bad Mentions as Percentage of Total Articles")
//   .render();
