// Selecionar elementos do DOM
const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");
const paymentWarn = document.getElementById("payment-warn");

// Array para armazenar itens do carrinho
let cart = [];

// Abrir o modal do carrinho
cartBtn.addEventListener("click", function () {
  updateCartModal();
  cartModal.style.display = "flex";
});

// Fechar o modal quando clicar fora dele
cartModal.addEventListener("click", function (event) {
  if (event.target === cartModal) {
    cartModal.style.display = "none";
  }
});

// Fechar o modal ao clicar no botão "Fechar"
closeModalBtn.addEventListener("click", function () {
  cartModal.style.display = "none";
});

// Adicionar itens ao carrinho ao clicar no botão
menu.addEventListener("click", function (event) {
  const parentButton = event.target.closest(".add-to-cart-btn");
  if (parentButton) {
    const name = parentButton.getAttribute("data-name");
    const price = parseFloat(parentButton.getAttribute("data-price"));
    addToCart(name, price);
  }
});

// Função para adicionar itens ao carrinho
function addToCart(name, price) {
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1; // Se o item já existe, aumenta a quantidade
  } else {
    cart.push({
      name,
      price,
      quantity: 1,
    });
  }

  updateCartModal(); // Atualiza o modal após a adição
}

// Função para atualizar o modal do carrinho
function updateCartModal() {
  cartItemsContainer.innerHTML = ""; // Limpa o conteúdo existente
  let total = 0;
  let totalItems = 0;

  cart.forEach((item) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col");

    cartItemElement.innerHTML = `
      <div class="flex items-center justify-between">
        <div>
          <p class="font-medium">${item.name}</p>
          <p>Qtd: ${item.quantity}</p>
          <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
        </div>
        <button class="remove-from-cart-btn" data-name="${item.name}">
          Remover
        </button>
      </div>
    `;

    total += item.price * item.quantity;
    totalItems += item.quantity;

    cartItemsContainer.appendChild(cartItemElement);
  });

  cartTotal.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  cartCounter.innerHTML = totalItems; // Exibe o número total de itens
}

// Função para remover itens do carrinho
cartItemsContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-from-cart-btn")) {
    const name = event.target.getAttribute("data-name");
    removeItemCart(name);
  }
});

function removeItemCart(name) {
  const index = cart.findIndex((item) => item.name === name);

  if (index !== -1) {
    const item = cart[index];

    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      cart.splice(index, 1); // Remove o item completamente se a quantidade for 1
    }

    updateCartModal(); // Atualiza o modal após a remoção
  }
}

// Validar o campo de endereço
addressInput.addEventListener("input", function (event) {
  let inputValue = event.target.value;

  if (inputValue !== "") {
    addressInput.classList.remove("border-red-500");
    addressWarn.classList.add("hidden");
  }
});

// Função para finalizar o pedido
checkoutBtn.addEventListener("click", function () {
  const isOpen = checkRestaurantOpen();
  if (!isOpen) {
    showToast("Ops o restaurante está fechado!", "#ef4444");
    return;
  }

  if (cart.length === 0) return;

  if (addressInput.value === "") {
    addressWarn.classList.remove("hidden");
    addressInput.classList.add("border-red-500");
    return;
  }

  const paymentMethod = document.querySelector('input[name="payment-method"]:checked');
  if (!paymentMethod) {
    paymentWarn.classList.remove("hidden");
    return;
  } else {
    paymentWarn.classList.add("hidden");
  }

  // Enviar o pedido para o WhatsApp
  const cartItems = cart
    .map((item) => ` ${item.name} Quantidade: (${item.quantity}) Preço: R$${item.price} |`)
    .join("");

  const message = encodeURIComponent(
    `Pedido:\n${cartItems}\nForma de pagamento: ${paymentMethod.value.toUpperCase()}\nEndereço: ${addressInput.value}`
  );
  const phone = "+5511971552389"; // Substitua pelo número correto

  window.open(`https://wa.me/${phone}?text=${message}`, "_blank");

  // Limpar o carrinho e o formulário após o pedido
  cart = [];
  updateCartModal();
  addressInput.value = "";
});

// Função para exibir notificações (toast)
function showToast(message, backgroundColor) {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: backgroundColor,
    },
  }).showToast();
}

// Função para verificar se o restaurante está aberto
function checkRestaurantOpen() {
  const data = new Date();
  const hora = data.getHours();
  return hora >= 8 && hora < 22; // Exemplo: aberto das 16h às 22h
}

// Atualizar o status de "aberto" ou "fechado" do restaurante
const spanItem = document.getElementById("date-span");
const isOpen = checkRestaurantOpen();

if (isOpen) {
  spanItem.classList.remove("bg-red-500");
  spanItem.classList.add("bg-green-600");
} else {
  spanItem.classList.remove("bg-green-600");
  spanItem.classList.add("bg-red-500");
}
document.getElementById('payment-form').addEventListener('submit', async (e) => {
  e.preventDefault(); // Evita o comportamento padrão do formulário

  const response = await fetch('/create-payment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      items: [
        // Exemplo de itens
        { name: 'Produto A', price: 100.00, quantity: 1 }
      ],
      address: document.getElementById('address').value
    })
  });

  const data = await response.json();

  if (data.init_point) {
    window.location.href = data.init_point; // Redireciona para o Mercado Pago
  } else {
    alert('Erro ao processar o pagamento.');
  }
});