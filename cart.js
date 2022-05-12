let cart = JSON.parse(localStorage.getItem('cart'));
const cartMain = document.querySelector('.cart-main');



///HAMBURGER
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







function setCartVlues() {
    const cartAmount = document.querySelector('.item-amoount');
    const cartAmountTop = document.querySelector('.cart-amount-top');
    const checkOutAmount = document.querySelector('.check-out-amount');
    
    let totalPrice = 0;
    let totalItems = 0;
    cart.map((item)=> {
        totalItems += parseFloat(item.amount);
        totalPrice += item.price * item.amount;
        cartAmount.innerText = totalItems;
        checkOutAmount.innerText = `$${totalPrice}`;
        cartAmountTop.innerText = totalItems
    });
    const subTotal = document.querySelector('.sub-total');
    
    
    subTotal.innerHTML=`<h2>Subtotal:</h2>
    <h2 >$${totalPrice}</h2>`
    
}
setCartVlues();

cart.forEach((item) => {
    const div = document.createElement('div');
    div.classList.add('cart-product');
    div.classList.add('flex');
    div.innerHTML = `<div class="cart-product-img">
    <img src="${item.images[0]}" alt="">
</div>
<div class="product-details">
    <div class="details flex">
            <p>
            ${item.title}...
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi odit, explicabo animi asperiores maiores modi sunt ex enim beatae deleniti!
        </p>
        <h2>
            $${item.price*item.amount}
        </h2>
    </div>
    <div class="flex">
        <div class="item-amount flex">
            <div class="subtract" data-id=${item.id}>-</div>
            <div class="item-number"><p >${item.amount}</p></div>
            <div class="add" data-id=${item.id}>+</div>
        </div>
        <div class="delete" data-id=${item.id}>
            <p>Remove</p>
            <i class="fa-solid fa-trash-can"></i>
        </div>
    </div>

</div>`
    
cartMain.appendChild(div);

});


    

function cartLogic () {
    //DELETE ITEMS
    const deleteItems = [...document.querySelectorAll('.delete')];
    deleteItems.forEach((deleteItem) =>{
        deleteItem.addEventListener('click', () =>{
            const notification = document.querySelector('.notification');
            const lodader = document.querySelector('.loader');
            lodader.classList.add('show-loader');
            setTimeout(()=>{
                lodader.classList.remove('show-loader');
                notification.classList.add('show-notification');
                setTimeout(()=>{
                    notification.classList.remove('show-notification');
                    window.location.reload();
                },3000)
            },2000);

            const id = deleteItem.dataset.id;
            cart= cart.filter(item => item.id!==id)
            localStorage.setItem("cart",JSON.stringify(cart));
            
            })
    })
    //INCREASE ITEM AMOUNT
    const increaseBtn = [...document.querySelectorAll('.add')];
    increaseBtn.forEach((btn) =>{
        btn.addEventListener('click', ()=>{
            const lodader = document.querySelector('.loader');
            lodader.classList.add('show-loader');
        setTimeout(()=>{
            lodader.classList.remove('show-loader');
            window.location.reload();
            },2000);

            const id = btn.dataset.id;
            console.log(id);
            let cartItem = cart.find((item)=>{
                return item.id == id;
            });
            
            cartItem.amount++;
            console.log(cartItem.amount);
            setCartVlues();
            localStorage.setItem("cart",JSON.stringify(cart));
            
        })
    })

  //DECREASE ITEM AMOUNT
    const decreaseBtn = [...document.querySelectorAll('.subtract')];
    decreaseBtn.forEach((btn) =>{
        btn.addEventListener('click', ()=>{
            
            const id = btn.dataset.id;
            console.log(id);
            let cartItem = cart.find((item)=>{
                return item.id == id;
            });
            if(cartItem.amount <= 1){
                return
            }else{
                cartItem.amount--;
                const lodader = document.querySelector('.loader');
            lodader.classList.add('show-loader');
            setTimeout(()=>{
                lodader.classList.remove('show-loader');
                window.location.reload();
                },2000);
            }
            
            console.log(cartItem.amount);
            setCartVlues();
            localStorage.setItem("cart",JSON.stringify(cart));
            
        })
    })
    
    
}
cartLogic();
window.addEventListener('scroll', (e) => {
    let scroll = this.scrollY;
    console.log(scroll);
})

const navBar = document.querySelector('.nav-bar');
const sticky = navBar.offsetTop;

window.onscroll = () =>  {
    if (window.pageXOffset>=sticky){
        navBar.classList.add('sticky');
    }else{
        navBar.classList.add('sticky');
    }
}