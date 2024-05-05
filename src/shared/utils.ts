import { PF_API_BASE_URL, gameUrlMappings } from './constants'
import { Character, Combo, ComboFilter, ComboUsage, Games, Move, MoveMapping, PFUserFavoriteCombo, PFUserFavoriteCombos, defaultComboFilter } from './types'

export async function fetchMovesByCharacterId(characterId: number, game: Games): Promise<Move[]> {
	const response = await fetch(`${gameUrlMappings[game]}/combo_routes/starters/${characterId}`)
	return await response.json()
}

export async function fetchCharactersByGame(game: Games): Promise<Character[]> {
	const response = await fetch(`${gameUrlMappings[game]}/characters`)
	return await response.json()
}

export async function fetchCombosByMoveId(moveId: number, game: Games, comboFilter: ComboFilter = defaultComboFilter): Promise<Combo[]> {
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
export async function fetchComboUsage(comboId: number, game: Games): Promise<ComboUsage> {
	const apiResponse = await fetch(`${gameUrlMappings[game]}/combo_usage/${comboId}`)
	return await apiResponse.json()
}

// Fetch characters
export async function fetchCharacters(game: Games): Promise<Character[]> {
	const apiResponse = await fetch(`${gameUrlMappings[game]}/characters`)
	return await apiResponse.json()
}


export async function fetchComboFavorites(userId: string, sessionToken: string ): Promise<PFUserFavoriteCombos> {
	console.log("sessionToken",sessionToken)
	const response = await fetch(`${PF_API_BASE_URL}/users/combos/favorites/${userId}`, {
		method: 'GET',
		headers: {
			'Authorization': `Bearer ${sessionToken}`,
			'Content-Type': 'application/json'
		}
	})
	const resq = await response.json();
	return resq.data as PFUserFavoriteCombos 
}


export async function addComboFavorites(userId: string, comboId: number, sessionToken: string ): Promise<PFUserFavoriteCombo> {
	const url = new URL(`${PF_API_BASE_URL}/users/combos/favorites/${userId}`);
	url.searchParams.append('comboId', comboId.toString());

	console.log("sessionToken",sessionToken)
	const response = await fetch(url, {
		method: 'PUT',
		headers: {
			'Authorization': `Bearer ${sessionToken}`,
			'Content-Type': 'application/json'
		}
	})
	return await response.json()
}

export async function deleteComboFavorites(userId: string, comboId: number, sessionToken: string ): Promise<PFUserFavoriteCombo> {
	console.log("sessionToken",sessionToken)
	const url = new URL(`${PF_API_BASE_URL}/users/combos/favorites/${userId}`);
	url.searchParams.append('comboId', comboId.toString());

	const response = await fetch(url, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${sessionToken}`,
			'Content-Type': 'application/json'
		}
	})
	return await response.json()
}




