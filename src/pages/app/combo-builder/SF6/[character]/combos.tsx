import CombosTable from '@/components/Combo Builder/CombosTable'
import MovesDropdown from '@/components/Combo Builder/MoveDropdown'
import { characterIdMappingsByGame, characterDisplayNameMappingsByGame } from '@/shared/constants'
import { Character, Combo, Games, Move } from '@/shared/types'
import { fetchCombosByMoveId, fetchMovesByCharacterId, fetchCharacters } from '@/shared/utils'
import { select } from '@material-tailwind/react'
import { NextPageContext } from 'next'
import Link from 'next/link'
import React, { useState } from 'react'

type ComboPageServerSideProps = {
	characterName: string
	character: Character,
	defaultMove: Move,
	error?: any
}

// TODO: Implement when we have a combos by character endpoint
const CombosPage = ({ characterName, character, defaultMove }: ComboPageServerSideProps) => {
	const [selectedMove, setSelectedMove] = useState<Move>(defaultMove);
	const [combos, setCombos] = useState<Combo[]>([]);

	const handleMoveSelect = async (move: Move) => {
		setSelectedMove(move);
		try {
            const fetchedCombos = await fetchCombosByMoveId(move.id, Games.SF6);
            setCombos(fetchedCombos);
        } catch (error) {
            console.error('Failed to fetch combos:', error);
        }
	};

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
			<div className="relative flex flex-row bg-clip-border rounded-xl bg-white text-gray-700 shadow-md max-w-[90vw] mx-auto mt-10">
				<MovesDropdown character={character} selectedMove={selectedMove} onMoveSelect={handleMoveSelect}/>
			</div>
			<CombosTable  combos={combos}/>
		</div>
	)
}

export default CombosPage

export const getServerSideProps = async (context: NextPageContext) => {
	try {
		const characterString = context.query.character as string
		const characters = await fetchCharacters(Games.SF6);
		
    	const character = characters.find(c => c.name === characterString) || undefined;
		if (!character) {
            // If no character is found, throw an error.
            throw new Error(`Character not found for name: ${characterString}`);
        }

		const characterName = character?.name
		
		const moves: Move[] = await fetchMovesByCharacterId(character.id, Games.SF6);
		if (moves.length === 0) {
            throw new Error(`No moves found for character: ${characterName}`);
        }

        const defaultMove = moves[0];  // Assuming moves are sorted or the first move is the one you want
		
		const combos: Combo[] = await fetchCombosByMoveId(1183, Games.SF6)
		console.log("combos.tsx Character on load: ", character);

		return {
			props: {
				characterName,
				character,
				defaultMove,
				combos: combos,
				error: null
			}
		}
	} catch (error) {
		// TODO: Add toasting on errors here
		console.error(`An error occured fetching move data`, error)
		return {
			props: {
				characterName: 'null',
				combos: [],
				//error
			}
		}
	}
}
