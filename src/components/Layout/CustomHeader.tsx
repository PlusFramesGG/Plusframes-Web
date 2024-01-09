import React, { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/router'
import { Turn as Hamburger } from 'hamburger-react'
import Drawer from './Drawer'

type CustomHeaderProps = {
	toggled: boolean
	toggle: Dispatch<SetStateAction<boolean>>
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
			<div className="navbar bg-base-100 relative">
				<div className="navbar-start">
					<a className="btn btn-ghost text-xl">PlusFrames.GG</a>
				</div>
				<div>
					<h1 className="text-xl navbar-center">{headerText}</h1>
				</div>
				<div className="navbar-end">
					<Hamburger toggled={toggled} toggle={toggle} />
				</div>
			</div>
			<Drawer isOpen={toggled} setIsOpen={toggle} />
		</header>
	)
}

export default CustomHeader
