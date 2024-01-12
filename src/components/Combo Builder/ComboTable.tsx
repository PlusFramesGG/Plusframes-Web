import { Combo } from '@/shared/types'
import React from 'react'

// Sample data for the table
const tableData: Combo[] = [
	{
		character_id: 1,
		id: 197,
		link: 'http://example.com/combo/51',
		gap: 1,
		count: 4,
		usage: 85,
		drive: 55,
		super: 69,
		min_damage: 95,
		avg_damage: 116,
		max_damage: 169,
		moves: [
			{
				id: 95,
				name: 'Move 4',
				damage: 20,
				active: 1,
				on_block: 7,
				on_hit: 6,
				recovery: 8,
				startup: 5
			}
			// ... more moves
		]
	},
	{
		character_id: 1,
		id: 197,
		link: 'http://example.com/combo/51',
		gap: 1,
		count: 4,
		usage: 85,
		drive: 55,
		super: 69,
		min_damage: 95,
		avg_damage: 116,
		max_damage: 169,
		moves: [
			{
				id: 95,
				name: 'Move 4',
				damage: 20,
				active: 1,
				on_block: 7,
				on_hit: 6,
				recovery: 8,
				startup: 5
			}
			// ... more moves
		]
	},
	{
		character_id: 1,
		id: 197,
		link: 'http://example.com/combo/51',
		gap: 1,
		count: 4,
		usage: 85,
		drive: 55,
		super: 69,
		min_damage: 95,
		avg_damage: 116,
		max_damage: 169,
		moves: [
			{
				id: 95,
				name: 'Move 4',
				damage: 20,
				active: 1,
				on_block: 7,
				on_hit: 6,
				recovery: 8,
				startup: 5
			}
		]
	}
]

const Table: React.FC = () => {
	return (
		<div className="overflow-x-auto">
			<table className="min-w-full leading-normal">
				<thead>
					<tr>
						<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
							Damage
						</th>
						<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
							Drive
						</th>
						<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
							Super
						</th>
					</tr>
				</thead>
				<tbody>
					{tableData.map((row: Combo) => (
						<tr key={row.id}>
							<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{row.avg_damage}</td>
							<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{row.drive}</td>
							<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{row.super}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Table
