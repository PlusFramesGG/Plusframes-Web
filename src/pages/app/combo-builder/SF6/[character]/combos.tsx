import CombosTable from '@/components/Combo Builder/CombosTable'
import MovesDropdown from '@/components/Combo Builder/MovesDropdown'
import DriveGaugeFilter from '@/components/Combo Builder/SF6/DriveGaugeFilter'
import SuperGaugeFilter from '@/components/Combo Builder/SF6/SuperGaugeFilter'
import { characterIdMappingsByGame, characterDisplayNameMappingsByGame, PF_API_BASE_URL } from '@/shared/constants'
import { Character, Combo, ComboFilter, Games, Move, PFUserFavoriteCombos, defaultComboFilter } from '@/shared/types'
import { fetchCombosByMoveId, fetchMovesByCharacterId, fetchCharacters } from '@/shared/utils'
import { select } from '@material-tailwind/react'
import { GetServerSideProps, NextPageContext } from 'next'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getAuth } from '@clerk/nextjs/server';
import { useUser, useSession } from '@clerk/nextjs'


type ComboPageServerSideProps = {
	characterName: string
	character: Character,
	defaultMove: Move,
	defaultComboFilter: ComboFilter,
	error?: any
}

// TODO: Implement when we have a combos by character endpoint
const CombosPage = ({ characterName, character, defaultMove, defaultComboFilter }: ComboPageServerSideProps) => {
	const [selectedMove, setSelectedMove] = useState<Move>(defaultMove);
	const [currentComboFilter, updateCombFilter] = useState<ComboFilter>(defaultComboFilter);
	const [combos, setCombos] = useState<Combo[]>([]);

	useEffect(() => {
		updateCombos(); 
	}, [selectedMove, currentComboFilter]);

	const handleMoveSelect = async (move: Move) => {
		setSelectedMove(move);
	};

	const handleDriveChange = async (newDriveMax: number) => {
		updateCombFilter({
			...currentComboFilter,
			driveMax: newDriveMax
		  });
	};

	const handleSuperChange = async (newSuperMax: number) => {
		updateCombFilter({
			...currentComboFilter,
			superMax: newSuperMax
		  });
	};

	const updateCombos = async () => {
		try {
            const fetchedCombos = await fetchCombosByMoveId(selectedMove.id, Games.SF6, currentComboFilter);
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
						<Link href="/app/combo-builder/SF6/choose-your-character">Combo Builder</Link>
					</li>
					<li>
						<Link href={`/app/combo-builder/SF6/${characterName}`}>{characterName}</Link>
					</li>
					<li>Combos</li>
				</ul>
			</div>
			<div className="relative flex flex-row items-center justify-between bg-clip-border rounded-xl bg-white text-gray shadow-md max-w-[90vw] mx-auto mt-10">
				<div className="flex-1">
					<MovesDropdown character={character} selectedMove={selectedMove} onMoveSelect={handleMoveSelect}/>
				</div>
				<div className="flex-1">
					<DriveGaugeFilter defaultDriveMax={currentComboFilter.driveMax} onDriveChange={handleDriveChange}/>
				</div>
				<div className="flex-1">
					<SuperGaugeFilter defaultSuperMax={currentComboFilter.superMax} onSuperChange={handleSuperChange}/>
				</div>
			</div>
			<CombosTable  characterName={characterName} combos={combos} />
		</div>
	)
}

export default CombosPage

export const getServerSideProps: GetServerSideProps = async (context) => {
	try {
		const { userId, sessionId, getToken } = await getAuth(context.req);
		
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

        // const defaultMove = moves[0];  // Assuming moves are sorted or the first move is the one you want
		const defaultMove = moves.reduce((smallest, current) => {
			if (current.startup === null) return smallest;  
			if (smallest.startup === null) return current;  
			return current.startup < smallest.startup ? current : smallest;
		}, moves[0]);
		
		const combos: Combo[] = await fetchCombosByMoveId(1183, Games.SF6)

		return {
			props: {
				characterName,
				character,
				defaultMove,
				combos: combos,
				defaultComboFilter,
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
