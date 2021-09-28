const columnDefs = [
  { field: "name", editable: true, resizable:true, headerName: 'Название' },
  { field: "summ", editable: true, resizable:true, headerName: 'Сумма (руб)' }
];
const columnDefs2 = [
  { field: "names", editable: true, resizable:true, headerName: 'Название' },
  { field: "summa", editable: true, resizable:true, headerName: 'Сумма (руб)'}
];
// specify the data
const rowData = [
  { name: "Квартира", summ: 15000},
  { name: "Квартира2", summ: 10000},
  { name: "Квартира3", summ: 1000},
  { name: "Квартира4", summ: 5000},
];
const rowData2 = [
  { names: "Такси ", summa: 3000}
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
  
};
const gridOptions2 = {
  columnDefs: columnDefs2,
  rowData: rowData2,
  onCellValueChanged: () => {
      setSum2();
      calcTotal();
  },
  rowSelection: 'single',
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

    agCharts.AgChart.create({
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
    });

      agCharts.AgChart.create({
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
      
    });
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

/* var options = {
  container: document.querySelector('#myGrid'),
  data: rowData,
  title: {
      text: 'Beverage Expenses'
  },
  subtitle: {
      text: 'per quarter'
  },
  padding: {
      top: 40,
      right: 40,
      bottom: 40,
      left: 40
  },
  series: [{
      type: 'column',
      xKey: 'name',
      yKeys: ['summ']
  }],
  legend: {
      spacing: 40
  }
};

agCharts.AgChart.create(options); */
