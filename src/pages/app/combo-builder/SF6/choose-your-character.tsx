import CharacterPortrait from '@/components/Combo Builder/CharacterPortrait'
import { charactersByGame } from '@/shared/constants'
import { Games } from '@/shared/types'
import { useRouter } from 'next/router'
import React from 'react'
import styles from '../../../../styles/pages/ChooseYourCharacterPageStyles.module.css'

// TODO: Abstract this out so it grabs the game name from a dynamic URL pathing and loads the requisite images instead
const SF6ChooseYourCharacterPage = () => {
	const router = useRouter()
	const game: Games = router.query.game as Games
	const characterList = charactersByGame.SF6

	const characterPortraitElements = Array.from(characterList).map((characterName) => {
		return <CharacterPortrait game={game} characterName={characterName} />
	})

	return (
		<div className={`py-5 md:py-10 ${styles.pageContainer}`}>
			<h1 className="text-3xl text-center md:mb-10 text-white">Choose your character</h1>
			{/* <div className="flex flex-row flex-wrap -m-2">{characterPortraitElements}</div> */}\{' '}
			<div className="grid grid-cols-2 lg:grid-cols-5 gap-2 p-4">
				{characterList.map((characterName, index) => (
					<CharacterPortrait key={`${characterName}_${index}`} game={game} characterName={characterName} />
				))}
			</div>
		</div>
	)
}

export default SF6ChooseYourCharacterPage
