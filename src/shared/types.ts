import type { NextApiRequest, NextApiResponse } from 'next/types'

// Enums
export enum APIStatuses {
	SUCCESS = 'SUCCESS',
	ERROR = 'ERROR'
}

export enum APIMethods {
	POST = 'POST',
	GET = 'GET',
	PUT = 'PUT',
	DELETE = 'DELETE',
	PATCH = 'PATCH'
}

export enum GeneralAPIResponses {
	FAILURE = 'FAILURE',
	INVALID_REQUEST_TYPE = 'INVALID_REQUEST_TYPE',
	UNAUTHORIZED = 'UNAUTHORIZED'
}

export enum Games {
	SF6 = 'SF6'
}

// Firebase Specific Enums
export enum DocumentResponses {
	DATA_FOUND = 'DATA_FOUND',
	DATA_NOT_FOUND = 'DATA_NOT_FOUND',
	DATA_DELETED = 'DATA_DELETED',
	DATA_UPDATED = 'DATA_UPDATED',
	DATA_CREATED = 'DATA_CREATED',
	DATA_NOT_CREATED = 'DATA_NOT_CREATED'
}

export enum CollectionNames {
	USERS = 'users'
}

// Auth Specific Enums
export enum ClerkResponses {
	USER_NOT_FOUND = 'USER_NOT_FOUND',
	USER_FOUND = 'USER_FOUND'
}

export enum SignupMethods {
	GOOGLE = 'Google',
	TWITCH = 'Twitch',
	EMAIL = 'Email',
	DISCORD = 'Discord'
}

export enum UserRoles {
	SUPER_ADMIN = 'Super Admin',
	ADMIN = 'Admin',
	USER = 'User'
}

// TODO: Get keys for other notation types
export enum MoveNotationTypes {
	NUMBER_COMMAND = 'number_command'
}

// Interfaces
export interface TypedRequest<T> extends NextApiRequest {
	body: T
}

export interface TypedResponse<T> extends NextApiResponse {
	json: (body: T) => void
	send: (body: T) => void
}

// Types
// TODO: Further flesh this out with the crew
export type PFUser = {
	id?: string
	role: UserRoles
	clerkId: string
	firstName: string
	lastName: string
	username: string
}

export interface Character {
	id: number
	name: string
	sf6_character_id: number
}

export interface Move {
	id: number
	name: string
	damage: null | number
	active: null | number
	on_block: null | number
	on_hit: null | number
	recovery: null | number
	startup: null | number
}

export interface Combo {
	character_id: number
	id: number
	link: string
	gap: number
	count: number
	usage: number
	drive: number
	super: number
	min_damage: number
	avg_damage: number
	max_damage: number
	moves: Move[]
}

export interface ComboFilter {
	driveMin: number
	driveMax: number
	superMin: number
	superMax: number
	showNormal: boolean
	showPC: boolean
	showCH: boolean
}

export const defaultComboFilter: ComboFilter = {
	driveMin: 0,
	driveMax: 6,
	superMin: 0,
	superMax: 3,
	showNormal: true,
	showPC: true,
	showCH: true
}

export interface AppSettings {
	move_notation: string
}

export interface MoveCommand {
	number_command: string
	letter_command: string
}

export interface MoveMapping {
	[key: string]: MoveCommand
}

export interface ComboUsage {
	combo: Combo
	usage: [
		{
			id: number
			cfn_id: string
			player_one_name: string
			player_two_name: string
			character_one_name: string
			character_two_name: string
			round_time: number
			round_number: number
		}
	]
}
