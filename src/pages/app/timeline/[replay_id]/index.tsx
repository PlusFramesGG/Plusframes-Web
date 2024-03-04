import { PF_API_BASE_URL } from '@/shared/constants'
import { RawReplayResponse, ReplayRound } from '@/shared/types'
import { GetServerSidePropsContext } from 'next'
import React from 'react'

type TimelinePageProps = {
	round_data: ReplayRound[]
	dataFetchingError: boolean
}

const TimelinePage = ({ round_data }: TimelinePageProps) => {
	return <div>TimelinePage</div>
}

export default TimelinePage

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	const { query } = ctx
	const replay_id = query.replay_id as string
	const props: TimelinePageProps = {
		round_data: [],
		dataFetchingError: false
	}

	try {
		const request = await fetch(`${PF_API_BASE_URL}/raw_replay/${replay_id}`)
		const response = (await request.json()) as RawReplayResponse
		console.log('response', response)
		props.round_data = response.round_data
	} catch (error) {
		console.error('Error fetching round data for timeline view', error)
		props.dataFetchingError = true
	} finally {
		return {
			props
		}
	}
}
