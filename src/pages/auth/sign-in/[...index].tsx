import React from 'react'
import { SignIn } from '@clerk/nextjs'

const SignInPage = () => (
	<div className="h-[100vh] w-[100vw] flex justify-center items-center">
		<SignIn path="/auth/sign-in" routing="path" signUpUrl="/auth/sign-up" redirectUrl="/" />
	</div>
)

// TODO: Add layout here
SignInPage.getLayout = (page: React.ReactChild) => <>{page}</>

export default SignInPage
