/* TAGGY · extras: menú móvil, animaciones, avisos */
(function(){
const menu=document.querySelector('.menu');
if(menu){
  if(!menu.querySelector('a[href="carrito.html"]')){const a=document.createElement('a');a.href='carrito.html';a.className='cart-menu';a.innerHTML='🛒 <span id="cartCount">0</span>';menu.appendChild(a);}
  const b=document.createElement('button');b.className='menu-toggle';b.setAttribute('aria-label','Abrir menú');b.innerHTML='<span></span><span></span><span></span>';
  b.onclick=()=>{b.classList.toggle('open',menu.classList.toggle('open'))};menu.parentElement.appendChild(b);
  const p=location.pathname.split('/').pop()||'index.html';
  menu.querySelectorAll('a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')===p));
}
window.esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let t;window.alert=m=>{let e=document.querySelector('.toast');if(!e){e=document.createElement('div');e.className='toast';document.body.appendChild(e)}
  e.textContent=m;clearTimeout(t);requestAnimationFrame(()=>e.classList.add('show'));t=setTimeout(()=>e.classList.remove('show'),3200)};
})();
/* =================================
   FONDO INTERACTIVO
================================= */

const orbs = document.querySelectorAll(".orb");


document.addEventListener("mousemove", function(event) {

    let x =
        (event.clientX / window.innerWidth - 0.5) * 2;

    let y =
        (event.clientY / window.innerHeight - 0.5) * 2;


    orbs.forEach(function(orb, index) {

        let movement =
            (index + 1) * 12;


        orb.style.transform =
            `translate(${x * movement}px,
                        ${y * movement}px)`;

    });

});


/* =================================
   REPORTAR MASCOTA
================================= */

const reportForm =
    document.getElementById("reportForm");

const reportList =
    document.getElementById("reportList");


if (reportForm && reportList) {


    function showReports() {

        let reports =
            JSON.parse(
                localStorage.getItem("taggyReports")
            ) || [];


        if (reports.length === 0) {

            reportList.innerHTML = `
                <div class="empty">
                    Todavía no hay reportes.
                </div>
            `;

            return;

        }


        reportList.innerHTML = "";


        reports.forEach(function(report) {

            let article =
                document.createElement("article");


            article.className =
                "report";


            article.innerHTML = `

                <span class="tag">
                    MASCOTA DESAPARECIDA
                </span>

                <h3>
                    ${esc(report.name)}
                </h3>

                <p>
                    <strong>Zona:</strong>
                    ${esc(report.zone)}
                </p>

                <p>
                    ${esc(report.description)}
                </p>

                <p>
                    <strong>Contacto:</strong>
                    ${esc(report.contact)}
                </p>

            `;


            reportList.appendChild(article);

        });

    }


    reportForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const data =
                new FormData(reportForm);


            let reports =
                JSON.parse(
                    localStorage.getItem("taggyReports")
                ) || [];


            reports.unshift({

                name:
                    data.get("name"),

                zone:
                    data.get("zone"),

                description:
                    data.get("description"),

                contact:
                    data.get("contact")

            });


            localStorage.setItem(
                "taggyReports",
                JSON.stringify(reports)
            );


            reportForm.reset();


            showReports();


            alert(
                "¡El reporte fue publicado!"
            );

        }
    );


    showReports();

}


/* =================================
   FORO
================================= */

const forumForm =
    document.getElementById("forumForm");

const forumList =
    document.getElementById("forumList");


if (forumForm && forumList) {


    function showPosts() {

        let posts =
            JSON.parse(
                localStorage.getItem("taggyForum")
            ) || [];


        if (posts.length === 0) {

            forumList.innerHTML = `
                <div class="empty">
                    Todavía no hay preguntas.
                </div>
            `;

            return;

        }


        forumList.innerHTML = "";


        posts.forEach(function(post) {

            let article =
                document.createElement("article");


            article.className =
                "forum-post";


            article.innerHTML = `

                <span class="tag">
                    ${esc(post.topic)}
                </span>

                <h3>
                    ${esc(post.title)}
                </h3>

                <p>
                    ${esc(post.body)}
                </p>

                <small>
                    Publicado por
                    ${esc(post.author)}
                </small>

            `;


            forumList.appendChild(article);

        });

    }


    forumForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const data =
                new FormData(forumForm);


            let posts =
                JSON.parse(
                    localStorage.getItem("taggyForum")
                ) || [];


            posts.unshift({

                topic:
                    data.get("topic"),

                title:
                    data.get("title"),

                body:
                    data.get("body"),

                author:
                    data.get("author") ||
                    "Usuario TAGGY"

            });


            localStorage.setItem(
                "taggyForum",
                JSON.stringify(posts)
            );


            forumForm.reset();


            showPosts();


            alert(
                "¡Tu pregunta fue publicada!"
            );

        }
    );


    showPosts();

}


