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
