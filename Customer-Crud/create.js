const submitButton = document?.getElementById("submit-btn");
const cancelButton = document?.getElementById("cancel-btn");

let listOfCustomers = [];

submitButton?.addEventListener("click", function () {
  let customerName = document.getElementById("customer-name").value;
  let type = document.getElementById("type").value;
  let createdOn = document.getElementById("date").value;
  let manager = document.getElementById("manager").value;
  let status = document.getElementById("status").value;
  let description = document.getElementById("description").value;

  const nameRequired = document.querySelector(".name-required");
  const typeRequired = document.querySelector(".type-required");
  const dateRequired = document.querySelector(".date-required");
  const managerRequired = document.querySelector(".manager-required");
  const statusRequired = document.querySelector(".status-required");

  console.log(customerName, "cust");
  if (customerName == "") {
    nameRequired.innerHTML = "Customer name is required";
    nameRequired.style.color = "red ";
    nameRequired.style.fontSize = "12px ";
  } else {
    nameRequired.innerHTML = "";
  }
  if (type == "") {
    typeRequired.innerHTML = "Type is required";
    typeRequired.style.color = "red ";
    typeRequired.style.fontSize = "12px ";
  } else {
    typeRequired.innerHTML = "";
  }
  if (createdOn == "") {
    dateRequired.innerHTML = "Date is required";
    dateRequired.style.color = "red ";
    dateRequired.style.fontSize = "12px ";
  } else {
    dateRequired.innerHTML = "";
  }
  if (manager == "") {
    managerRequired.innerHTML = "Account manager is required";
    managerRequired.style.color = "red ";
    managerRequired.style.fontSize = "12px ";
  } else {
    managerRequired.innerHTML = "";
  }
  if (status == "") {
    statusRequired.innerHTML = "Status is required";
    statusRequired.style.color = "red ";
    statusRequired.style.fontSize = "12px ";
  } else {
    statusRequired.innerHTML = "";
  }
  if (
    customerName !== "" &&
    status !== "" &&
    manager !== "" &&
    createdOn !== "" &&
    type !== ""
  ) {
    emptyField();
    const existedData =
      JSON.parse(localStorage.getItem("customerDetails")) || [];
    let customerDetails = {
      type,
      customerName,
      manager,
      status,
      createdOn,
      description,
      id: existedData.length + 1,
    };

    console.log(customerDetails, "edit");
    const edit = JSON?.parse(localStorage?.getItem("editCustomer"));

    if (edit) {
      console.log("Editing customer with ID:", edit.id);

      let existedData =
        JSON.parse(localStorage.getItem("customerDetails")) || [];

      const updatedData = existedData.map((customer) => {
        if (customer.id === edit.id) {
          return {
            ...customer,
            customerName: customerDetails.customerName,
            type: customerDetails.type,
            manager: customerDetails.manager,
            status: customerDetails.status,
            createdOn: customerDetails.createdOn,
            description: customerDetails.description,
          };
        }
        return customer;
      });

      localStorage.setItem("customerDetails", JSON.stringify(updatedData));
    } else {
      listOfCustomers = [...existedData, customerDetails];

      localStorage.setItem("customerDetails", JSON?.stringify(listOfCustomers));
    }
    location.href = "customersData.html";
  }
});

// cancel button events

cancelButton?.addEventListener("click", function () {
  emptyField();
  const nameRequired = document.querySelector(".name-required");
  const typeRequired = document.querySelector(".type-required");
  const dateRequired = document.querySelector(".date-required");
  const managerRequired = document.querySelector(".manager-required");
  const statusRequired = document.querySelector(".status-required");

  nameRequired.innerHTML = "";
  typeRequired.innerHTML = "";
  dateRequired.innerHTML = "";
  managerRequired.innerHTML = "";
  statusRequired.innerHTML = "";
});

function emptyField() {
  document.getElementById("type").value = "";
  document.getElementById("customer-name").value = "";
  document.getElementById("manager").value = "";
  document.getElementById("status").value = "";
  document.getElementById("date").value = "";
  document.getElementById("description").value = "";
}

// create table and getting input data's

