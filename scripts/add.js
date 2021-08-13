var form = document.getElementById("addForm");
var itemList = document.getElementById("items");
var filter = document.getElementById("filter");

// form.addEventListener("submit", addItem);
// itemList.addEventListener("click", removeItem);
// filter.addEventListener("keyup", filterItems);

function addItem() {
  //   e.preventDefault();
  var newItem = document.getElementById("item").value;
  fetch("https://still-ocean-71718.herokuapp.com/view/")
    .then((res) => res.json())
    .then((data) => {
      products = data.data;
      let container = document.querySelector(".card-body");
      products.forEach((item) => {
        container.innerHTML += `<h1>${item[1][2]}</h1>
                                <button onclick=addToCart(${item[0][0]})>ADD TO CART</button>`;
      });

      addItem();

      cartProductList = [];

      function addToCart(id) {
        fetch("https://still-ocean-71718.herokuapp.com/view/")
          .then((res) => res.json())
          .then((data) => {
            products = data.data;
            let cart = document.querySelector(".overall-content");
            let cartList = products.find((item) => {
              return item.id == id;
            });
          });
        cartProductList.push(cartList);
        console.log(cartProductList);
      }
    });
  // var li = document.createElement('li');
  // li.className = 'list-group-item'; li.appendChild(document.createTextNode(newItem));
  // var deleteBtn = document.createElement('button');
  // deleteBtn.className = 'btn btn-danger btn-sm float-right delete'; deleteBtn.appendChild(document.createTextNode('X'));
  // li.appendChild(deleteBtn);
  // itemList.appendChild(li);
}

function removeItem(e) {
  if (e.target.classList.contains("delete")) {
    if (confirm("Are You Sure?")) {
      var li = e.target.parentElement;
      itemList.removeChild(li);
    }
  }
}

function filterItems(e) {
  var text = e.target.value.toLowerCase();
  var items = itemList.getElementsByTagName("li");
  Array.from(items).forEach(function (item) {
    var itemName = item.firstChild.textContent;
    if (itemName.toLowerCase().indexOf(text) != -1) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}
