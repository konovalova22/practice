const columnDefs = [
    { field: "income", editable: true },//доход
    { field: "consumption", editable: true },//расход
    { field: "goal", editable: true },//цель
    { field: "spending", editable: true }//траты( сколько потратил за сегодня)
  ];
  
  // specify the data
  const rowData = [
    { income: 30000, consumption: 1000, goal: 10000, spending: 0},
/*     { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 } */
  ];
  
  // let the grid know which columns and what data to use
  const gridOptions = {
    columnDefs: columnDefs,
    rowData: rowData,
    onCellValueChanged: () => {
        setSum();
    }
  };

  let grid;
  
  // setup the grid after the page has finished loading
  document.addEventListener('DOMContentLoaded', () => {
      const gridDiv = document.querySelector('#myGrid');
      grid = new agGrid.Grid(gridDiv, gridOptions);
      setSum();
  });

  function setSum() {
      let sum = 0;
      grid.gridOptions.api.forEachNode(node => {
        sum += (+node.data.income - +node.data.consumption - +node.data.goal - +node.data.spending)/31
      });
      document.getElementById('sum').innerText = sum.toFixed(2);
  }

