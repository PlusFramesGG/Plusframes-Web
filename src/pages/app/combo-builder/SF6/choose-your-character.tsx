import SF6CharacterPortrait from '@/components/Combo Builder/SF6/SF6CharacterPortrait'
import { charactersByGame } from '@/shared/constants'
import { Games } from '@/shared/types'
import React from 'react'
import styles from '../../../../styles/pages/ChooseYourCharacterPageStyles.module.css'

// TODO: Replace this page with an index page that has character links + stats, dashboards, etc.
const SF6ChooseYourCharacterPage = () => {
	const game: Games = Games.SF6
	const characterList = charactersByGame.SF6

	return (
		<div className={`py-5 md:py-10 ${styles.pageContainer}`}>
			<h1 className="text-3xl text-center md:mb-10 text-white">Choose your character</h1>
			<div className="grid grid-cols-2 lg:grid-cols-5 gap-2 p-4">
				{characterList.map((characterName, index) => (
					<SF6CharacterPortrait key={`${characterName}_${index}`} game={game} characterName={characterName} />
				))}
			</div>
		</div>
	)
}

export default SF6ChooseYourCharacterPage
