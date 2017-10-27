// Find the min and max year, then give the
// full range of years between them.
function computeYears (rawData) {
  var allYearsSet = d3.set();
  rawData.forEach(function (d) {
    d.values.forEach(function (d) {
      allYearsSet.add(d.key);
    });
  });
  var yearsExtent = d3.extent(allYearsSet
    .values()
    .map(function (yearStr) {
      return +yearStr;
    }));
  return d3
    .range(yearsExtent[0], yearsExtent[1] + 1)
    .map(function (year) {
      return new Date(year + "");
    });
}

var bisectDate = d3.bisector(function (d) {
  return d.date;
}).left;

function getInterpolatedValue (values, date, value){
  const i = bisectDate(values, date, 0, values.length - 1);
  if (i > 0) {
    const a = values[i - 1];
    const b = values[i];
    const t = (date - a.date) / (b.date - a.date);
    return value(a) * (1 - t) + value(b) * t;
  }
  return value(values[i]);
}

// Interpolate values, create data structure
// for d3.stack.
function interpolateValues (years, rawData) {
  var value = function (d) {
    return d.value;
  };
  return years.map(function (date) {

    // Create a new row object with the date.
    var row = {
      date: date
    };

    // Assign values to the new row object for each key.
    // Value for `key` here will be country name.
    rawData.forEach(function (d){
      row[d.key] = getInterpolatedValue(d.values, date, value);
    });

    return row;
  });
}

// Render StreamGraph
function renderStreamGraph(data, keys) {
  stack.keys(keys);
  var stacked = stack(data);

  var innerWidth = width - margin.right - margin.left;
  var innerHeight = height - margin.top - margin.bottom;

  xScale
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth]);

  yScale
    .domain([
      d3.min(stacked, function (series) {
        return d3.min(series, function (d) { return d[0]; });
      }),
      d3.max(stacked, function (series) {
        return d3.max(series, function (d) { return d[1]; });
      })
    ])
    .range([innerHeight, 0]);

  colorScale.domain(d3.range(keys.length));

  var paths = marksG.selectAll('path').data(stacked);
  var pathsEnter = paths
    .enter().append('path');
  pathsEnter.merge(paths)
      .attr('fill', function (d) { return colorScale(d.index); })
      .attr('stroke', function (d) { return colorScale(d.index); })
      .attr('d', area);

  paths.select('title')
    .merge(pathsEnter.append('title'))
      .text(function (d) { return d.key; })

  var labels = marksG.selectAll('text').data(stacked)
  labels
    .enter().append('text')
      .attr('class', 'area-label')
    .merge(labels)
      .text(function (d) { return d.key; })
      .attr('transform', d3.areaLabel(area).interpolateResolution(1000));

  xAxisMajor.tickSize(-innerHeight);
  xAxisMinor.tickSize(-innerHeight);

  xAxisG.attr('transform', `translate(0,${innerHeight})`);
  xAxisMajorG.call(xAxisMajor);
  xAxisMinorG.call(xAxisMinor);
}


d3.csv('clinton.csv', function (rawData) {

  var yearKeys = d3.range(1999, 2018);

  // convert years to numbers after reading from CSV
  rawData.forEach(function (d) {
    yearKeys.forEach(function (year) {
      d[year] = +d[year];
    });
  });

  // // transpose the data so that each object is by year not by term
  var dataByYear = yearKeys.map(function (year) {
    const yearData = { year: year };
    rawData.forEach(function (d) {
      yearData[d.key] = d[year];
    });
    return yearData;
  });

  // console.log('clinton raw data', rawData);
  // console.log('by year', dataByYear);
  const keys = Object.keys(dataByYear[0]).filter(function (key) { return key !== 'year'});
  // console.log(keys)
  renderStreamGraph(dataByYear, keys);
})
// JSON LOADING in
// d3.json('sumByCountryByYear.json', function (rawData) {
//
//   // Parse dates, extract keys.
//   var keys = rawData
//     .filter(function (d) {
//       var sum = d3.sum(d.values, function (d){ return d.value; });
//       return sum > 1000000;
//     })
//     .map(function (d) {
//       d.values.forEach(function (d) {
//         d.date = new Date(d.key);
//       });
//       return d.key;
//     });
//
//   // Compute interpolated values for all years.
//   var data = interpolateValues(computeYears(rawData), rawData);
//   console.log(data);
//   console.log(keys)
//   render(data, keys);
// });

// var streamGraphFN = (function() {
  var margin = { top: 0, bottom: 30, left: 0, right: 30 };

  var svg = d3.select('#streamgraph');
  var width = +svg.attr('width');
  var height = +svg.attr('height');

  var g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
  var xAxisG = g.append('g')
      .attr('class', 'axis');
  var xAxisMinorG = xAxisG.append('g')
      .attr('class', 'axis axis--minor');
  var xAxisMajorG = xAxisG.append('g')
      .attr('class', 'axis axis--major');
  var marksG = g.append('g');

  var stack = d3.stack()
    .offset(d3.stackOffsetWiggle)
    .order(d3.stackOrderAscending)
  ;
  var xValue = function (d) { return d.year; };
  var xScale = d3.scaleLinear();
  var yScale = d3.scaleLinear();
  var colorScale = d3.scaleOrdinal()
    .range(['#3f007d', '#54278f', '#6a51a3', '#807dba', '#9e9ac8', '#bcbddc', '#dadaeb', '#efedf5', '#fcfbf',
              ]);

  var xAxisMajor = d3.axisBottom().scale(xScale).tickFormat(d => d);
  var xAxisMinor = d3.axisBottom().scale(xScale).ticks(50)

  var area = d3.area()
    .x(d => xScale(xValue(d.data)))
    .y0(d => yScale(d[0]))
    .y1(d => yScale(d[1]))
    .curve(d3.curveBasis);


// })()
