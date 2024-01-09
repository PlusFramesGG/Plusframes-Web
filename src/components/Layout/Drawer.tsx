import Link from 'next/link'
import React, { Dispatch, SetStateAction } from 'react'
import { useOutsideClick } from '../Hooks/useOutsideClick'
import HolographicText from '../General/HolographicText'

type DrawerProps = {
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, setIsOpen }) => {
	const drawerRef = React.useRef(null)

	useOutsideClick(drawerRef, () => setIsOpen(false), ['hamburger-react'])

	return (
		<div
			ref={drawerRef}
			className={`fixed top-0 left-0 h-full z-40 transform ${
				isOpen ? 'translate-x-0' : '-translate-x-full'
			} transition-transform duration-300 ease-in-out bg-[#7D6393] text-white w-64 p-6`}
		>
			<div className="mt-12 text-center mx-auto flex flex-col space-y-[42px]">
				<Link href="/" className="text-white text-[29px]">
					<HolographicText onClick={() => setIsOpen(false)}>Home</HolographicText>
				</Link>
				<Link href="/app/combo-builder" className="text-white text-[29px]">
					<HolographicText onClick={() => setIsOpen(false)}>Combo Builder</HolographicText>
				</Link>
				<Link href="/app/fantasy-league" className="text-white text-[29px]">
					<HolographicText onClick={() => setIsOpen(false)}>Fantasy Bracket</HolographicText>
				</Link>
				<Link href="/auth/sign-in" className="text-white text-[29px]">
					<HolographicText onClick={() => setIsOpen(false)}>Sign In</HolographicText>
				</Link>
				<Link href="/app/settings" className="text-white text-[29px]">
					<HolographicText onClick={() => setIsOpen(false)}>Settings</HolographicText>
				</Link>
			</div>
		</div>
	)
}

export default Drawer
