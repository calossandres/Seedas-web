import mercadopago from 'mercadopago';

// Configura el SDK con el token de acceso directamente al instanciar mercadopago
mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, unit_price, quantity } = req.body;

    const preference = {
      items: [
        {
          title,
          unit_price,
          quantity,
        },
      ],
      back_urls: {
        success: 'https://tu-dominio.com/success',
        failure: 'https://tu-dominio.com/failure',
        pending: 'https://tu-dominio.com/pending',
      },
      auto_return: 'approved',
    };

    try {
      const response = await mercadopago.preferences.create(preference);
      res.status(200).json({ init_point: response.body.init_point });
    } catch (error) {
      console.error("Error al crear la preferencia:", error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
