import React from 'react'
import styles from '../../styles/components/General/HolographicText.module.css'

type HolographicTextProps = {
	children: React.ReactNode
	onClick?: () => void
	classes?: string
}

const HolographicText = ({ children, classes, onClick }: HolographicTextProps) => {
	return (
		<span onClick={onClick} className={`${styles.holoText} ${classes ?? classes}`}>
			{children}
		</span>
	)
}

export default HolographicText
