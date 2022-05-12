const products = JSON.parse(localStorage.getItem('products'));
const cart = JSON.parse(localStorage.getItem('cart'));
const categoryGridContainer = document.querySelector('.category-products-grid');

const category = location.hash.substring(1);
const categoryProducts = products.filter((product) => {
    return product.department == category
})
//DISPLAY ITEMS
function displayProducts() {
    categoryProducts.forEach((item) => {
        const div = document.createElement('div');
        div.classList.add('product');
        div.innerHTML =`<div class="product-img" data-id=>
        <a href="./single-product.html#${item.id}"> <img  class="product-image" src="${item.images[0]}" alt=""></a>
        <div class="discount-percent"><p>-30%</P></div>
        </div>
        <h3 class="title">${item.title}</h3>
        <h2>$${item.price}</h2>
        <p  class="old-price">$60</p>
        <div class="rating">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-regular fa-star"></i>
        </div>
        <p class="delivery-text">
            Get free delivery on your items after a fifth purchase. regular orders have a minimun price of $5 depanding on your location.
        </p>
        <button class="cart-btn" data-id =${item.id} > <div>Add to cart</div></button>`
        categoryGridContainer.appendChild(div)
    })
};
displayProducts();


function setCartVlues() {
    const cartAmount = document.querySelector('.item-amoount');
    let totalPrice = 0;
    let totalItems = 0;
    cart.map((item)=> {
        totalItems += parseFloat(item.amount);
        totalPrice += item.price * item.amount;
        
        cartAmount.innerText = totalItems;
    });
    
}
setCartVlues();

function saveItem() {
            
    const products = JSON.parse(localStorage.getItem('products'));
    const buttons = [...document.querySelectorAll('.cart-btn')];
    
    buttons.forEach((button) =>{
        const btnId = button.dataset.id;
        const inCart = cart.find((item) => {
            return item.id === btnId ;
            
        });
        if(inCart){
            button.innerText = "In Cart";
            button.disabled = true;
        }
        
        button.addEventListener('click', (e) =>{
            
            
            e.preventDefault();
            button.innerText = "In Cart";
            //DISABLE BUTTON IF ITEM IS IN CART
            button.disabled = true;
            const cartItem = products.find((product) => {
                
                return product.id === btnId
            });
            //ADD ITEM TO CART
            cart.push(cartItem);

            const notification = document.querySelector('.notification');
            const lodader = document.querySelector('.loader');
            lodader.classList.add('show-loader');
            // DISPLAY LOADER AND ALERT MESSAGE
            setTimeout(()=>{
                lodader.classList.remove('show-loader');
                notification.classList.add('show-notification');
            setTimeout(()=>{
                notification.classList.remove('show-notification');
            },3000)
            },2000);
            
            //SAVE CART TO LOCAL STORAGE
            localStorage.setItem("cart",JSON.stringify(cart));
            //RESET CART VALUES
            setCartVlues();
            })
            })
    }
saveItem();

