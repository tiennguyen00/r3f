import type { NextComponentType } from "next"
import type { AppContext, AppInitialProps, AppLayoutProps } from "next/app"
import { ReactNode } from "react"

const App: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
  Component,
  pageProps,
}: AppLayoutProps) => {
  const getLayout = Component.getLayout || ((page: ReactNode) => page)
  return getLayout(<Component {...pageProps} />)
}
export default App
