import Link from "next/link";

function Footer() {
  return (
    <footer className="w-full bg-gray-800 text-white py-4 text-center">
      <p className="mb-2">&copy; 2024 Seedas. Todos los derechos reservados.</p>
      <div className="flex justify-center space-x-4">
        <Link href="/suppoliPage" legacyBehavior>
          <a className="hover:underline">Política de Privacidad</a>
        </Link>
        <Link href="/supserviPage" legacyBehavior>
          <a className="hover:underline">Términos de Servicio</a>
        </Link>
        <Link href="/supconPage" legacyBehavior>
          <a className="hover:underline">Contacto</a>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
