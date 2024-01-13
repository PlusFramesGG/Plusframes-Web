import MaterialTable from '@/components/Combo Builder/MaterialTable'
import { NextPageContext } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

type ComboPageServerSideProps = {
	character: string
}

const CombosPage = ({ character }: ComboPageServerSideProps) => {
	return (
		<div>
			<MaterialTable />
		</div>
	)
}

export default CombosPage

export const getServerSideProps = async (context: NextPageContext) => {
	const { character } = context.query
	return {
		props: {
			character
		}
	}
}
