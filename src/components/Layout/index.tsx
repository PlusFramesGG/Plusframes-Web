import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
import CustomHeader from './CustomHeader'

type LayoutProps = {
	children: ReactNode
	customHeader?: string
}

const Layout = ({ children }: LayoutProps) => {
	const [isHamburgerOpen, setIsHamburgerOpen] = React.useState<boolean>(false)

	React.useEffect(() => {
		console.log('isHamburgerOpen', isHamburgerOpen)
	})

	return (
		<>
			<CustomHeader toggled={isHamburgerOpen} toggle={(newIsOpenVal: boolean) => setIsHamburgerOpen(newIsOpenVal)} />
			{children}
		</>
	)
}

export default Layout
