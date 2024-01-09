import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
import CustomHeader from './CustomHeader'

type LayoutProps = {
	children: ReactNode
	customHeader?: string
}

const Layout = ({ children }: LayoutProps) => {
	const [isHamburgerOpen, setIsHamburgerOpen] = React.useState<boolean>(false)

	return (
		<>
			<CustomHeader
				toggled={isHamburgerOpen}
				toggle={() => setIsHamburgerOpen((isCurrentlyOpen: boolean) => !isCurrentlyOpen)}
			/>
			{children}
		</>
	)
}

export default Layout
