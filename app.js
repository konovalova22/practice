const columnDefs = [
  { field: "name", editable: true, resizable:true, headerName: 'Название', chartDataType: 'category' },
  { field: "summ", editable: true, resizable:true, headerName: 'Сумма (руб)', chartDataType: 'series' }
];
const columnDefs2 = [
  { field: "names", editable: true, resizable:true, headerName: 'Название', chartDataType: 'category' },
  { field: "summa", editable: true, resizable:true, headerName: 'Сумма (руб)', chartDataType: 'series' }
];
// specify the data
const rowData = [
  { name: "Квартира", summ: 15000},
  { name: "Интернет", summ: 1000},
  { name: "Коммунальные услуги", summ: 5000},
];
const rowData2 = [
  { names: "Такси ", summa: 10000},
  { names: "Кофточка ", summa: 3000},
  { names: "Роллы ", summa: 1500},
  { names: "Духи ", summa: 5000}
];
// let the grid know which columns and what data to use
const gridOptions = {
  columnDefs: columnDefs,
  rowData: rowData,
  onCellValueChanged: () => {
      setSum();
      calcTotal();
  },
  rowSelection: 'single',
  enableCharts: true,
  onFirstDataRendered: (params) => {
    const createRangeChartParams = {
      cellRange: {
        columns: ['summ', 'name'],
      },
      chartType: 'line',
      chartContainer: document.querySelector('#myChart'),
      chartThemeOverrides: {
        common: {
          title: {
            enabled: true,
            text: 'Постоянные расходы',
          },
          legend: {
            enabled: false,
          },
        },
      },
    };
  
    params.api.createRangeChart(createRangeChartParams);
  }
};
const gridOptions2 = {
  columnDefs: columnDefs2,
  rowData: rowData2,
  onCellValueChanged: () => {
      setSum2();
      calcTotal();
  },
  rowSelection: 'single',
  enableCharts: true,
  onFirstDataRendered: (params) => {
    const createRangeChartParams = {
      cellRange: {
        columns: ['summa', 'names'],

      },
      chartType: 'line',
      chartContainer: document.querySelector('#myChart2'),
      chartThemeOverrides: {
        common: {
          title: {
            enabled: true,
            text: 'Расходы',
          },
          legend: {
            enabled: false,
          },
        },
      },
    };
  
    params.api.createRangeChart(createRangeChartParams);
  }
};
let grid;
let gridRight;

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', () => {
    const gridDiv = document.querySelector('#myGrid');
    grid = new agGrid.Grid(gridDiv, gridOptions);
    setSum();


    const gridDiv2 = document.querySelector('#myGrid2');
    gridRight = new agGrid.Grid(gridDiv2, gridOptions2);
    setSum2();
    calcTotal();

    /* agCharts.AgChart.create({
      data: rowData,
      container: document.querySelector('#myChart'),
      series: [{
          xKey: 'name',
          yKey: 'summ',
          yName: 'Постоянные расходы',
      }
    ],
      legend: {
        position: 'bottom',
    },    
    }); */

/*       agCharts.AgChart.create({
      data: rowData2,
      container: document.querySelector('#myChart2'),
      series: [{
          xKey: 'names',
          yKey: 'summa',
          yName: 'Расходы',
      }],
      legend: {
          position: 'bottom',
      },
      
    }); */
});


function setSum() {
  globalThis.sum = 0;

    grid.gridOptions.api.forEachNode(node => {
      sum += +node.data.summ
    });
    //document.getElementById('sum').innerText = sum.toFixed(2);
}

function setSum2() {
  globalThis.sum2 = 0;
  gridRight.gridOptions.api.forEachNode(node => {
    sum2 += +node.data.summa
  });
 // document.getElementById('summa').innerText = sum2.toFixed(2);
}
function onDeleteClick(){
  const rows = grid.gridOptions.api.getSelectedRows();
  grid.gridOptions.api.applyTransaction({
    remove:rows
  });
  setSum();
  calcTotal();
}

function onDeleteClick2(){
  const rows = gridRight.gridOptions.api.getSelectedRows();
  gridRight.gridOptions.api.applyTransaction({
    remove:rows
  });
  setSum2();
  calcTotal();
}

function calcTotal() {
  let res=document.getElementById('doxod').value;
  let tcel=document.getElementById('tcel').value;
  res -= sum + sum2 + +tcel;
  res/=31
  document.getElementById('result').innerText = res.toFixed(2); 
}

function onAddClick(){
  grid.gridOptions.api.applyTransaction({
    add: [{ name: "", summ: 0}]
  })
}

function onAddClick2(){
  gridRight.gridOptions.api.applyTransaction({
    add: [{ names: "", summa: 0}]
  })
}

