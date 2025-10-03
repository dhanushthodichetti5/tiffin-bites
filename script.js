let searchField=document.getElementById("search_field")
let menuContainer=document.getElementById("menu_two")
let menuCards=document.querySelectorAll(".card_container")

searchField.addEventListener("input",()=>{
    let searchTerm=searchField.value.toLowerCase().replace(" ","_")
    //searchField.value.toLowerCase().trim()
    // trim() is used to remove white spaces
    menuCards.forEach((card)=>{
        let name=card.id
        if(name.includes(searchTerm)){
            //name.startsWith(searchTerm)
            //here we can also use startsWith()
            card.style.display="flex" //"Block" to make it visible
        }
        else{
            card.style.display="none"
        }
    })

})

let cartQuantity=document.getElementById("quantity")
let cartPrice=document.getElementById("price")

let cart={}
let totalQuantity=0
let totalPrice=0

// let menuCards=document.querySelectorAll(".card_container")
menuCards.forEach((card)=>{
    let itemId=card.id
    let itemImg=card.querySelector(".food_img").src
    let itemName=card.querySelector(".food_title").innerText
    let itemPrice=Number(card.querySelector(".food_price").innerText.replace("₹",""))
    //₹ - ctrl+alt+4
    let itemQuantity=card.querySelector("span")
    //Number() is used to convert String to Number
    let minusBtn=card.querySelectorAll(".quantity_btn")[0]
    let plusBtn=card.querySelectorAll(".quantity_btn")[1]

    cart[itemId]={
        id:itemId,
        img:itemImg,
        name:itemName,
        price:itemPrice,
        quantity:0
    }

    plusBtn.addEventListener("click",()=>{
        cart[itemId].quantity++
        itemQuantity.innerText=cart[itemId].quantity
        totalQuantity++
        totalPrice+=itemPrice
        updateCart()
        // updateAddCart(cart[itemId].id,cart[itemId].img,cart[itemId].name,cart[itemId].quantity,cart[itemId].price)
    })

    minusBtn.addEventListener("click",()=>{
        if(cart[itemId].quantity>0){
            cart[itemId].quantity--
            itemQuantity.innerText=cart[itemId].quantity
            totalQuantity--
            totalPrice-=itemPrice
            updateCart() 
            // updatePopCart(cart[itemId].id,cart[itemId].img,cart[itemId].name,cart[itemId].quantity,cart[itemId].price)
        }
    })
})

let updateCart=()=>{
    cartQuantity.innerText=totalQuantity
    //cartPrice.innerText="₹"+totalPrice+".00"
// cartTotalItems.innerText=totalQuantity
    cartPrice.innerText=`₹${totalPrice.toFixed(2)}`
    //toFixed()  is used to write the number upto fixed decimal points
// cartTotalPrice.innerText=totalPrice
}


//!Cart pop-up starts from here
let mainContainer=document.querySelector("main")
let cartIcon=document.querySelector("#cart_icon")
let cartContainer=document.getElementById("popup_container")
let cartDetails=document.getElementById("cart_details")
let cartTotalItems=document.querySelector("#cart_total_items>span")
let cartTotalPrice=document.querySelector("#cart_total_price>span")
let closeButton=document.querySelector("#close_btn")

cartIcon.addEventListener("click",()=>{
    mainContainer.style.display="flex"
    renderCartDetails()
})
closeButton.addEventListener("click",()=>{
    mainContainer.style.display="none"
})
mainContainer.addEventListener("click",()=>{
    mainContainer.style.display="none"
})
cartContainer.addEventListener("click",(e)=>{
    e.stopPropagation()
})

/*
let updateAddCart=(id,img,name,quantity,price)=>{
    let cartItem=document.querySelector(`#cart_${id}`)
    let cartContains=cartDetails.querySelector(".cart_container")
    console.log(cartItem)
    console.log(id)
    if(cartItem==null&&cartContains==null){
        cartDetails.innerHTML=`
            <article class="cart_container" id="cart_${id}">
                <img src="${img}" alt="${id}" class="cart_img">
                <h2 class="cart_title">${name}</h2>
                <span>${quantity}</span>
                <h4 class="cart_price">₹${price}</h4>
            </article>
        `
    }
    else if(cartItem==null){
        cartDetails.innerHTML+=`
            <article class="cart_container" id="cart_${id}">
                <img src="${img}" alt="${id}" class="cart_img">
                <h2 class="cart_title">${name}</h2>
                <span>${quantity}</span>
                <h4 class="cart_price">₹${price}</h4>
            </article>
        `
    }
    else   
        {
        let cartPrice=cartItem.querySelector(`.cart_price`).innerText.replace("₹","")
        console.log(cartPrice)
        cartItem.innerHTML=`
            <article class="cart_container" id="cart_${id}">
                <img src="${img}" alt="${id}" class="cart_img">
                <h2 class="cart_title">${name}</h2>
                <span>${quantity}</span>
                <h4 class="cart_price">₹${Number(cartPrice)+price}</h4>
            </article>
        `
    }
    // let cartContainers=document.querySelectorAll(".cart_container")
    // cartContainers.forEach((card)=>{
    //     let plusBtn=card.querySelectorAll(".cart_btn")[0]
    //     let minusBtn=card.querySelectorAll(".cart_btn")[1]
    //     console.log(plusBtn)
    //     plusBtn.addEventListener("click",()=>{
    //         cart[itemId].quantity++
    //         itemQuantity.innerText=cart[itemId].quantity
    //         totalQuantity++
    //         totalPrice+=itemPrice
    //         updateCart()
    //         updateAddCart(cart[itemId].id,cart[itemId].img,cart[itemId].name,cart[itemId].quantity,cart[itemId].price)
    //     })
    // })
    
}
*/

//!26-06-2025 class
// let cartDetails=document.getElementById("cart_details")
// let cartTotalItems=document.querySelector("#cart_total_items>span")
// let cartTotalPrice=document.querySelector("#cart_total_price>span")

function renderCartDetails(){
    cartDetails.innerHTML=""
    let hasResults=false
    for(let id in cart){
        let name=cart[id].name
        let price=cart[id].price
        let quantity=cart[id].quantity
        if(quantity>0){
            hasResults=true;
            let para=document.createElement("p")
            para.innerHTML=`${name} x ${quantity} = ₹${(price*quantity).toFixed(2)}`
            cartDetails.append(para)
        }
    }
    if(hasResults==false){
        cartDetails.innerHTML="<p>No items in the cart</p>"
    }

    cartTotalItems.innerText=totalQuantity
    cartTotalPrice.innerText=totalPrice.toFixed(2)
}








