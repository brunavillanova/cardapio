import { MercadoPagoConfig, Payment } from 'mercadopago';

// Inicializar o cliente com o access token
const client = new MercadoPagoConfig({
  accessToken: 'TEST-1924363577123740-090508-308c0769ea53379c2b3ba1cdf4979581-216949229',
  options: { timeout: 5000 }
});

// Inicializar o objeto de pagamento
const payment = new Payment(client);

// Rota para criar uma preferência de pagamento
app.post('/create-payment', async (req, res) => {
  const { items, address } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).send('Itens inválidos.');
  }

  if (!address || typeof address !== 'string') {
    return res.status(400).send('Endereço inválido.');
  }

  // Criar o objeto de requisição
  const body = {
    items: items.map(item => ({
      title: item.name,
      unit_price: item.price,
      quantity: item.quantity
    })),
    back_urls: {
      success: 'https://www.your-site.com/success',
      failure: 'https://www.your-site.com/failure',
      pending: 'https://www.your-site.com/pending'
    },
    auto_return: 'approved',
    payment_methods: {
      excluded_payment_methods: [{ id: 'ticket' }],
      excluded_payment_types: [{ id: 'credit_card' }]
    },
    notification_url: 'https://www.your-site.com/notifications'
  };

  try {
    console.log('Criando preferência com os seguintes dados:', body);
    const response = await payment.create({ body });
    console.log('Resposta da API do Mercado Pago:', response);
    res.json({ init_point: response.init_point });
  } catch (error) {
    console.error('Erro ao criar a preferência de pagamento:', error.response ? error.response.data : error.message);
    res.status(500).send('Erro ao criar a preferência de pagamento.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
