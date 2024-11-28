export default function Contact() {
    return (
      <div className="max-w-3xl mx-auto py-24 px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Contacto</h1>
        <p className="text-gray-700 mb-4">
          Si tienes preguntas sobre nuestras políticas, servicios o necesitas ayuda, puedes comunicarte con nosotros a través de los siguientes medios:
        </p>
        <ul className="list-none space-y-4">
          <li className="text-gray-700">
            <strong>Correo:</strong>{' '}
            <a href="mailto:soporte@seedas.com" className="text-blue-500 underline">
              soporte@seedas.com
            </a>
          </li>
          <li className="text-gray-700">
            <strong>Teléfono:</strong> +57 320 123 4567
          </li>
          <li className="text-gray-700">
            <strong>Dirección:</strong> Calle 123, Neiva, Huila, Colombia
          </li>
        </ul>
      </div>
    );
  }
  