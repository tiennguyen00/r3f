import {
  NextComponentType,
  NextLayoutComponent,
  NextLayoutComponentType,
} from "next"
import { AppProps } from "next/app"

declare module "next" {
  type NextLayoutComponentType<P = {}> = NextComponentType<
    NextPageContext,
    any,
    P
  > & { getLayout?: (page: ReactNode) => ReactNode }
}
// ComponentType<P>

declare module "next/app" {
  type AppLayoutProps<P = {}> = AppProps & {
    Component: NextLayoutComponentType
  }
}
