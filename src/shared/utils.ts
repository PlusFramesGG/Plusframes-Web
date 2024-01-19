import { gameUrlMappings } from './constants'
import { Character, Combo, ComboFilter, ComboUsage, Games, Move, MoveMapping } from './types'

export async function fetchMovesByCharacterId(characterId: string, game: Games): Promise<Move[]> {
	console.log('url', `${gameUrlMappings[game]}`)
	const response = await fetch(`${gameUrlMappings[game]}/combo_routes/starters/${characterId}`)
	return await response.json()
}

export async function fetchCharactersByGame(game: Games): Promise<Character[]> {
	const response = await fetch(`${gameUrlMappings[game]}/characters`)
	return await response.json()
}

export async function fetchCombosByMoveId(moveId: string, game: Games, comboFilter?: ComboFilter): Promise<Combo[]> {
	const linkFilterArray = [
		...(comboFilter?.showNormal ? ['n'] : []),
		...(comboFilter?.showCH ? ['ch'] : []),
		...(comboFilter?.showPC ? ['pc/dr'] : [])
	]

	const params = new URLSearchParams({
		...(comboFilter?.driveMin !== undefined && { driveMin: comboFilter.driveMin.toString() }),
		...(comboFilter?.driveMax !== undefined && { driveMax: comboFilter.driveMax.toString() }),
		...(comboFilter?.superMin !== undefined && { superMin: comboFilter.superMin.toString() }),
		...(comboFilter?.superMax !== undefined && { superMax: comboFilter.superMax.toString() })
	})

	// Append linkFilter array elements individually
	linkFilterArray.forEach((filter) => params.append('linkFilter[]', filter))

	console.log(
		'`${gameUrlMappings[game]}/combo_routes/${moveId}?${params}`',
		`${gameUrlMappings[game]}/combo_routes/${moveId}?${params}`
	)
	const url = `${gameUrlMappings[game]}/combo_routes/${moveId}?${params}`
	const response = await fetch(url)
	return await response.json()
}

// TODO: Implement?
export async function fetchMoveMappings(): Promise<MoveMapping[]> {
	const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
	const response = await fetch(`${baseUrl}/move_mappings.json`)
	return await response.json()
}

// Fetch combo usage function
export async function fetchComboUsage(comboId: string, game: Games): Promise<ComboUsage> {
	const apiResponse = await fetch(`${gameUrlMappings[game]}/combo_usage/${comboId}`)
	return await apiResponse.json()
}
