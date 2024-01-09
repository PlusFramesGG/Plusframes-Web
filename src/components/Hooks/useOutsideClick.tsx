import { RefObject, useEffect } from 'react'

// export const useOutsideClick = (ref: React.RefObject<HTMLDivElement>, callback: () => void, ignoreRef?: any) => {
// 	useEffect(() => {
// 		const handleClickOutside = (event: MouseEvent) => {
// 			// @ts-ignore
// 			if (ref?.current && event.target && !ref?.current.contains(event.target)) {
// 				callback()
// 			}
// 		}

// 		document.addEventListener('mousedown', handleClickOutside)
// 		return () => {
// 			document.removeEventListener('mousedown', handleClickOutside)
// 		}
// 	}, [ref, callback])
// }

export const useOutsideClick = (
	ref: React.RefObject<HTMLElement>,
	callback: () => void,
	ignoreClasses: string[] = []
): void => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			let element = event.target as HTMLElement
			while (element) {
				if (ignoreClasses.some((ignoreCls) => element.classList.contains(ignoreCls))) {
					return
				}
				element = element.parentElement!
			}

			// If the clicked element is outside and not ignored, execute the callback
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback()
			}
		}

		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [ref, ignoreClasses, callback]) // Include ignoreClass in the dependencies array
}

export default useOutsideClick
