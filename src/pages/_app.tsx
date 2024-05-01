import ErrorBoundary from '@/components/General/ErrorBoundary'
import MainLayout from '@/components/Layout/'
import '@/styles/globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { NextPage, NextPageContext } from 'next'
import App, { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import cookie from 'cookie'
import { APIMethods, TypeOfPerson } from '@/shared/types'
import * as os from 'os';

export type NextPageWithLayout<P = Record<string, any>, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
	ctx: NextPageContext
}

// TODO: Figure out how to optimize user agent stuffs for SEO
// @ts-ignore
class MyApp extends App<AppPropsWithLayout> {
	static async getInitialProps({ Component, ctx }: AppPropsWithLayout) {
		if (process.env.NODE_ENV !== 'production') return {}
		let pageProps = {}

		if (ctx.req) {
			const cookies = cookie.parse(ctx.req?.headers.cookie || '')

			if (!cookies.fbid) {
				const ip = ctx.req?.headers['x-forwarded-for'] || ctx.req?.socket.remoteAddress
				const userAgent = ctx.req?.headers['user-agent']
				const referrer = ctx.req?.headers['referer'] || 'Direct/No Referrer'
				// TODO replace with actual deployed url
				// const ingestionEngineAPILocation =
				// 	process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'http://localhost:3001'
				const ingestionEngineAPILocation: string = os.hostname();
				//const ingestionEngineAPILocation = process.env.USER_INGESTION_API_LOCATION!
				console.log("ingestionEngineAPILocation="+ingestionEngineAPILocation)

				const userDataPayload = {
					ip,
					userAgent,
					referrer,
					applicationSource: 'Plusframes Web',
					typeOfPerson: TypeOfPerson.VISITOR
				}

				const bodyPayload = JSON.stringify(userDataPayload);
				console.log('Payload Length:', bodyPayload.length);
				console.log('Payload:', bodyPayload);

				const request = await fetch(`${ingestionEngineAPILocation}/ingest`, {
					method: APIMethods.POST,
					headers: {
						'Content-Type': 'application/json'
					},
					body: bodyPayload
				})
				const response = await request.json()
				const { user_id } = response.data

				if (!user_id) {
					console.error('Unable to grab user ID from ingest service')
				} else {
					ctx.res?.setHeader(
						'Set-Cookie',
						cookie.serialize('fbid', JSON.stringify(user_id), {
							maxAge: 60 * 60 * 24 * 7 * 4,
							path: '/'
						})
					)
				}
			}
		}

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx)
		}

		return { pageProps }
	}

	render() {
		const { Component, pageProps } = this.props
		const renderWithLayout = Component.getLayout || ((page: ReactNode) => <MainLayout>{page}</MainLayout>)
		return (
			<ErrorBoundary>
				<ClerkProvider {...pageProps}>{renderWithLayout(<Component {...pageProps} />)}</ClerkProvider>
			</ErrorBoundary>
		)
	}
}

export default MyApp