/* =================================
   CONTACTO
================================= */

const contactForm =
    document.getElementById("contactForm");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            contactForm.reset();


            alert(
                "¡Gracias por contactar a TAGGY!"
            );

        }
    );

}
/* ========================================
   TIENDA TAGGY
======================================== */


// Obtener carrito

function getCart() {

    return JSON.parse(
        localStorage.getItem("taggyCart")
    ) || [];

}


// Guardar carrito

function saveCart(cart) {

    localStorage.setItem(
        "taggyCart",
        JSON.stringify(cart)
    );

    updateCartCount();

}


// Contador del carrito

function updateCartCount() {

    const cart = getCart();

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const cartCount = document.getElementById("cartCount");

    if (cartCount) {
        cartCount.textContent = totalItems;
    }

}


// Agregar producto

document.querySelectorAll(".add-cart").forEach(button => {

    button.addEventListener("click", function() {

        const product = {

            id: this.dataset.id,

            name: this.dataset.name,

            price: Number(this.dataset.price),

            image: this.dataset.image,

            quantity: 1

        };


        const cart = getCart();


        const existingProduct = cart.find(
            item => item.id === product.id
        );


        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push(product);

        }


        saveCart(cart);


        // Cambiar temporalmente el botón

        const originalText = this.textContent;

        this.textContent = "✓ Agregado";

        setTimeout(() => {

            this.textContent = originalText;

        }, 1200);

    });

});


/* ========================================
   MOSTRAR CARRITO
======================================== */

function renderCart() {

    const container =
        document.getElementById("cartItems");


    if (!container) {
        return;
    }


    const cart = getCart();


    container.innerHTML = "";


    // Carrito vacío

    if (cart.length === 0) {

        container.innerHTML = `

            <div class="empty-cart">

                <h3>
                    Tu carrito está vacío 🐾
                </h3>

                <p>
                    Todavía no has agregado ningún collar TAGGY.
                </p>

                <a
                    href="comprar.html"
                    class="button primary"
                >
                    Ver collares
                </a>

            </div>

        `;

        updateCartTotals();

        return;

    }


    // Crear productos

    cart.forEach(item => {

        const product = document.createElement("div");

        product.className = "cart-item";


        product.innerHTML = `

            <img
                src="${item.image}"
                class="cart-item-image"
                alt="${item.name}"
            >


            <div class="cart-item-info">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    Collar TAGGY personalizable
                </p>


                <div class="cart-actions">

                    <button
                        class="quantity-button"
                        onclick="changeQuantity('${item.id}', -1)"
                    >
                        −
                    </button>


                    <strong>
                        ${item.quantity}
                    </strong>


                    <button
                        class="quantity-button"
                        onclick="changeQuantity('${item.id}', 1)"
                    >
                        +
                    </button>


                    <button
                        class="remove-item"
                        onclick="removeFromCart('${item.id}')"
                    >
                        Eliminar
                    </button>

                </div>

            </div>


            <div class="cart-item-price">

                $${item.price * item.quantity} MXN

            </div>

        `;


        container.appendChild(product);

    });


    updateCartTotals();

}


/* ========================================
   CAMBIAR CANTIDAD
======================================== */

function changeQuantity(id, change) {

    const cart = getCart();


    const product = cart.find(
        item => item.id === id
    );


    if (!product) {
        return;
    }


    product.quantity += change;


    if (product.quantity <= 0) {

        const index = cart.findIndex(
            item => item.id === id
        );

        cart.splice(index, 1);

    }


    saveCart(cart);

    renderCart();

}


/* ========================================
   ELIMINAR PRODUCTO
======================================== */

function removeFromCart(id) {

    let cart = getCart();


    cart = cart.filter(
        item => item.id !== id
    );


    saveCart(cart);

    renderCart();

}


/* ========================================
   TOTAL
======================================== */

function updateCartTotals() {

    const cart = getCart();


    const total = cart.reduce(

        (sum, item) =>
            sum + item.price * item.quantity,

        0

    );


    const subtotal =
        document.getElementById("cartSubtotal");

    const totalElement =
        document.getElementById("cartTotal");


    if (subtotal) {

        subtotal.textContent =
            `$${total} MXN`;

    }


    if (totalElement) {

        totalElement.textContent =
            `$${total} MXN`;

    }

}


/* ========================================
   CHECKOUT
======================================== */

const checkoutForm =
    document.getElementById("checkoutForm");


