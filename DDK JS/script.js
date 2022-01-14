let products =  JSON.parse(localStorage.getItem("products"))
? JSON.parse(localStorage.getItem("products"))
:[
    {
        title:"Butter Chicken",
        category:"Mains",
        price:"R60",
        img:"https://www.thespruceeats.com/thmb/XI3rjHm7q8h3823MlUaoC0n4s44=/2000x2000/smart/filters:no_upscale()/butter-chicken-479366-hero-2-75d134ff86ee42bc85e34232dbb319bf.jpg",
    },
    {
      title:"Stir Fry",
        category:"Mains",
        price:"R45",
        img:"https://images.immediate.co.uk/production/volatile/sites/30/2020/08/pork-noodle-stir-fry-3cb19c3.jpg",
    },
    {
      title:"Garlic Bread",
        category:"Sides",
        price:"R20",
        img:"https://www.simplyrecipes.com/thmb/_kfMeM8vmbWkGWn6Y0PDmHdfYu4=/2000x1125/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2006__09__Garlic-Bread-LEAD-1-8b9944bb8e7a4fc49094da4d34f7ba50.jpg",
    },
    {
      title:"Milkshakes",
        category:"Drinks",
        price:"R15",
        img: "https://preppykitchen.com/wp-content/uploads/2021/04/Milkshake-Recipe-Card.jpg",
    },
]; 


let cart = JSON.parse(localStorage.getItem("cart"))
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

function readProducts(products) {
  document.querySelector("#products").innerHTML = "";

  products.forEach((products,position) => {
    document.querySelector("#products").innerHTML +=`
     <div class="card" style="width: 18rem;">
      <img src="${products.img}" class="card-img-top">
      <div class="card-body">
      <h4>  ${products.title} </h4> 
      <h5> ${products.category} </h5>
      <h5> ${products.price} </h5>
        <div class="content">
          <div  class="buttons">
            <button  class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#update-modal-${position}">EDIT</button>
            <button  class="btn btn-danger" onclick="deleteProducts(${position})">DELETE</button>
            <div class="cartbuttons">
              <input type="number" class="form-control" value=1 min=1 id="addToCart${position}">
              <button type="button" class="btn btn-secondary ms-3" onclick="addToCart(${position})">Add to Cart</i></button>
            </div>
        </div>
      </div>
    </div>
 
     <div class="modal fade" id="update-modal-${position}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
       <div class="modal-dialog">
         <div class="modal-content">
           <div class="modal-header">
             <h5 class="modal-title" id="exampleModalLabel">Edit Item</h5>
             <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
           </div>
           <div class="modal-body1">
             <input type="text" id="update-input-${position}" value="${products.title} "/>
             <input type="text" id="update-input-price-${position}" value="${products.price} "/>
             <input type="text" id="update-input-img-${position}" value="${products.img} "/>
             <select name="category" id="update-input-category-${position}">
             <option value="Mains">Mains</option>
             <option value="Sides">Sides</option>
             <option value="Drinks">Drinks</option>
             </select>
           </div>
           <div class="modal-footer">
             <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Close</button>
             <button type="button" class="btn btn-light" data-bs-dismiss="modal" onclick="updateProducts(${position})">Save changes</button>
           </div>
         </div>
       </div>
     </div>
    `
    ;
    });
};

readProducts(products)

function createProducts(){
      let title = document.querySelector("#title").value;
      let category = document.querySelector("#category").value;
      let img =  document.querySelector("#img").value;
      let price = document.querySelector("#price").value;

      try{
          if(!title || !price || !img) throw new Error ("Please enter a new product")
          products.forEach(individual =>{
              if(individual == title)throw "That product already exists..."
          })


          products.push({
              title,
              category,
              img,
              price,
          });
         localStorage.setItem("products",JSON.stringify(products));
          readProducts(products);
      } catch(err){
          alert(err)
      }

  };

  function deleteProducts(position){
      products.splice(position, 1)
      localStorage.setItem("products",JSON.stringify (products));
      readProducts(products);
  };

  function updateProducts(position){
      let title =document.querySelector(`#update-input-${position}`).value;
      let category =document.querySelector(`#update-input-category-${position}`).value;
      let img =  document.querySelector(`#update-input-img-${position}`).value;
      let price = document.querySelector(`#update-input-price-${position}`).value;

      try{
          if(!title || !price || !img){
              throw new Error("Please fill in all required fields")
          };
          products[position]={
              title,
              category,
              img,
              price,
          };
          localStorage.setItem("products",JSON.stringify (products));
          readProducts(products);
      }catch(error){
          alert(error)
      }
      };

      function addToCart(position) {
        let qty = document.querySelector(`#addToCart${position}`).value;
        let added = false;
        cart.forEach((product) => {
          if (product.title == products[position].title) {
            alert(
              `You have successfully added ${qty} ${products[position].title} to the cart`
            );
            product.qty = parseInt(product.qty) + parseInt(qty);
            added = true;
          }
        });
        if (!added) {
          cart.push({ ...products[position], qty });
          alert(
            `${qty} ${products[position].title} has been added to the cart`
          );
        }
      
      
        localStorage.setItem("cart", JSON.stringify(cart));
      }
      
      // Update Cart Badge
      function showCartBadge() {
        document.querySelector("#badge").innerHTML = cart ? cart.length : "";
      }
      
      // SORT BY CATEGORY
      function sortCategory() {
        let category = document.querySelector("#sortCategory").value;
      
        if (category == "All") {
          return readProducts(products);
        }
      
        let foundProducts = products.filter((product) => {
          return product.category == category;
        });
      
        readProducts(foundProducts);
        console.log(foundProducts);
      }
      
      // SORT BY NAME
      
      function sortName() {
        let direction = document.querySelector("#sortName").value;
      
        let sortedProducts = products.sort((a, b) => {
          if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1;
          }
          if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1;
          }
          return 0;
        });
        if (direction == "descending") sortedProducts.reverse();
        console.log(sortedProducts);
        readProducts(products);
      }
      
      // SORT BY PRICE
      
      function sortPrice() {
        let direction = document.querySelector("#sortPrice").value;
      
        let sortedProducts = products.sort((a, b) => a.price - b.price);
      
        console.log(sortedProducts);
      
        if (direction == "descending") sortedProducts.reverse();
        readProducts(sortedProducts);
      }