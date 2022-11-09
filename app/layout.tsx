import Link from "next/link"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        {" "}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link href="/tool" replace>
            <button
              style={{
                background: "orange",
                padding: "2px 4px",
                borderRadius: "1.5px",
                color: "black",
                marginRight: "2px",
              }}
            >
              Wallpaper tool
            </button>
          </Link>
          <Link href="/three_md" replace>
            <button
              style={{
                background: "orange",
                padding: "2px 4px",
                borderRadius: "1.5px",
                color: "black",
                marginRight: "2px",
              }}
            >
              Three
            </button>
          </Link>
        </div>{" "}
        {children}
      </body>
    </html>
  )
}
