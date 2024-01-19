import MovesTable from '@/components/Combo Builder/MovesTable'
import { characterDisplayNameMappingsByGame, characterIdMappingsByGame } from '@/shared/constants'
import { Games, Move } from '@/shared/types'
import { fetchMovesByCharacterId } from '@/shared/utils'
import { NextPageContext } from 'next'
import Link from 'next/link'
import React from 'react'

type MovesPageServerSideProps = {
	characterName: string
	moves: Move[]
	error: any
}

const MovesPage = ({ characterName, moves, error }: MovesPageServerSideProps) => {
	if (error) {
		// TODO: Decide how we want to handle this (prob redirect to an error page)
		console.error(`There was an error fetching move data for ${characterName}`)
	}
	return (
		<div>
			<div className="text-sm breadcrumbs ml-6 mt-5">
				<ul>
					<li>
						<Link href="/app">Home</Link>
					</li>
					<li>
						<Link href="/app/combo-builder">Combo Builder</Link>
					</li>
					<li>
						<Link href={`/app/combo-builder/SF6/${characterName}`}>{characterName}</Link>
					</li>
					<li>Combos</li>
				</ul>
			</div>
			<MovesTable characterName={characterName} moves={moves} />
		</div>
	)
}

export default MovesPage

export const getServerSideProps = async (context: NextPageContext) => {
	try {
		const character = context.query.character as string
		const characterId = characterIdMappingsByGame.SF6[character]
		const characterName = characterDisplayNameMappingsByGame.SF6[characterId]
		const moves: Move[] = await fetchMovesByCharacterId(characterId.toString(), Games.SF6)

		return {
			props: {
				characterName,
				moves,
				error: null
			}
		}
	} catch (error) {
		console.error(`An error occured fetching move data`, error)
		return {
			props: {
				characterName: 'null',
				moves: [],
				error
			}
		}
	}
}
