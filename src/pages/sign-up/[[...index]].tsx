import React from 'react'
import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => (
	<div className="h-[90vh] w-[100vw] flex justify-center items-center">
		<SignUp path="/sign-up" routing="hash" signInUrl="/sign-in" redirectUrl="/" />
	</div>
)

// TODO: Add custom layout here
// SignUpPage.getLayout = (page: React.ReactChild) => <>{page}</>

export default SignUpPage
