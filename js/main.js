function vegetableData() {
  fetch("https://test-schema.herokuapp.com/vegetables/")
    .then((response) => {
      if (!response.ok) {
        console.log("error");
      } else {
        return response.json();
      }
    })
    .then((result) => {
      console.log("all veg");
      console.log(result.data);
      const getFilteredData = result.data.filter(function (veg) {
        return veg.price > 50;
      });
      // price above 50
      console.log("filtered price above 50");
      console.log(getFilteredData);

      const firstResult = getFilteredData
        .map((result) => {
          return `<div class="row">
            <div class="col-md-6 col-sm-6">
                <p>Name: ${result.name}</p>
            </div>
            <div class="col-md-6 col-sm-6">
                <p>Price: <b>${result.price}</b></p>
            </div>
          </div>`;
        })
        .join("");

      document
        .querySelector("#filterData")
        .insertAdjacentHTML("afterbegin", firstResult);

      //   adding 15% vat to all the price whose value is > 50
      const getMappedData = getFilteredData.map((veg) => {
        return veg.price * 0.15;
      });
      console.log("15% vat added to vegetables price greater than 50");
      console.log(getMappedData);
      const secondResult = getMappedData
        .map((res) => {
          return `<div>
                <p>Price (15% Vat):<b> ${res}</b></p>
          </div>`;
        })
        .join("");

      document
        .querySelector("#getVatData")
        .insertAdjacentHTML("afterbegin", secondResult);

      // Calculating Total price after filtering above 50, adding 15 % vat to those.
      const getTotalValue = getMappedData.reduce(function (
        accumulator,
        currentNumber
      ) {
        return Math.round(accumulator + currentNumber);
      });
      console.log("Total value: ");
      console.log(getTotalValue);

      document
        .querySelector("#getTotalPrice")
        .insertAdjacentHTML("afterbegin", "Total Price:" + getTotalValue);
    })
    .catch((error) => {
      console.log(error);
    });
}

vegetableData();
