import ComboTable from '@/components/Combo Builder/ComboTable'
import MaterialTable from '@/components/Combo Builder/MaterialTable'
import { useRouter } from 'next/router'
import React from 'react'

// TODO: this page needs to be SSR'd
const CombosPage = () => {
	const router = useRouter()
	const { game, character } = router.query

	console.log('Game', game)
	console.log('character', character)

	return (
		<div>
			{/* <ComboTable /> */}
			<MaterialTable />
		</div>
	)
}

export default CombosPage
