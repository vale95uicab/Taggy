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



/* ========================================
   FUNCIONES COMUNES
======================================== */
function escapeHTML(x){const d=document.createElement("div");d.textContent=x||"";return d.innerHTML}
function resizeImage(file,cb){const r=new FileReader();r.onload=e=>{const i=new Image();i.onload=()=>{const s=Math.min(1,700/Math.max(i.width,i.height)),c=document.createElement("canvas");c.width=i.width*s;c.height=i.height*s;c.getContext("2d").drawImage(i,0,0,c.width,c.height);cb(c.toDataURL("image/jpeg",.8))};i.src=e.target.result};r.readAsDataURL(file)}
function readList(k){try{return JSON.parse(localStorage.getItem(k))||[]}catch(e){return[]}}

/* ========================================
   REPORTAR MASCOTA (formulario)
======================================== */
const reportForm=document.getElementById("reportForm");
if(reportForm){
  const pi=document.getElementById("reportPhoto"),pv=document.getElementById("photoPreview");let photo="";
  pi.addEventListener("change",()=>{const f=pi.files[0];if(!f){photo="";pv.classList.remove("show");return}resizeImage(f,d=>{photo=d;pv.src=d;pv.classList.add("show")})});
  reportForm.addEventListener("submit",e=>{e.preventDefault();const d=new FormData(reportForm),a=readList("taggyReports");
    a.unshift({name:d.get("name"),type:d.get("type"),size:d.get("size"),breed:d.get("breed"),desc:d.get("description"),collar:d.get("collar"),taggy:d.get("taggy")?1:0,zone:d.get("zone"),date:d.get("date"),reward:d.get("reward"),contact:d.get("contact"),photo});
    try{localStorage.setItem("taggyReports",JSON.stringify(a))}catch(x){alert("No hay espacio para guardar la foto. Prueba con una imagen más pequeña.");return}
    reportForm.reset();pv.classList.remove("show");photo="";document.getElementById("afterReport").classList.add("show");alert("¡El reporte fue publicado!")});
}

/* ========================================
   MASCOTAS PERDIDAS (lista)
======================================== */
const lostGrid=document.getElementById("lostGrid");
if(lostGrid){
  const SIM=[
   {name:"Catalino",type:"Perro",breed:"Shih Tzu",size:"Chico",desc:"Pelo negro y gris con las patas blancas. Es amigable con niños y otros perros.",collar:"Arnés azul de lunares con placa TAGGY",taggy:1,zone:"Fracc. Los Héroes, Mérida",date:"2026-11-17",reward:"$1,000 MXN",contact:"999 123 4567",photo:"catalino.jpg"},
   {name:"Nieve",type:"Perro",breed:"",size:"Mediano",desc:"Pelaje blanco y nariz oscura. Es muy tranquila y amigable. Lleva una camiseta rosa.",collar:"Sin collar visible",taggy:0,zone:"Francisco de Montejo, Mérida",date:"2026-11-16",reward:"",contact:"999 000 0000",photo:"perra.png"},
   {name:"Canela",type:"Perro",breed:"Vizsla",size:"Grande",desc:"Pelo corto color cobre. Es activa y muy cariñosa.",collar:"Collar verde olivo con hebilla dorada",taggy:0,zone:"Itzimná, Mérida",date:"2026-11-15",reward:"$500 MXN",contact:"999 111 1111",photo:"perro_perdido.jpg"},
   {name:"Misi",type:"Gato",breed:"",size:"Chico",desc:"Gato blanco con manchas. Es tímido y se esconde cuando hay ruido.",collar:"Collar naranja con placa TAGGY",taggy:1,zone:"Centro, Mérida",date:"2026-11-14",reward:"",contact:"999 222 2222",photo:"gato.png"}];
  const card=r=>{const ph=r.photo?`<img src="${r.photo}" alt="Foto de ${escapeHTML(r.name)}">`:`<div class="noph">${r.type=="Gato"?"🐱":"🐶"}</div>`,
   chips=[r.type,r.breed,r.size].filter(Boolean).map(x=>`<span>${escapeHTML(x)}</span>`).join("")+(r.taggy?"<span>Placa TAGGY</span>":""),
   dg=String(r.contact||"").replace(/\D/g,""),c=String(r.contact||""),
   act=dg.length>=10?`<a class="button primary" href="tel:+52${dg.slice(-10)}">📞 Llamar al dueño</a>`:c.includes("@")?`<a class="button primary" href="mailto:${escapeHTML(c)}">✉ Escribir al dueño</a>`:"",
   dt=r.date?new Date(r.date+"T12:00").toLocaleDateString("es-MX",{day:"numeric",month:"long"}):"";
   return `<article class="recent-card"><div class="recent-photo">${ph}<span class="recent-badge">SE BUSCA</span></div><div class="recent-info"><h3>${escapeHTML(r.name)}</h3><div class="chips">${chips}</div><p><strong>Zona:</strong> ${escapeHTML(r.zone)}${dt?" · "+dt:""}</p><p>${escapeHTML(r.desc||r.description)}</p>${r.collar?`<p><strong>Collar:</strong> ${escapeHTML(r.collar)}</p>`:""}${r.reward?`<span class="reward">💰 Recompensa: ${escapeHTML(r.reward)}</span>`:""}<p><strong>Contacto:</strong> ${escapeHTML(c)}</p>${act}</div></article>`};
  const all=[...readList("taggyReports"),...SIM],q=document.getElementById("lostSearch");
  function draw(){const v=(q.value||"").toLowerCase(),l=all.filter(r=>[r.name,r.breed,r.zone,r.type].join(" ").toLowerCase().includes(v));
    lostGrid.innerHTML=l.map(card).join("")||'<div class="empty">No hay mascotas perdidas con esa búsqueda.</div>';
    document.getElementById("lostCount").textContent=l.length+(l.length==1?" mascota perdida":" mascotas perdidas")}
  q.addEventListener("input",draw);draw();
}

