import "@styles/globals.css"

export const metadata = {
  title: 'Dorm Buddy',
  description: 'Buddy for your dorm',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="icon.png" sizes="any" />
      </head>
      <body>{children}</body>
    </html>
  )
}
