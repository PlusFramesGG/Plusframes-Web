import CharacterPortrait from '@/components/Combo Builder/CharacterPortrait'
import { charactersByGame } from '@/shared/constants'
import { Games } from '@/shared/types'
import { useRouter } from 'next/router'
import React from 'react'
import styles from '../../../../styles/pages/ChooseYourCharacterPageStyles.module.css'

// TODO: Abstract this out so it grabs the game name from a dynamic URL pathing and loads the requisite images instead
const ChooseYourCharacterPage = () => {
	const router = useRouter()
	const game: Games = router.query.game as Games
	const characterList = charactersByGame.SF6

	const characterPortraitElements = Array.from(characterList).map((characterName) => {
		return <CharacterPortrait game={game} characterName={characterName} />
	})

	return (
		<div className={`py-10 ${styles.pageContainer}`}>
			<h1 className="text-3xl text-center mb-10 text-white">Choose your character</h1>
			<div className="flex flex-row flex-wrap -m-2">{characterPortraitElements}</div>
		</div>
	)
}

export default ChooseYourCharacterPage
