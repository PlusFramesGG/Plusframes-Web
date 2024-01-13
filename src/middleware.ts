import { authMiddleware, redirectToSignIn } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

const beforeAuthMiddleware = (req: NextRequest) => {
	// TODO: Wire up
}

export default authMiddleware({
	// TODO: Determine all public routes when we go live
	publicRoutes: ['/'],
	beforeAuth: (req) => {
		// Execute next-intl middleware before Clerk's auth middleware
		return beforeAuthMiddleware(req)
	},
	afterAuth(auth, req, evt) {
		console.log('process.env.NODE_EVN', process.env.NODE_ENV)
		// console.log(`User ID: ${auth.userId ?? 'none'}`)

		if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
			console.log('here')
			if (!auth.userId && !auth.isPublicRoute) {
				return redirectToSignIn({ returnBackUrl: req.url })
			}

			// TODO: Change this redirect to their dashboard eventually
			if (auth.userId) {
				const comboBuilder = new URL('/app/combo-builder', req.url)
				return NextResponse.redirect(comboBuilder)
			}
		}
	}
})

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
