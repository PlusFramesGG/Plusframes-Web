import React from 'react'
import Image from 'next/image'
import { characterPortraitMappings } from '@/shared/constants'
import { Games } from '@/shared/types'

type CharacterPortraitProps = {
	characterName: string
	game: Games
}

const CharacterPortrait = ({ characterName, game }: CharacterPortraitProps) => {
	// @ts-ignore
	const imageSource = characterPortraitMappings.SF6.characterSelectPortraits[characterName]
	return (
		<Image
			className="w-1/2 md:w-1/4 p-2 -mx-12"
			height={330}
			width={304}
			src={imageSource}
			alt={`${characterName}'s character portrait`}
		/>
	)
}

export default CharacterPortrait
