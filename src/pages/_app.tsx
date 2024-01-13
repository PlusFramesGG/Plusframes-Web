import ErrorBoundary from '@/components/General/ErrorBoundary'
import Layout from '@/components/Layout'
import '@/styles/globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'

export type NextPageWithLayout<P = Record<string, any>, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	// TODO: Add base layout
	const renderWithLayout = Component.getLayout || ((page: ReactNode) => <Layout>{page}</Layout>)
	return (
		<ErrorBoundary>
			<ClerkProvider {...pageProps} signInUrl="/sign-in">
				{renderWithLayout(<Component {...pageProps} />)}
			</ClerkProvider>
		</ErrorBoundary>
	)
}
