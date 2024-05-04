import CombosUsageTable from '@/components/Combo Builder/ComboUsageTable'
import { ComboUsage, Games } from '@/shared/types'
import { fetchCharacters, fetchComboUsage } from '@/shared/utils'
import { NextPageContext } from 'next'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

type ComboUsagePageServerSideProps = {
	comboUsage: ComboUsage,
    characterName: string,
	error?: any
}


const ComboUsagePage = ({ comboUsage, characterName }: ComboUsagePageServerSideProps) => {
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
						<Link href={`/app/combo-builder/SF6/${characterName}/combos`}>{characterName}</Link>
					</li>
					<li>{comboUsage.combo.id}</li>
				</ul>
			</div>
			<CombosUsageTable  characterName={characterName} comboUsage={comboUsage}/>
		</div>
	)
}

export default ComboUsagePage

export const getServerSideProps = async (context: NextPageContext) => {
	try {
		const comboId = parseInt(context.query.id as string) 
		
		const comboUsage: ComboUsage = await fetchComboUsage(comboId, Games.SF6);
		if (!comboUsage) {
            throw new Error(`No comboUsage found for combo: ${comboId}`);
        }

        const characters = await fetchCharacters(Games.SF6);
		
    	const character = characters.find(c => c.id === comboUsage.combo.character_id) || undefined;
		if (!character) {
            // If no character is found, throw an error.
            throw new Error(`Character not found for id: ${comboUsage.combo.character_id}`);
        }

		const characterName = character.name

		return {
			props: {
                characterName,
				comboUsage,
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
