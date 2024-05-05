import { authMiddleware, redirectToSignIn } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

const beforeAuthMiddleware = (req: NextRequest) => {
	// TODO: Wire up
	return NextResponse.next(); 
}

export default authMiddleware({
	// TODO: Determine all public routes when we go live
	publicRoutes: ['/','/app/combo-builder/SF6/:path*','/api/:path*'],
	beforeAuth: (req) => {
		// Execute next-intl middleware before Clerk's auth middleware
		return beforeAuthMiddleware(req)
	},
	afterAuth: async (auth, req, evt) => {
		// TODO: Remove before go live
		if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
			
			if (!auth.userId && !auth.isPublicRoute) {
				return redirectToSignIn({ returnBackUrl: req.url })
			}

			// TODO: Figure out the too many redirects situation here
			// if (auth.userId) {
			// 	const comboBuilder = new URL('/app/combo-builder/SF6/ryu/moves', req.url)
			// 	return NextResponse.redirect(comboBuilder)
			// }
		}
	}
})

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
