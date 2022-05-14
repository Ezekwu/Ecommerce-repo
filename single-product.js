
//MAIN CONSTANTS


const wrapper = document.querySelector('.wrapper');
const products = JSON.parse(localStorage.getItem('products'));
const cart = JSON.parse(localStorage.getItem('cart'));


    

    //GET THE ID FROM THE URL
    const id = location.hash.substring(1);
   // const inCart = cart.find((item) => {
      //  return item.id === id ;
    //});
    //USE ID TO GET PRODUCT FROM PRODUCTS ARRAY
    const item = products.find(product=>product.id===id);
    console.log(item.images);
    
    //FILL THE DOM DYNAMICALLY
    wrapper.innerHTML =`<div class="single-product-image ">
    <div class="big-image">
        <img src="${item.images[0]}" alt="" id="big-img">
    </div>
    <div class="small-image grid">
        <img src="${item.images[0]}" alt="" class="small-img">
        <img src="${item.images[1]}" alt="" class="small-img">
        <img src="${item.images[2]}" alt="" class="small-img">
        <img src="${item.images[3]}" id="last-img" alt="" class="small-img">
    </div>
</div>
<div class="single-product-details">
    <h4 class="type">${item.category}</h4>
    <h2 class="title">${item.title}</h2>
    <h1 class="price">
    $${item.price}
    </h1>
    <div class="size flex">
        <div>S</div>
        <div>M</div>
        <div>L</div>
        <div>XL</div>
        <div>XXL</div>
    </div>
    
        <div class="add-to-cart" id="add-to-cart">
            <a  class="cart-btn">Add to cart</a>
        </div>
    
    <div class="item-amount flex">
        <div class="subtract" data-id=${item.id}>-</div>
        <div class="item-number"><p id="item-amount">${item.amount}</p></div>
        <div class="add" data-id=${item.id}>+</div>
        <p class="items-added"></P>
    </div>
    <h2 >Product Details</h2>
    <p class="product-details">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto neque ipsam eos iure beatae cum corporis magni, natus quia odit. Libero neque sint nobis recusandae culpa earum sequi dolor hic. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, commodi! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo quae nemo cupiditate sapiente eaque temporibus voluptas veniam dolorem iure aspernatur! Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit ex eum rerum at accusamus odit eos esse commodi, illo optio. lorem40
    </p>
</div>`



//IMAGE SELECTOR LOGIC
const bigImg = document.getElementById('big-img');
const smallImgs = [...document.querySelectorAll('.small-img')];
const lastimg = document.getElementById('last-img');


smallImgs.forEach((img)=>{
    img.addEventListener('click', ()=>{
        bigImg.src = img.src
        
    })
})


//HAMBURGER
const hamburgerFunc = () =>{
    const hamBurger = document.querySelector('.hamburger');
    const overLay= document.querySelector('.overlay');
    const navLinks = document.querySelector('.nav-links');
    
        hamBurger.addEventListener('click', () => {
        navLinks.classList.toggle('slide-menu');
        if(navLinks.classList.contains('slide-menu')){
            overLay.style.display = 'block';
        }else{
            overLay.style.display = 'none'
        };
    })
    
}
hamburgerFunc();

const navBar = document.querySelector('.header');
const sticky = navBar.offsetTop;

window.onscroll = () =>  {
    if (window.pageXOffset>=sticky){
        navBar.classList.add('sticky');
    }else{
        navBar.classList.add('sticky');
    }
}




//ADD ITEM TO CART
function addToCart () {
    const cartBtn = document.getElementById('add-to-cart');
    const itemAmount = document.getElementById('item-amount');
    const itemsAdded = document.querySelector('.items-added');
    

//CHECK IF ITEM IS IN CART
if(inCart){
    cartBtn.style.display='none';
    itemsAdded.style.display="block";
    itemsAdded.innerText =`item(s) added (${inCart.amount})`
    itemAmount.innerText=inCart.amount;
}
cartBtn.addEventListener('click', () =>{
    console.log('hello');
    const cartItem = products.find(product=> product.id==id);
    cart.push(cartItem);
    localStorage.setItem("cart",JSON.stringify(cart) );
    cartBtn.style.display='none';

    

    const notification = document.querySelector('.notification');
    const lodader = document.querySelector('.loader');
    lodader.classList.add('show-loader');
    //LOADER AND MESSAGE ALERT
    setTimeout(()=>{
        
        lodader.classList.remove('show-loader');
        itemsAdded.innerText =`item(s) added (${inCart.amount})`
        itemAmount.innerText=inCart.amount;
        
        },3000);

    
    setTimeout(()=>{
        notification.classList.add('show-notification');
        
        setTimeout(()=>{
            window.location.reload();
            notification.classList.remove('show-notification');
        },1500)
    }, 3000)
    
    setCartVlues();
    
    
})
};
addToCart();

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

