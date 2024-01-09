import React from 'react'
import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => (
	<div className="h-[90vh] w-[100vw] flex justify-center items-center">
		<SignUp path="/auth/sign-up" routing="hash" signInUrl="/auth/sign-in" redirectUrl="/" />
	</div>
)

// TODO: Add custom layout here
// SignUpPage.getLayout = (page: React.ReactChild) => <>{page}</>

export default SignUpPage
