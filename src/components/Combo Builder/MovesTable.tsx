import React from 'react'
import Image from 'next/image'
import { Move } from '@/shared/types'
import MovesRow from './MovesRow'

type MovesTableProps = {
	characterName: string
	moves: Move[]
}

// Inspo from https://demos.creative-tim.com/material-tailwind-dashboard-react/?_ga=2.34022373.538809748.1705091113-404594367.1704996279#/dashboard/tables
// TODO: Find a better display for scrolling on mobile
// TODO: Would be great to color code these for positive and negative frames
const MovesTable = ({ characterName, moves }: MovesTableProps) => {
	return (
		<div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md max-w-[90vw] mx-auto mt-10 overflow-x-scroll pt-[30px]">
			<div className="relative bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 shadow-lg -mt-6 mb-8 p-6">
				<h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
					All Moves for {characterName}
				</h6>
			</div>
			<div className="p-6 px-0 pt-0 pb-2">
				<table className="w-full min-w-[640px] table-auto">
					<thead>
						<tr>
							<th className="border-b border-blue-gray-50 py-3 px-5 text-left">
								<p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">name</p>
							</th>
							<th className="border-b border-blue-gray-50 py-3 px-5 text-left">
								<p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">damage</p>
							</th>
							<th className="border-b border-blue-gray-50 py-3 px-5 text-left">
								<p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">frame data</p>
							</th>
							<th className="border-b border-blue-gray-50 py-3 px-5 text-left">
								<p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">meter</p>
							</th>
						</tr>
					</thead>
					<tbody>
						{moves.map((move: Move) => (
							<MovesRow move={move} />
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default MovesTable
