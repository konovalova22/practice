const columnDefs = [
  { field: "name", editable: true },
  { field: "summ", editable: true }
];
const columnDefs2 = [
  { field: "names", editable: true },
  { field: "summa", editable: true }
];
// specify the data
const rowData = [
  { name: " internet", summ: 1000},
  { name: " internet", summ: 1000}
/*     { make: "Ford", model: "Mondeo", price: 32000 },
  { make: "Porsche", model: "Boxter", price: 72000 } */
];
const rowData2 = [
  { names: " internet", summa: 1000},
  { names: " internet", summa: 1000}
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
