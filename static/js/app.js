//data link
let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


function makeBarChart(sample_filter) {
    d3.json(url).then((data) => {
        console.log(data);
        let samples1 = data.samples;
        console.log("samples: ->", samples1);
        let sampleArray1 = samples1.filter(value => value.id == sample_filter)
        console.log("filtered! ->", sampleArray1);
        let data_result = sampleArray1[0]
        console.log("finally!! ->", data_result);
        

        let otu_ids = data_result.otu_ids;
        let otu_labels = data_result.otu_labels;
        let sample_values = data_result.sample_values.slice(0,10);

        sample_values.sort(function compareFunction(firstNum, secondNum) {
            return secondNum - firstNum;
        }).reverse();

        let barChartData = [
            {
                y: otu_ids,
                x: sample_values,
                text: otu_labels,
                type: "bar",
                orientation: 'h'
            }
        ];

        let layout = {
            title: 'Top 10 OTUs Found',
            xaxis: {
                title: 'OTU Values'
            },
            yaxis: { 
                type: 'category',
                title: 'OTU IDs',
                showtickprefix: 'all',
                tickprefix: "OTU "
            }
         };

        Plotly.newPlot("bar", barChartData, layout);

    });
}


function makeBubbleChart(sample_filter) {
    d3.json(url).then((data) => {
        console.log(data);
        let samples1 = data.samples;
        console.log("samples: ->", samples1);
        let sampleArray1 = samples1.filter(value => value.id == sample_filter)
        console.log("filtered! ->", sampleArray1);
        let data_result = sampleArray1[0]
        console.log("finally!! ->", data_result);
        

        let otu_ids = data_result.otu_ids;
        let otu_labels = data_result.otu_labels;
        let sample_values = data_result.sample_values;


        let bubbleChartData = [
            {
                x: (otu_ids),
                y: sample_values,
                text: otu_labels,
                mode: 'markers',
                marker: {
                    size:sample_values,
                    color: otu_ids,
                    colorscale: 'Earth'

                }
            }
        ];

        let layout = {
            title: 'All OTUs',
            xaxis: {
                title: 'OTU IDs'
            },
            yaxis: { 
                title: 'OTU Values'
            }
         };

        Plotly.newPlot("bubble", bubbleChartData, layout);

    });

}

// function makeGauge(sample_filter) {
//     d3.json(url).then((data) => {
//         console.log(data);
//         let samples1 = data.samples;
//         console.log("samples: ->", samples1);
//         let sampleArray1 = samples1.filter(value => value.id == sample_filter)
//         console.log("filtered! ->", sampleArray1);
//         let data_result = sampleArray1[0]
//         console.log("finally!! ->", data_result);
        

//         let otu_ids = data_result.otu_ids;
//         let otu_labels = data_result.otu_labels;
//         let sample_values = data_result.sample_values;

//         var data = [
//             {
//                 domain: { x: [0, 1], y: [0, 1] },
//                 value: 270,
//                 title: { text: "Speed" },
//                 type: "indicator",
//                 mode: "gauge+number"
//             }
//         ];
        
//         var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
//         Plotly.newPlot('myDiv', data, layout);
//     });
// }

function display(sample_filter) {
    d3.json(url).then((data) => {
        console.log(data);
        let people = data.metadata;
        let demo_filtered = people.filter(value => value.id == sample_filter)
        console.log("people", people);
        console.log("people2", demo_filtered)
        let demo= Object.entries(demo_filtered[0])
        d3.selectAll('p').remove()
        d3.select('#sample-metadata').selectAll('p').data(demo).enter().append('p').text(d => {
            return `${d[0]}: ${d[1]}`})

    });
}



function main() {
    let user_selection = d3.select("#selDataset");

    d3.json(url).then((data) => {
        let dropdown_list = data.names;

        for (let i=0; i < dropdown_list.length; i++) {
            user_selection
            .append("option")
            .text(dropdown_list[i])
            .property("value", dropdown_list[i]);
        };

        let defaultValue = dropdown_list[0];

        makeBarChart(defaultValue)
        makeBubbleChart(defaultValue)
        display(defaultValue);
    });
}


function optionChanged(newInput) {
    makeBarChart(newInput)
    makeBubbleChart(newInput)
    display(newInput);
}

main();

