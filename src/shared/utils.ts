import firebase_app from '@/lib/firebase'
import { getAuth } from '@clerk/nextjs/dist/types/server-helpers.server'
import { getFirestore, collection, query, where, getDocs, addDoc, updateDoc } from 'firebase/firestore'
import { NextRequest } from 'next/server'
import { gameUrlMappings } from './constants'
import { Character, CollectionNames, Combo, ComboFilter, ComboUsage, Games, Move, MoveMapping, PFUser, UserRoles, defaultComboFilter } from './types'
import { IncomingMessage } from 'http'

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


//
export async function createUserIfNotExists(userId: string) {
	console.log("creating user")
	const db = getFirestore(firebase_app)
	const collectionRef = collection(db, CollectionNames.USERS)

	try {
		const userQuery = query(collectionRef, where("id", "==", userId));
        const userDocs = await getDocs(userQuery);

        if (!userDocs.empty) {
			// Exit if user already exists
            return {}
        }

		const documentRef = await addDoc(collectionRef, {})

		// TODO: Add support for additional roles here.
		// username
		const newUser: PFUser = {
			id: documentRef.id, role: UserRoles.USER,
			clerkId: userId,
			firstName: '',
			lastName: '',
			username: ''
		}
		await updateDoc(documentRef, newUser); 

		if (documentRef.id) {
			return {}
		} else {
			console.error('Error', 'Could not create user')
			return {}
		}
	} catch (e) {
		console.error('e', e)
	}
}



