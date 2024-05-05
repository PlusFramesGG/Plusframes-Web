import React, { useState } from 'react'
import { Combo } from '@/shared/types'
import { useRouter } from 'next/router';
import { StarIcon } from '@heroicons/react/20/solid'
import { useUser } from '@clerk/nextjs';

// Inspo from https://demos.creative-tim.com/material-tailwind-dashboard-react/?_ga=2.34022373.538809748.1705091113-404594367.1704996279#/dashboard/tables
type ComboTableProps = {
	characterName: string,
	combos: Combo[]
}

const CombosTable = ({characterName, combos,}: ComboTableProps) => {
	const router = useRouter();
	const { user } = useUser();

    const handleComboClick = (comboId: number) => {
        const url = `/app/combo-builder/SF6/${characterName}/combo-usage/${comboId}`;
        router.push(url);
    };

	const handleFavoriteClick = (comboId: number) => {
    };

	return (
		<div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md max-w-[90vw] mx-auto mt-10">
			<div className="relative bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 shadow-lg -mt-6 mb-8 p-6">
				<h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
					Combos
				</h6>
			</div>
			<div className="p-6 px-0 pt-0 pb-2">
				<table className="w-full min-w-[640px] table-fixed">
					<thead>
						<tr>
							<th className="w-1/2 border-b border-blue-gray-50 py-3 px-5 text-left">
								<p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">Combo</p>
							</th>
							<th className="w-1/12 border-b border-blue-gray-50 py-3 px-5 text-left">
								<p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">hit</p>
							</th>
							<th className="w-1/12 border-b border-blue-gray-50 py-3 px-5 text-left">
								<p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">count</p>
							</th>
							<th className="w-1/12 border-b border-blue-gray-50 py-3 px-5 text-left">
								<p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">usage</p>
							</th>
							<th className="w-1/12 border-b border-blue-gray-50 py-3 px-5 text-left">
								<p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">damage</p>
							</th>
							<th className="w-1/12 border-b border-blue-gray-50 py-3 px-5 text-left">
								<p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">drive</p>
							</th>
							<th className="w-1/12 border-b border-blue-gray-50 py-3 px-5 text-left">
								<p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">super</p>
							</th>
							<th className="w-1/12 border-b border-blue-gray-50 py-3 px-5 text-left">
								<p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400"></p>
							</th>
						</tr>
					</thead>
					<tbody>
					{combos.sort((a, b) => b.max_damage - a.max_damage).map(combo => (
						<tr 
							key={combo.id}
						>
						<td 
							onClick={() => handleComboClick(combo.id)}
							className="cursor-pointer py-3 px-5 border-b border-blue-gray-50 w-1/4"
						>
							<p className="block antialiased font-sans text-xs font-semibold text-blue-gray-600">
								{combo.moves.map(move => move.name).join(" → ")}
							</p>
						</td>
						<td className="py-3 px-5 border-b border-blue-gray-50 w-1/4">
							<p className="block antialiased font-sans text-xs font-semibold text-blue-gray-500">{combo.link.toUpperCase()}</p>
						</td>
						<td className="py-3 px-5 border-b border-blue-gray-50 w-1/4">
							<p className="block antialiased font-sans text-xs font-semibold text-blue-gray-600">{combo.count}</p>
						</td>
						<td className="py-3 px-5 border-b border-blue-gray-50 w-1/4">
							<p className="block antialiased font-sans text-xs font-semibold text-blue-gray-600">{Math.round(combo.usage*100)+"%"}</p>
						</td>
						<td className="py-3 px-5 border-b border-blue-gray-50 w-1/4">
							<p className="block antialiased font-sans text-xs font-semibold text-blue-gray-600">{Math.round(combo.max_damage)}</p>
						</td>
						<td className="py-3 px-5 border-b border-blue-gray-50 w-1/4">
							<p className="block antialiased font-sans text-xs font-semibold text-blue-gray-600">{combo.drive * -1}</p>
						</td>
						<td className="py-3 px-5 border-b border-blue-gray-50 w-1/4">
							<p className="block antialiased font-sans text-xs font-semibold text-blue-gray-600">{combo.super * -1}</p>
						</td>
						<td 
							onClick={() => handleFavoriteClick(combo.id)}
							className="cursor-pointer py-3 px-5 border-b border-blue-gray-50 w-1/4"
						>
							{user ? (
								<StarIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
							):(
								<StarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
							)}
						</td>
					</tr>
					))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default CombosTable
