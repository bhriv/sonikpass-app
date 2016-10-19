//Filename: views/finance_data.js
      
function findParentCategory(child_category) {
  // cc('findParentCategory for ['+child_category+']','run');
  var parent_category =  null;

  if (child_category == 'Coffee Shops' || 
      child_category == 'Cafe' ) { 
    parent_category = 'Coffee';
  }
  if (parent_category == null) {
    cc('ERROR findParentCategory for ['+child_category+']','error');
  }
  return parent_category;

}

var months_all = ["Jan","Feb","March","April","May","June","July","Aug","Sept","Oct","Nov","Dec"];
// cc(months_temp, 'success');

var data_2016 = [{
  "1" : [
  {
    "Date": "1/29/2016",
    "Description": "Intelligentsia",
    "Original Description": "INTELLIGENTSIA COFFEE PASADENA CA            01/28",
    "Amount": 5,
    "Transaction Type": "debit",
    "Category": "Coffee Shops",
    "Account Name": "TOTAL CHECKING",
    "Labels": "",
    "Notes": ""
  }
];

// console.log('all_transaction_data\n',all_transaction_data)
console.log('views/finance_data loaded');
