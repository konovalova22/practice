const columnDefs = [
    { field: "make", editable: true },
    { field: "model", editable: true },
    { field: "price", editable: true }
  ];
  
  // specify the data
  const rowData = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 }
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
        sum += +node.data.price
      });
      document.getElementById('sum').innerText = sum;
  }

