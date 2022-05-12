



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


//STICKY NAVBAR

const navBar = document.querySelector('.nav-bar');
const sticky = navBar.offsetTop;
window.onscroll = () =>  {
    if (window.pageXOffset>=sticky){
        navBar.classList.add('sticky');
    }else{
        navBar.classList.add('sticky');
    }
}



//IMAGE SLIDER 
const slides = document.querySelectorAll('.slide');
const next = document.querySelector('.fa-angle-right');
const prev= document.querySelector('.fa-angle-left');
let auto = true;
let slideInterval;


const nextSlide = () =>{
    const current = document.querySelector('.active');
    current.classList.remove('active');
    if(current.nextElementSibling){
        
        current.nextElementSibling.classList.add('active')
    } else{
    
        slides[0].classList.add('active')
    }
    
}
const prevSlide = () =>{
    const current = document.querySelector('.active');
    current.classList.remove('active');
    if(current.previousElementSibling){
        
        current.previousElementSibling.classList.add('active')
    } else{
    
        slides[slides.length - 1].classList.add('active');
    }
    
}

    next.addEventListener('click', () =>{
        if (auto) {
            clearInterval(slideInterval)
            slideInterval = setInterval(nextSlide, 4000);
        }
        nextSlide();
    });


    prev.addEventListener('click', ()=>{
        if (auto) {
            clearInterval(slideInterval)
            slideInterval = setInterval(nextSlide, 4000);
        }
        prevSlide()
    })

    if (auto) {
        slideInterval = setInterval(nextSlide, 4000);
    }





//MAIN LOGIC
const productGrid = document.querySelector('.product-grid');

//CHECK IF CART IS IN LS RETURN IT OR AN EMPTY ARRAY
let cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []; 

//Get products
class Products {
    async getProducts () {
        try {
            let result = await fetch('products.json');
            let data = await result.json();
            const products = data.items;
            
            return products;
            
            
        } catch (error) {
            console.log(error);
        }
    }
    
}
class Ui {
    //LOOP THROUGH PRODUCTS AND DISPLAY
    displayProduct(products){
        
        const firstTenProducts = products.slice(8, 16);
        //FEATURED PRODUCTS
        firstTenProducts.forEach((product) =>{
            const div = document.createElement('div');
            div.classList.add('product');
            
            let id = div.dataset.id;
            id = product.id;
            
            div.innerHTML =`<div class="product-img" data-id=>
            <a href="./single-product.html#${product.id}"> <img  class="product-image" src="${product.images[0]}" alt=""></a>
            <div class="discount-percent"><p>-30%</P></div>
            </div>
            <h3 class="title">${product.title}</h3>
            <h2>$${product.price}</h2>
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
            <button class="cart-btn" data-id =${product.id} name="./index.html#${product.id}"> <div>Add to cart</div></button>`
            productGrid.appendChild(div);
            });


            //FILL NEW ARRIVALS DYNAMICALLY
            const newArrivalsGrid = document.querySelector('.new-arrivals-grid');
            const newArivals = products.filter((product) => {
                return product.type
            });
            newArivals.forEach((item)=>{
                const div = document.createElement('div');
                div.classList.add('new-arival-product');
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
                <button class="cart-btn" data-id =${item.id} name="./index.html#${item.id}"> <div>Add to cart</div></button>`
                newArrivalsGrid.appendChild(div);
            })
        }
        
        //SAVE ITEM TO THE CART
        saveItem() {
            
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
                    Storage.saveCart(cart);
                    //RESET CART VALUES
                    this.setCartVlues();
                    
                    
                    
                    
                    
                    
                    
                    
                    })
                    })
            }
    //SET CART VALUES
    setCartVlues() {
        const cartAmount = document.querySelector('.item-amoount');
        let totalPrice = 0;
        let totalItems = 0;
        cart.map((item)=> {
            totalItems += parseFloat(item.amount);
            totalPrice += item.price * item.amount;
            
            cartAmount.innerText = totalItems;
        });
        
    }
}
class Storage {
    static saveProducts(products) {
        localStorage.setItem("products",JSON.stringify(products))
    }
    static saveCart (cart) {
        localStorage.setItem("cart",JSON.stringify(cart) )
    }
}
    



document.addEventListener('DOMContentLoaded' , () =>{
    const products = new Products();
    const ui = new Ui()
    products.getProducts().then(products => {ui.displayProduct(products);
                                            Storage.saveProducts(products);}).then(() =>{
                                                ui.saveItem();
                                                ui.setCartVlues();
                                            });
                                        })
