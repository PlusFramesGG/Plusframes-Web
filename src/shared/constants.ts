import { AppSettings, MoveNotationTypes, Games } from './types'

export const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY!
export const FIREBASE_AUTH_DOMAIN = process.env.FIREBASE_AUTH_DOMAIN!
export const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID!
export const FIREBASE_STORAGE_BUCKET = process.env.FIREBASE_STORAGE_BUCKET!
export const FIREBASE_MESSAGING_SENDER_ID = process.env.FIREBASE_MESSAGING_SENDER_ID!
export const FIREBASE_APP_ID = process.env.FIREBASE_APP_ID!
export const FIREBASE_MEASUREMENT_ID = process.env.FIREBASE_MEASUREMENT_ID!
// TODO: Replace with game specific URLs
export const SF6_URL = process.env.NEXT_PUBLIC_PF_API_BASE_URL!
export const PF_API_BASE_URL = process.env.NEXT_PUBLIC_PF_API_BASE_URL!

export const defaultAppSettings: AppSettings = {
	move_notation: MoveNotationTypes.NUMBER_COMMAND
}

// TODO: Fill these out as we get more games implemented
export const gameUrlMappings = {
	[Games.SF6]: SF6_URL
}

// TODO: Lowercase all of these keys
export const characterPortraitMappings = {
	SF6: {
		portraits: {
			AKI: '/Assets/SF6/Character Portraits/AKI.png',
			Blanka: '/Assets/SF6/Character Portraits/Blanka.png',
			Cammy: '/Assets/SF6/Character Portraits/Cammy.png',
			['Chun-Li']: '/Assets/SF6/Character Portraits/Chun-Li.png',
			['Dee Jay']: '/Assets/SF6/Character Portraits/Dee Jay.png',
			Dhalsim: '/Assets/SF6/Character Portraits/Dhalsim.png',
			['E Honda']: '/Assets/SF6/Character Portraits/E Honda.png',
			Guile: '/Assets/SF6/Character Portraits/Guile.png',
			Jamie: '/Assets/SF6/Character Portraits/Jamie.png',
			JP: '/Assets/SF6/Character Portraits/JP.png',
			Juri: '/Assets/SF6/Character Portraits/Juri.png',
			Ken: '/Assets/SF6/Character Portraits/Ken.png',
			Kimberly: '/Assets/SF6/Character Portraits/Kimberly.png',
			Lily: '/Assets/SF6/Character Portraits/Lily.png',
			Luke: '/Assets/SF6/Character Portraits/Luke.png',
			Manon: '/Assets/SF6/Character Portraits/Manon.png',
			Marisa: '/Assets/SF6/Character Portraits/Marisa.png',
			Rashid: '/Assets/SF6/Character Portraits/Rashid.png',
			Ryu: '/Assets/SF6/Character Portraits/Ryu.png',
			Zangief: '/Assets/SF6/Character Portraits/Zangief.png'
		},
		characterSelectPortraits: {
			AKI: '/Assets/SF6/Character Select Portraits/AKI.png',
			Blanka: '/Assets/SF6/Character Select Portraits/Blanka.png',
			Cammy: '/Assets/SF6/Character Select Portraits/Cammy.png',
			['Chun-Li']: '/Assets/SF6/Character Select Portraits/Chun-Li.png',
			['Dee Jay']: '/Assets/SF6/Character Select Portraits/Dee Jay.png',
			Dhalsim: '/Assets/SF6/Character Select Portraits/Dhalsim.png',
			['E Honda']: '/Assets/SF6/Character Select Portraits/E Honda.png',
			Guile: '/Assets/SF6/Character Select Portraits/Guile.png',
			Jamie: '/Assets/SF6/Character Select Portraits/Jamie.png',
			JP: '/Assets/SF6/Character Select Portraits/JP.png',
			Juri: '/Assets/SF6/Character Select Portraits/Juri.png',
			Ken: '/Assets/SF6/Character Select Portraits/Ken.png',
			Kimberly: '/Assets/SF6/Character Select Portraits/Kimberly.png',
			Lily: '/Assets/SF6/Character Select Portraits/Lily.png',
			Luke: '/Assets/SF6/Character Select Portraits/Luke.png',
			Manon: '/Assets/SF6/Character Select Portraits/Manon.png',
			Marisa: '/Assets/SF6/Character Select Portraits/Marisa.png',
			Rashid: '/Assets/SF6/Character Select Portraits/Rashid.png',
			Ryu: '/Assets/SF6/Character Select Portraits/Ryu.png',
			Zangief: '/Assets/SF6/Character Select Portraits/Zangief.png'
		}
	}
}

export const charactersByGame = {
	SF6: [
		'AKI',
		'Blanka',
		'Cammy',
		'Chun-Li',
		'Dee Jay',
		'Dhalsim',
		'E Honda',
		'Guile',
		'Jamie',
		'JP',
		'Juri',
		'Ken',
		'Kimberly',
		'Lily',
		'Luke',
		'Manon',
		'Marisa',
		'Rashid',
		'Ryu',
		'Zangief'
	]
}

// TODO: Fill both of these maps out once we have the values from RK
export const characterIdMappingsByGame: Record<Games, Record<string, number>> = {
	SF6: {
		ryu: 1
	}
}

export const characterDisplayNameMappingsByGame: Record<Games, Record<number, string>> = {
	SF6: {
		1: 'Ryu'
	}
}