/* ========================================
   FORO
======================================== */
const forumForm=document.getElementById("forumForm"),forumList=document.getElementById("forumList");
if(forumForm&&forumList){
  const FS=[
   {topic:"TAGGY",title:"¿Qué información lleva mi TAGGY?",body:"Estoy por comprar un collar y quiero saber qué datos se le ponen antes de pedirlo.",author:"Equipo TAGGY",answer:"Al personalizar tu pedido eliges el nombre de tu mascota, el teléfono de contacto y el color del texto. También puedes dejar indicaciones especiales. Revisa bien el teléfono antes de confirmar, porque es el dato que usará quien encuentre a tu mascota para avisarte."},
   {topic:"Identificación",title:"¿Cómo activo la placa de mi mascota?",body:"Ya recibí mi collar. ¿Qué hago para activar la placa?",author:"Equipo TAGGY",answer:"Entra a Instrucciones y sigue los cinco pasos: vincula la placa, verifica la información, colócala en el collar, ajusta el collar y revisa la placa con frecuencia."},
   {topic:"Cuidados",title:"¿Cómo sé si el collar le queda bien?",body:"No sé si el collar de mi mascota está muy apretado o muy flojo.",author:"Equipo TAGGY",answer:"Debe quedar cómodo, sin apretar. Si puedes pasar dos dedos entre el collar y el cuello de tu mascota, la medida es correcta."}];
  const post=p=>`<article class="faq-post"><span class="tag">${escapeHTML(p.topic)}</span><h3>${escapeHTML(p.title)}</h3><p class="faq-question">${escapeHTML(p.body)}</p>${p.answer?`<div class="faq-answer"><strong>${escapeHTML(p.author)}</strong><p>${escapeHTML(p.answer)}</p></div>`:`<small>Publicado por ${escapeHTML(p.author)}</small>`}</article>`;
  const show=()=>{forumList.innerHTML=[...readList("taggyForum"),...FS].map(post).join("")};
  forumForm.addEventListener("submit",e=>{e.preventDefault();const d=new FormData(forumForm),a=readList("taggyForum");
    a.unshift({topic:d.get("topic"),title:d.get("title"),body:d.get("body"),author:d.get("author")||"Usuario TAGGY"});
    localStorage.setItem("taggyForum",JSON.stringify(a));forumForm.reset();show();alert("¡Tu pregunta fue publicada!")});
  show();
}

/* ========================================
   CONTACTO
======================================== */
const contactForm=document.getElementById("contactForm");
if(contactForm)contactForm.addEventListener("submit",e=>{e.preventDefault();contactForm.reset();alert("¡Gracias por contactar a TAGGY!")});

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

/* talla del collar según el producto del carrito */
(function(){const cs=document.getElementById("collarSize");if(!cs)return;const n=getCart().map(i=>i.name).join(" ");cs.value=/Chico/.test(n)?"CH":/Mediano/.test(n)?"M":/Grande/.test(n)?"G":""})();

/* ========================================
   ANIMACIONES PRO
======================================== */
(function(){
const header=document.querySelector('header'),bar=document.querySelector('.progress');
addEventListener('scroll',()=>{
  if(header)header.classList.toggle('scrolled',scrollY>20);
  if(bar){const h=document.documentElement;bar.style.width=(scrollY/(h.scrollHeight-h.clientHeight||1)*100)+'%'}
},{passive:true});

const sel='.section-title,.page-title>*,.card,.product-card,.vet-card,.form-card,.side-card,.contact-info,.alliance-box,.shop-info,.cart-summary,.checkout-card,.stat,.faq-post,.cta-band,.marquee,.nfc-section,.recent-card,.mini-phone';
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
