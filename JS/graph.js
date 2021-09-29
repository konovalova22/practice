const tablPostRasx = [
  { field: "name", editable: true, resizable:true, headerName: 'Название', chartDataType: 'category' },
  { field: "summ", editable: true, resizable:true, headerName: 'Сумма (руб)', chartDataType: 'series' }
];
const tablRasx = [
  { field: "names", editable: true, resizable:true, headerName: 'Название', chartDataType: 'category' },
  { field: "summa", editable: true, resizable:true, headerName: 'Сумма (руб)', chartDataType: 'series' }
];
// specify the data
const rowDataPostRasx = [
  { name: "Квартира", summ: 15000},
  { name: "Интернет", summ: 1000},
  { name: "Коммунальные услуги", summ: 5000},
];
const rowDataRasx = [
  { names: "Такси ", summa: 10000},
  { names: "Кофточка ", summa: 3000},
  { names: "Роллы ", summa: 1500},
  { names: "Духи ", summa: 5000}
];
// let the grid know which columns and what data to use
const gridOptionsPostRasx = {
  columnDefs: tablPostRasx,
  rowData: rowDataPostRasx,
  onCellValueChanged: () => {
      setSumPostRasx();
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
      chartContainer: document.querySelector('#lineGraphPostRasx'),
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
const gridOptionsRasx = {
  columnDefs: tablRasx,
  rowData: rowDataRasx,
  onCellValueChanged: () => {
      setSumRasx();
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
      chartContainer: document.querySelector('#lineGraphRasx'),
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
let gridPostRasx;
let gridRasx;

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', () => {
    const gridDivPostRasx = document.querySelector('#tablPostRasx');
    gridPostRasx = new agGrid.Grid(gridDivPostRasx, gridOptionsPostRasx);
    setSumPostRasx();


    const gridDivRasx = document.querySelector('#tablRasx');
    gridRasx = new agGrid.Grid(gridDivRasx, gridOptionsRasx);
    setSumRasx();
    calcTotal();
});


function setSumPostRasx() {
  globalThis.sum = 0;

    gridPostRasx.gridOptions.api.forEachNode(node => {
      sum += +node.data.summ
    });
    //document.getElementById('sum').innerText = sum.toFixed(2);
}

function setSumRasx() {
  globalThis.sum2 = 0;
  gridRasx.gridOptions.api.forEachNode(node => {
    sum2 += +node.data.summa
  });
 // document.getElementById('summa').innerText = sum2.toFixed(2);
}
function onDeleteClickPostRasx(){
  const rows = gridPostRasx.gridOptions.api.getSelectedRows();
  gridPostRasx.gridOptions.api.applyTransaction({
    remove:rows
  });
  setSumPostRasx();
  calcTotal();
}

function onDeleteClickRasx(){
  const rows = gridRasx.gridOptions.api.getSelectedRows();
  gridRasx.gridOptions.api.applyTransaction({
    remove:rows
  });
  setSumRasx();
  calcTotal();
}

function calcTotal() {
  let res=document.getElementById('doxod').value;
  let tcel=document.getElementById('tcel').value;
  res -= sum + sum2 + +tcel;
  res/=31
  document.getElementById('result').innerText = res.toFixed(2); 
}

function onAddClickPostRasx(){
  gridPostRasx.gridOptions.api.applyTransaction({
    add: [{ name: "", summ: 0}]
  })
}

function onAddClickRasx(){
  gridRasx.gridOptions.api.applyTransaction({
    add: [{ names: "", summa: 0}]
  })
}