async function getListOfCustomers(status, filteredActiveCustomers) {
  const listOfCustomers = status
    ? filteredActiveCustomers
    : await JSON.parse(localStorage.getItem("customerDetails"));

  if (listOfCustomers?.length > 0) {
    listOfCustomers?.map((data) => {
      if (data !== null) {
        const newRow = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = data.customerName;

        newRow.append(nameCell);

        const descriptionCell = document.createElement("td");
        descriptionCell.textContent = data.description ? data.description : "-";

        newRow.append(descriptionCell);

        const typeCell = document.createElement("td");
        typeCell.textContent = data.type ? data.type : "-";

        newRow.append(typeCell);

        const statusCell = document.createElement("td");
        statusCell.textContent = data.status ? data.status : "-";

        newRow.append(statusCell);

        const dateCell = document.createElement("td");
        dateCell.textContent = data.createdOn ? data.createdOn : "-";

        newRow.append(dateCell);

        const actionCell = document.createElement("td");
        actionCell.style.display = "flex";
        actionCell.style.flexWrap = "wrap";
        actionCell.style.gap = "4px";

        const editBtn = document.createElement("button");
        editBtn.style.marginRight = "18px";
        editBtn.innerHTML = "Edit";
        editBtn.className = "action-edit-btn";

        const deleteBtn = document.createElement("button");
        actionCell.append(editBtn, deleteBtn);

        editBtn.style.marginRight = "18px";
        deleteBtn.innerHTML = "Delete";
        deleteBtn.className = "action-delete-btn";

        // edit btn function

        editBtn.addEventListener("click", function () {
          editCustomer(data);
        });

        //delete btn function

        deleteBtn.addEventListener("click", function () {
          console.log("delete clicked");
          deleteCustomer(data.id);
        });

        newRow.append(actionCell);

        const tableBody = document.getElementById("customer-table-body");

        tableBody?.append(newRow);
      }
    });
  } else {
    //--------
    const newRow = document.createElement("tr");

    const tableBody = document.getElementById("customer-table-body");
    // newRow.style.display = "flex";
    // newRow.style.alignItems = "center";

    newRow.innerHTML = `<td colspan="6" class = "data-cell">-- No Data Found --</td>`;

    // newRow.innerHTML = "no data found";
    tableBody?.append(newRow);

    //-----------
  }
}
getListOfCustomers();

//-------------delete customer function

function deleteCustomer(id) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this customer? This action cannot be undone."
  );
  if (!confirmDelete) return;

  const data = JSON.parse(localStorage.getItem("customerDetails"));
  console.log(id, "id");

  const filteredData = data?.filter((customer, key) => {
    if (customer.id !== id) {
      return customer;
    }
  });

  localStorage.removeItem("customerDetails");
  getListOfCustomers();

  localStorage.setItem("customerDetails", JSON.stringify(filteredData));
  location.reload();
  console.log(filteredData, "filter");
}

//-------------edit customer function

function editCustomer(customerData) {
  localStorage.setItem("editCustomer", JSON.stringify(customerData));

  location.href = "create.html";
}

//----------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------status-----------------------------------------status--------------------------------------------------status------------------------------//

let active = document.querySelector(".active");
let onHold = document.querySelector(".on-hold");
let closed = document.querySelector(".closed");
let all = document.querySelector(".all");

active?.addEventListener("click", function () {
  // console.log("active clicked");
  if (active) {
    active.style.backgroundColor = "#0a5b99";
    active.style.color = "white";

    all.style.backgroundColor = "whitesmoke";
    onHold.style.backgroundColor = "whitesmoke";
    closed.style.backgroundColor = "whitesmoke";

    all.style.color = "black";
    onHold.style.color = "black";
    closed.style.color = "black";
  }

  filteredData("active");
});
//---------

onHold?.addEventListener("click", function () {
  if (onHold) {
    onHold.style.backgroundColor = "#0a5b99";
    onHold.style.color = "white";

    all.style.backgroundColor = "whitesmoke";
    active.style.backgroundColor = "whitesmoke";
    closed.style.backgroundColor = "whitesmoke";

    all.style.color = "black";
    active.style.color = "black";
    closed.style.color = "black";
  }

  filteredData("onhold");
});

closed?.addEventListener("click", function () {
  // if (closed) {
  //   closed.style.backgroundColor = "#0a5b99";
  // }
  if (closed) {
    closed.style.backgroundColor = "#0a5b99";
    closed.style.color = "white";

    all.style.backgroundColor = "whitesmoke";
    active.style.backgroundColor = "whitesmoke";
    onHold.style.backgroundColor = "whitesmoke";

    all.style.color = "black";
    onHold.style.color = "black";
    active.style.color = "black";
  }

  filteredData("closed");

  //-------------------------------------

  //-------------------------------------
});

all?.addEventListener("click", function () {
  if (all) {
    all.style.backgroundColor = "#0a5b99";
    all.style.color = "white";

    closed.style.backgroundColor = "whitesmoke";
    active.style.backgroundColor = "whitesmoke";
    onHold.style.backgroundColor = "whitesmoke";

    active.style.color = "black";
    onHold.style.color = "black";
    closed.style.color = "black";
  }

  filteredData();
});

function filteredData(status) {
  const active = JSON.parse(localStorage.getItem("customerDetails"));

  const filteredActiveCustomers = active?.filter((actives, key) => {
    if (actives.status === status) {
      return actives;
    }
  });

  listOfCustomers = filteredActiveCustomers;
  document.getElementById("customer-table-body").innerHTML = "";
  getListOfCustomers(status, status ? filteredActiveCustomers : active);
  console.log(filteredActiveCustomers, "status");
}

const mailIcon = document.querySelector(".email-btn");

const logOutBox = document.querySelector(".logout");
const clickOutLog = document.querySelector(".container");

mailIcon?.addEventListener("click", function () {
  logOutBox.style.display = "block";
});
clickOutLog?.addEventListener("click", function () {
  logOutBox.style.display = "none";
});
const logOut = document.querySelector(".logout-text");
logOut?.addEventListener("click", function () {
  location.href = "logIn.html";
});
