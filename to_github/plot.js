const data_plot = [
  {shape: "Line",   parent: "Group 1", id: "Trump",   x: 1999, y: 127},
  {shape: "Line",   parent: "Group 2", id: "Clinton",   x: 1999, y: 2146},
  {shape: "Line",   parent: "Group 3", id: "Sanders",   x: 1999, y: 82},

  {shape: "Line",   parent: "Group 1", id: "Trump",   x: 2000, y: 149},
  {shape: "Line",   parent: "Group 2", id: "Clinton",   x: 2000, y: 1944},
  {shape: "Line",   parent: "Group 3", id: "Sanders",   x: 2000, y: 107},

  {shape: "Line",   parent: "Group 1", id: "Trump",   x: 2001, y: 139},
  {shape: "Line",   parent: "Group 2", id: "Clinton",   x: 2001, y: 1399},
  {shape: "Line",   parent: "Group 3", id: "Sanders",   x: 2001, y: 129},

  {shape: "Line",   parent: "Group 1", id: "Trump",   x: 2002, y: 183},
  {shape: "Line",   parent: "Group 2", id: "Clinton",   x: 2002, y: 1139},
  {shape: "Line",   parent: "Group 3", id: "Sanders",   x: 2002, y: 126},

  {shape: "Line",   parent: "Group 1", id: "Trump",   x: 2003, y: 210},
  {shape: "Line",   parent: "Group 2", id: "Clinton",   x: 2003, y: 1009},
  {shape: "Line",   parent: "Group 3", id: "Sanders",   x: 2003, y: 139},

  {shape: "Line",   parent: "Group 1", id: "Trump",   x: 2004, y: 269},
  {shape: "Line",   parent: "Group 2", id: "Clinton",   x: 2004, y: 1283},
  {shape: "Line",   parent: "Group 3", id: "Sanders",   x: 2004, y: 146},

  {shape: "Line",   parent: "Group 1", id: "Trump",   x: 2005, y: 351},
  {shape: "Line",   parent: "Group 2", id: "Clinton",   x: 2005, y: 942},
  {shape: "Line",   parent: "Group 3", id: "Sanders",   x: 2005, y: 165},

  {shape: "Line",   parent: "Group 1", id: "Trump",   x: 2006, y: 315},
  {shape: "Line",   parent: "Group 2", id: "Clinton",   x: 2006, y: 1167},
  {shape: "Line",   parent: "Group 3", id: "Sanders",   x: 2006, y: 178},

  {shape: "Line",   parent: "Group 1", id: "Trump",   x: 2007, y: 429},
  {shape: "Line",   parent: "Group 2", id: "Clinton",   x: 2007, y: 1743},
  {shape: "Line",   parent: "Group 3", id: "Sanders",   x: 2007, y: 302},

  {shape: "Line",   parent: "Group 1", id: "Trump",   x: 2008, y: 440},
  {shape: "Line",   parent: "Group 2", id: "Clinton",   x: 2008, y: 3935},
  {shape: "Line",   parent: "Group 3", id: "Sanders",   x: 2008, y: 240},

  {shape: "Line",   parent: "Group 1", id: "Trump",   x: 2009, y: 327},
  {shape: "Line",   parent: "Group 2", id: "Clinton",   x: 2009, y: 1623},
  {shape: "Line",   parent: "Group 3", id: "Sanders",   x: 2009, y: 173},

  {shape: "Line",   parent: "Group 1", id: "Trump",   x: 2010, y: 373},
  {shape: "Line",   parent: "Group 2", id: "Clinton",   x: 2010, y: 1492},
  {shape: "Line",   parent: "Group 3", id: "Sanders",   x: 2010, y: 169},

  {shape: "Line",   parent: "Group 1", id: "Trump",   x: 2011, y: 461},
  {shape: "Line",   parent: "Group 2", id: "Clinton",   x: 2011, y: 1339},
  {shape: "Line",   parent: "Group 3", id: "Sanders",   x: 2011, y: 166},

  {shape: "Line",   parent: "Group 1", id: "Trump",   x: 2012, y: 484},
  {shape: "Line",   parent: "Group 2", id: "Clinton",   x: 2012, y: 1451},
  {shape: "Line",   parent: "Group 3", id: "Sanders",   x: 2012, y: 207},

  {shape: "Line",   parent: "Group 1", id: "Trump",   x: 2013, y: 417},
  {shape: "Line",   parent: "Group 2", id: "Clinton",   x: 2013, y: 1062},
  {shape: "Line",   parent: "Group 3", id: "Sanders",   x: 2013, y: 186},

  {shape: "Line",   parent: "Group 1", id: "Trump",   x: 2014, y: 420},
  {shape: "Line",   parent: "Group 2", id: "Clinton",   x: 2014, y: 899},
  {shape: "Line",   parent: "Group 3", id: "Sanders",   x: 2014, y: 209},

  {shape: "Line",   parent: "Group 1", id: "Trump",   x: 2015, y: 1858},
  {shape: "Line",   parent: "Group 2", id: "Clinton",   x: 2015, y: 2020},
  {shape: "Line",   parent: "Group 3", id: "Sanders",   x: 2015, y: 806},

  {shape: "Line",   parent: "Group 1", id: "Trump",   x: 2016, y: 9512},
  {shape: "Line",   parent: "Group 2", id: "Clinton",   x: 2016, y: 5477},
  {shape: "Line",   parent: "Group 3", id: "Sanders",   x: 2016, y: 2538},

  {shape: "Line",   parent: "Group 1", id: "Trump",   x: 2017, y: 11458},
  {shape: "Line",   parent: "Group 2", id: "Clinton",   x: 2017, y: 1840},
  {shape: "Line",   parent: "Group 3", id: "Sanders",   x: 2017, y: 873},
];

let plot = new d3plus.Plot()
  .select("#svg_map")
  .data(data_plot)
  .discrete("x")
  .groupBy(["parent", "id"])
  .shape(d => d.shape)
  .title("Candidate Mentions by Year")
  .render();

plot.shapeConfig({
  Line: {
    strokeWidth: 2.5
  }
});

plot.yConfig({
  title: "Number Mentions"
});

plot.xConfig({
  title: "Year"
})

plot.render();
