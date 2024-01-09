import React, { Dispatch, SetStateAction } from 'react'

type DrawerProps = {
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, setIsOpen }) => {
	return (
		<div
			className={`fixed top-0 left-0 h-full z-40 transform ${
				isOpen ? 'translate-x-0' : '-translate-x-full'
			} transition-transform duration-300 ease-in-out bg-[#7D6393] text-white w-64 p-6`}
		>
			{/* Close button for the drawer */}
			<button onClick={() => setIsOpen(false)} className="mb-4">
				Close
			</button>
			{/* Content of the drawer */}
			<div>cool guy stuff to do</div>
			<div>cool guy stuff to do</div>
			<div>cool guy stuff to do</div>
			<div>cool guy stuff to do</div>
		</div>
	)
}

export default Drawer
