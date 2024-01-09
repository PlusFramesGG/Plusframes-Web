import React, { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/router'
import { Turn as Hamburger } from 'hamburger-react'
import Drawer from './Drawer'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

type CustomHeaderProps = {
	toggled: boolean
	toggle: (newIsOpenVal: boolean) => void
}

const CustomHeader = ({ toggled, toggle }: CustomHeaderProps) => {
	const router = useRouter()

	const headerText = router.pathname.includes('/combo-builder')
		? 'Combo Builder'
		: router.pathname.includes('/my-dashboard')
		? 'Dashboard'
		: 'Home'

	return (
		<header className="relative">
			<div className="navbar bg-[#5869A1] text-white">
				<div className="navbar-start">
					<a className="btn btn-ghost text-xl">PlusFrames.GG</a>
				</div>
				<div>
					<h1 className="text-xl navbar-center">{headerText}</h1>
				</div>
				<div className="navbar-end">
					<div className="mr-4">
						<SignedIn>
							<UserButton />
						</SignedIn>
						<SignedOut>
							<SignInButton />
						</SignedOut>
					</div>
					<Hamburger toggled={toggled} toggle={() => toggle(!toggled)} />
				</div>
			</div>
			<Drawer isOpen={toggled} setIsOpen={() => toggle(false)} />
		</header>
	)
}

export default CustomHeader
