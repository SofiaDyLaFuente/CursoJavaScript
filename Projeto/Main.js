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
      labels: 
      data.map(row => row["Unidade Territorial"]),

      datasets: [
        {
        label: '# Habitantes',
        data: data.map(row => row["Habitantes"]),
        borderWidth: 1,
        yAxisID: 'y'
      },
      {
        label: '# Renda per capita',
        data: data.map(row => row["Renda per Capita R$"]),
        borderWidth: 1,
        yAxisID: 'y1'

      }, 
    ]},
    options: {
      responsive: true,
      maintainerAspectRatio: false,
      plugins: {
        colors: {
        forceOverride: true,
        }
      },
      
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          title: {
            display: true,
            text: 'Habitantes'
          },
          beginAtZero: true
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          max:12000,
          grid: {
            drawOnChartArea: false, // Não mostra grid do eixo direito
          },
          title: {
            display: true,
            text: 'Renda (R$)'
          },
          beginAtZero: true
        }
      }
    }
  });
}


const footerData = {
  footerItems: [
    {
      name: "Nome da marca",
      url: "https://www.google.com",
      alt_text: "Texto alternativo",
      image: "https://pdad.homol.ipe.df.gov.br/files/images/logo-ipedf.svg"
    },
    {
      name: "Nome da marca",
      url: "https://www.google.com",
      alt_text: "Texto alternativo",
      image: "https://pdad.homol.ipe.df.gov.br/files/images/logo-secretaria-e-gdf.svg"
    }
  ],
  credits: "Desenvolvido pela Gerência de Inovação COGEI/UCTIS"
};

// Função para renderizar o footer
function renderFooter() {
  const footer = document.getElementById('ipe-footer');
  
  // Cria a seção de logos
  const logosContainer = document.createElement('div');
  logosContainer.className = 'footer-logos';

  footerData.footerItems.forEach(item => {
    const logoLink = document.createElement('a');
    logoLink.href = item.url;
    logoLink.target = '_blank'; // Abre em nova aba

    const logoImg = document.createElement('img');
    logoImg.src = item.image;
    logoImg.alt = item.alt_text;

    logoLink.appendChild(logoImg);
    logosContainer.appendChild(logoLink);
  });

  // Cria os créditos
  const credits = document.createElement('p');
  credits.className = 'footer-credits';
  credits.textContent = footerData.credits;

  // Adiciona tudo ao footer
  footer.appendChild(logosContainer);
  footer.appendChild(credits);
}

// Executa quando a página carregar
document.addEventListener('DOMContentLoaded', renderFooter);