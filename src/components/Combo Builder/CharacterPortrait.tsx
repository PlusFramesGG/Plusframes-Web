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
	const imageSource = characterPortraitMappings[game].characterSelectPortraits[characterName]
	return <Image height={330} width={304} src={imageSource} alt={`${'Aki'}'s character portrait`} />
}

export default CharacterPortrait
