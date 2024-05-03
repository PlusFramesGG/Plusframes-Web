import React from 'react'
import Image from 'next/image'
import { characterPortraitMappings } from '@/shared/constants'
import { Games } from '@/shared/types'
import Link from 'next/link'

type CharacterPortraitProps = {
	characterName: string
	game: Games
}

const SF6CharacterPortrait = ({ characterName, game }: CharacterPortraitProps) => {
	// @ts-ignore
	const imageSource = characterPortraitMappings.SF6.characterSelectPortraits[characterName]
	return (
		<Link className="z-0 hover:z-3" href={`/app/combo-builder/${game}/${characterName}/combos`}>
			<Image
				className="z-0 transform transition duration-500 ease-in-out hover:scale-110"
				height={330}
				width={304}
				src={imageSource}
				alt={`${characterName}'s character portrait`}
			/>
		</Link>
	)
}

export default SF6CharacterPortrait
