const ctx = document.getElementById('myChart'); 
let myChart;
let jsonData;

fetch("dados.json")
.then(function(response) {
    if(response.ok) {
        return response.json()
    }   
})

.then (function(data) {
    console.log(data)
    jsonData = data;
    createChart(data, 'bar')
})


function setChartType(chartType) {
    myChart.destroy()
    createChart(jsonData, chartType)

}

function createChart(data, type) {
    
    myChart = new Chart(ctx, {
    type: type,
    data: {
      labels: data.map(row => row["Unidade Territorial"]),
      datasets: [{
        label: '# Habitantes',
        data: data.map(row => row.Habitantes),
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })
}