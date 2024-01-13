import CombosTable from '@/components/Combo Builder/CombosTable'
import { Games } from '@/shared/types'
import { fetchMovesByCharacterId } from '@/shared/utils'
import { NextPageContext } from 'next'
import React from 'react'

type ComboPageServerSideProps = {
	character: string
}

// TODO: Implement when we have a combos by character endpoint
const CombosPage = ({ character }: ComboPageServerSideProps) => {
	return (
		<div>
			<CombosTable />
		</div>
	)
}

export default CombosPage

export const getServerSideProps = async (context: NextPageContext) => {
	const { character } = context.query
	const apiResponseData = await fetchMovesByCharacterId('1', Games.SF6)

	console.log('apiResponseData', apiResponseData)

	return {
		props: {
			character
		}
	}
}
