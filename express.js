import { MercadoPagoConfig, Payment } from 'mercadopago';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config(); // Carregar variáveis de ambiente do arquivo .env

const app = express();
app.use(bodyParser.json());

// Inicializar o cliente com o access token
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
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
      title: item.title, // Alterado para 'title'
      description: item.description, // Adicionado descrição
      currency_id: "BRL", // Corrigido para moeda brasileira
      unit_price: item.unit_price,
      quantity: item.quantity
    })),
    back_urls: {
      success: 'https://www.your-site.com/success',
      failure: 'https://www.your-site.com/failure',
      pending: 'https://www.your-site.com/pending'
    },
    auto_return: 'approved',
    payment_methods: {
      excluded_payment_methods: [],
      excluded_payment_types: []
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

// Endpoint para receber notificações do Mercado Pago
app.post('/notifications', (req, res) => {
  const notification = req.body;

  // Processar a notificação conforme necessário
  console.log('Notificação recebida:', notification);

  // Responder ao Mercado Pago para confirmar o recebimento da notificação
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
