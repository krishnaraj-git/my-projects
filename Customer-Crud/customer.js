// const searchIcon = document.querySelector(".search-icon");

// searchIcon?.addEventListener("click", function () {
// const inputValue = document.querySelector(".search-input-box").value;
// .trim()
//     .toLowerCase();

//   const matchedCustomers = existedData.filter((customer) =>
//     customer.customerName.toLowerCase().includes(inputValue)
//   );

//   document.getElementById("customer-table-body").innerHTML = "";
//   getListOfCustomers(true, matchedCustomers);
// });

// listOfCustomers = [];

const existedData = JSON.parse(localStorage.getItem("customerDetails")) || [];

const searchIcon = document.querySelector(".search-icon");
const searchInput = document.querySelector(".search-input-box");
const tableBody = document.getElementById("customer-table-body");

function onSearch() {
  const search = searchInput.value.trim().toLowerCase();
  tableBody.innerHTML = "";

  if (!search) {
    getListOfCustomers();
    return;
  }

  const matchedCustomers = existedData.filter((customer) =>
    customer.customerName.toLowerCase().includes(search)
  );

  if (matchedCustomers.length === 0) {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `<td colspan="6" class="data-cell">-- No Match Found --</td>`;
    tableBody.append(newRow);
  } else {
    getListOfCustomers(true, matchedCustomers);
  }

  console.log("matched customers:", matchedCustomers);
}

searchIcon?.addEventListener("click", onSearch);

searchInput?.addEventListener("input", onSearch);