if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const cart = getCart();


            if (cart.length === 0) {

                alert(
                    "Primero agrega un collar a tu carrito."
                );

                return;

            }


            // Crear número de pedido

            const orderNumber =
                "TAGGY-" +
                Math.floor(
                    100000 + Math.random() * 900000
                );


            // Información del pedido

            const order = {

                orderNumber: orderNumber,

                date: new Date().toLocaleString(),

                products: cart,

                pet: {

                    name:
                        document.getElementById("petName").value,

                    size:
                        document.getElementById("collarSize").value,

                    phone:
                        document.getElementById("tagPhone").value,

                    textColor:
                        document.getElementById("textColor").value,

                    notes:
                        document.getElementById("customNotes").value

                },

                customer: {

                    name:
                        document.getElementById("customerName").value,

                    email:
                        document.getElementById("customerEmail").value,

                    phone:
                        document.getElementById("customerPhone").value

                },

                address: {

                    street:
                        document.getElementById("street").value,

                    number:
                        document.getElementById("houseNumber").value,

                    neighborhood:
                        document.getElementById("neighborhood").value,

                    zip:
                        document.getElementById("zipCode").value,

                    city:
                        document.getElementById("city").value,

                    state:
                        document.getElementById("state").value,

                    references:
                        document.getElementById("references").value

                }

            };


            // Guardar pedido

            const orders =
                JSON.parse(
                    localStorage.getItem("taggyOrders")
                ) || [];


            orders.push(order);


            localStorage.setItem(
                "taggyOrders",
                JSON.stringify(orders)
            );


            // Vaciar carrito

            localStorage.removeItem("taggyCart");


            updateCartCount();

            renderCart();


            // Mostrar confirmación

            const success =
                document.getElementById("purchaseSuccess");

            const orderNumberElement =
                document.getElementById("orderNumber");


            orderNumberElement.textContent =
                orderNumber;


            checkoutForm.style.display = "none";

            success.classList.add("show");


            success.scrollIntoView({
                behavior: "smooth"
            });

        }
    );

}


/* ========================================
   INICIAR
======================================== */

updateCartCount();

renderCart();

/* ========================================
   ANIMACIONES PRO
======================================== */
(function(){
const header=document.querySelector('header'),bar=document.querySelector('.progress');
addEventListener('scroll',()=>{
  if(header)header.classList.toggle('scrolled',scrollY>20);
  if(bar){const h=document.documentElement;bar.style.width=(scrollY/(h.scrollHeight-h.clientHeight||1)*100)+'%'}
},{passive:true});

const sel='.section-title,.page-title>*,.card,.product-card,.vet-card,.form-card,.side-card,.contact-info,.alliance-box,.shop-info,.cart-summary,.checkout-card,.stat,.faq-list details,.cta-band,.marquee';
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;const el=e.target;el.classList.add('in');io.unobserve(el);
  setTimeout(()=>el.classList.remove('reveal','in'),1300);
}),{threshold:.12});
document.querySelectorAll(sel).forEach(el=>{
  const i=[...el.parentElement.children].indexOf(el);
  el.style.setProperty('--d',Math.min(i,5)*.1+'s');el.classList.add('reveal');io.observe(el);
});

/* contadores */
const co=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;co.unobserve(e.target);
  const el=e.target,end=+el.dataset.count,pre=el.dataset.prefix||'',suf=el.dataset.suffix||'',t0=performance.now();
  (function step(n){const k=Math.min((n-t0)/1500,1),v=Math.round(end*(1-Math.pow(1-k,3)));
    el.textContent=pre+v+suf;if(k<1)requestAnimationFrame(step)})(t0);
}),{threshold:.6});
document.querySelectorAll('.count').forEach(el=>co.observe(el));

/* inclinación 3D en tarjetas */
if(matchMedia('(hover:hover)').matches)document.querySelectorAll('.product-card,.vet-card').forEach(c=>{
  c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    c.style.transition='transform .1s';c.style.transform=`perspective(800px) rotateY(${x*8}deg) rotateX(${-y*8}deg) translateY(-8px)`});
  c.addEventListener('mouseleave',()=>{c.style.transition='transform .4s';c.style.transform=''});
});

/* huellitas al hacer clic */
addEventListener('click',e=>{
  if(e.target.closest('a,input,textarea,select'))return;
  const p=document.createElement('span');p.className='paw';p.textContent='🐾';
  p.style.left=e.clientX-12+'px';p.style.top=e.clientY-12+'px';p.style.setProperty('--r',(Math.random()*60-30)+'deg');
  document.body.appendChild(p);setTimeout(()=>p.remove(),1000);
});
})();