function changeItemAmount () {
     //INCREASE ITEM AMOUNT
    function increaseAmount() {
        const increaseBtn = document.querySelector('.add');
    const id = increaseBtn.dataset.id;
    increaseBtn.addEventListener('click', (e)=>{
        const lodader = document.querySelector('.loader');
        lodader.classList.add('show-loader');
        
        setTimeout(()=>{
            item.amount = item.amount + 1;
        let itemAmount = e.target.previousElementSibling.firstChild;
        itemAmount.innerText = item.amount
            lodader.classList.remove('show-loader');
            
            },2000);
        
        
                    
        
        setCartVlues();
        localStorage.setItem("cart",JSON.stringify(cart));
        
        
    });
    if(inCart){
        
        const id = increaseBtn.dataset.id;
        increaseBtn.addEventListener('click', (e)=>{
            const lodader = document.querySelector('.loader');
            lodader.classList.add('show-loader');
            setTimeout(()=>{
                lodader.classList.remove('show-loader');
                window.location.reload();
                },2000);

                inCart.amount = inCart.amount + 1;
            let itemAmount = e.target.previousElementSibling.firstChild;
            itemAmount.innerText = inCart.amount
        
        
        
        
        setCartVlues();
        localStorage.setItem("cart",JSON.stringify(cart));
        
    });
    }
        }
    increaseAmount();


    //DECREASE ITEM AMOUNT
    function decreaseAmount() {
        const decreaseBtn = document.querySelector('.subtract');
    const id = decreaseBtn.dataset.id;
    decreaseBtn.addEventListener('click', (e)=>{
        if(item.amount <= 1){
            return
        }else{
            item.amount = item.amount - 1;
        }
        const lodader = document.querySelector('.loader');
        lodader.classList.add('show-loader');
        setTimeout(()=>{
            lodader.classList.remove('show-loader');
            window.location.reload();
            },2000);
        
        
            
        
        let itemAmount = e.target.nextElementSibling.firstChild;
        itemAmount.innerText = item.amount
        
        
        setCartVlues();
        localStorage.setItem("cart",JSON.stringify(cart));
        
    });
    //LOAD ITEM AMOUNT ACCORDING TO CART VALUE
    if(inCart){
        
    const id = decreaseBtn.dataset.id;
    decreaseBtn.addEventListener('click', (e)=>{
        if( inCart.amount <= 1){
            return
        } else{
            inCart.amount = inCart.amount - 1;
        }
        const lodader = document.querySelector('.loader');
        lodader.classList.add('show-loader');
        setTimeout(()=>{
            lodader.classList.remove('show-loader');
            window.location.reload();
            },2000);
        
        let itemAmount = e.target.nextElementSibling.firstChild;
        itemAmount.innerText = inCart.amount
        
        
        setCartVlues();
        localStorage.setItem("cart",JSON.stringify(cart));
        
    });
    }
    }
    
    decreaseAmount();
}
changeItemAmount();


const department = products.filter((product)=> {
    return product.department == item.department
});

const modifiedDepartment = department.filter((item) => {
    return item.id !== id
})

const suggestionGridContainer = document.querySelector('.suggestion-grid');
modifiedDepartment.forEach((item) => {
    const div = document.createElement('div');
    div.classList.add('product');
    div.innerHTML =`<div class="product-img" data-id=>
    <a href="./single-product.html#${item.id}"> <img  class="product-image" src="${item.images[0]}" alt="" data-id=${item.id}></a>
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
    `
    suggestionGridContainer.appendChild(div);
    
    

})



