import React from 'react'
import Image from 'next/image'
import { Move } from '@/shared/types'

type MovesRowProps = {
	move: Move
}

// TODO: Resize first column here
const MovesRow = ({ move }: MovesRowProps) => {
	return (
		<tr className="w-1/4">
			<td className="py-3 px-5 border-b border-blue-gray-50">
				<div className="flex items-center gap-4">
					<Image
						height={36}
						width={36}
						src="/Assets/SF6/Character Portraits/Ryu.png"
						alt="Ryu's Character Portrait"
						className="inline-block relative object-cover object-center w-9 h-9 rounded-md"
					/>
					<div>
						<p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">{move.name}</p>
						<p className="block antialiased font-sans text-xs font-normal text-blue-gray-500">Input: TBD</p>
					</div>
				</div>
			</td>
			<td className="py-3 px-5 border-b border-blue-gray-50">
				<p className="block antialiased font-sans text-xs font-semibold text-blue-gray-600">{move.damage ?? 'TBD'}</p>
			</td>
			<td className="py-3 px-5 border-b border-blue-gray-50">
				<p className="block antialiased font-sans text-xs font-semibold text-blue-gray-500">Active: {move.active}</p>
				<p className="block antialiased font-sans text-xs font-semibold text-blue-gray-500">Recovery: {move.recovery}</p>
				<p className="block antialiased font-sans text-xs font-semibold text-blue-gray-500">On-Hit: {move.on_hit}</p>
				<p className="block antialiased font-sans text-xs font-semibold text-blue-gray-500">On-Block: {move.on_block}</p>
			</td>
			<td className="py-3 px-5 border-b border-blue-gray-50">
				<p className="block antialiased font-sans text-xs font-semibold text-blue-gray-600">Drive: TBA</p>
				<p className="block antialiased font-sans text-xs font-semibold text-blue-gray-500">Super: TBA</p>
			</td>
		</tr>
	)
}

export default MovesRow
