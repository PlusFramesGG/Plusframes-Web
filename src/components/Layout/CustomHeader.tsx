import React from 'react'
import { useRouter } from 'next/router'
import { Turn as Hamburger } from 'hamburger-react'
import Drawer from './Drawer'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from '@material-tailwind/react'

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
			<Navbar className="w-full flex items-center bg-dark-subtle  px-4 container mx-auto">
				<div className="flex items-center">
					<Link href="/" className="btn btn-ghost text-xl md:hidden">
						<Image alt="The PlusFramesGG Logo" width={41} height={300} src="/Assets/Logos/pf-logo-small.png" />
					</Link>
					<Link href="/" className="btn btn-ghost text-xl hidden md:inline-flex">
						<Image alt="The PlusFramesGG Logo" width={200} height={300} src="/Assets/Logos/pf-logo-wide.png" />
					</Link>
				</div>

				<div className="flex-grow text-center">
					<ul className="flex justify-center space-x-4"></ul>
				</div>

				<div className="flex items-center">
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
			</Navbar>
			<Drawer isOpen={toggled} setIsOpen={() => toggle(false)} />
		</header>
	)
}

export default CustomHeader
