import { useEffect } from 'react'

export const useOutsideClick = (ref: React.RefObject<HTMLDivElement>, callback: () => void) => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			// @ts-ignore
			if (ref?.current && event.target && !ref?.current.contains(event.target)) {
				callback()
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [ref, callback])
}
