import React from 'react'
import Image from 'next/image'
import { characterPortraitMappings } from '@/shared/constants'
import { Games } from '@/shared/types'
import Link from 'next/link'

type SF6CharacterSmallPortrait = {
	characterName: string
	game: Games,
    size: number
}

const SF6CharacterSmallPortrait = ({ characterName, game, size }: SF6CharacterSmallPortrait) => {
	// @ts-ignore
	const imageSource = characterPortraitMappings.SF6.portraits[characterName]
	return (
		<Link className="z-0 hover:z-3" href={`/app/combo-builder/${game}/${characterName}/combos`}>
			<Image
				className="z-0 transform transition duration-500 ease-in-out hover:scale-110"
				height={size}
				width={size}
				src={imageSource}
				alt={`${characterName}'s character portrait`}
			/>
		</Link>
	)
}

export default SF6CharacterSmallPortrait
