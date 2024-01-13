import React from 'react'
import { SignIn } from '@clerk/nextjs'

const SignInPage = () => (
	<div className="h-[90vh] w-[100vw] flex justify-center items-center">
		<SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" redirectUrl="/" />
	</div>
)

// TODO: Add custom layout here
// SignInPage.getLayout = (page: React.ReactChild) => <>{page}</>

export default SignInPage
