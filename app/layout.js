import './globals.css'

export const metadata = {
  title: 'Reportes Grupo Ceviche',
  description: 'Panel de reportes internos',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
