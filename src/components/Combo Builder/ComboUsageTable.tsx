import React, { useState } from 'react'
import { ComboUsage, Games } from '@/shared/types'
import { useRouter } from 'next/router';
import SF6CharacterSmallPortrait from './SF6/SF6CharacterSmallPortrait';


type ComboTableProps = {
	characterName: string,
	comboUsage: ComboUsage
}

const CombosUsageTable = ({characterName, comboUsage}: ComboTableProps) => {
	const router = useRouter();

    const handleRowClick = (comboId: number) => {
        const url = `/app/combo-builder/SF6/${characterName}/combo-usage/${comboId}`;
        router.push(url);
    };

	return (
		<div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md max-w-[90vw] mx-auto mt-10">
			<div className="relative bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 shadow-lg -mt-6 mb-8 p-6">
            <div className="flex items-center py-3 px-5 w-full">
                <div className="flex-shrink-0">
                    <SF6CharacterSmallPortrait characterName={characterName} game={Games.SF6} size={75}/>
                </div>
                    <h6 className="ml-4 antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
                        {comboUsage.combo.moves.map(move => move.name).join(" → ")}
                    </h6>
                </div>
                <div className="p-6 px-0 pt-0 pb-2">
                    <table className="w-full min-w-[640px] table-fixed">
                        <thead>
                            <tr>
                                <th className="w-1/12 border-b border-blue-gray-50 py-3 px-5 text-left">
                                <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">Damage</h6>
                                </th>
                                <th className="w-1/12 border-b border-blue-gray-50 py-3 px-5 text-left">
                                <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">Link(Gap)</h6>
                                </th>
                                <th className="w-1/12 border-b border-blue-gray-50 py-3 px-5 text-left">
                                <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">Super</h6>
                                </th>
                                <th className="w-1/12 border-b border-blue-gray-50 py-3 px-5 text-left">
                                <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">Drive</h6>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr 
                                key="combo_stats"
                            >
                            <td className="py-3 px-5 border-b border-blue-gray-50 w-1/12">
                                <p className="block antialiased font-sans text-xs font-semibold text-blue-gray-600">{comboUsage.combo.max_damage}</p>
                            </td>
                            <td className="py-3 px-5 border-b border-blue-gray-50 w-1/12">
                                <p className="block antialiased font-sans text-xs font-semibold text-blue-gray-600">{comboUsage.combo.link}({comboUsage.combo.gap})</p>
                            </td>
                            <td className="py-3 px-5 border-b border-blue-gray-50 w-1/12">
                                <p className="block antialiased font-sans text-xs font-semibold text-blue-gray-600">{comboUsage.combo.super}</p>
                            </td>
                            <td className="py-3 px-5 border-b border-blue-gray-50 w-1/12">
                                <p className="block antialiased font-sans text-xs font-semibold text-blue-gray-600">{comboUsage.combo.drive}</p>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="p-6 px-0 pt-0 pb-2">
                <table className="w-full min-w-[640px] table-fixed">
                    <thead>
                        <tr>
                            <th className="w-1/5 border-b border-blue-gray-50 py-3 px-5 text-left">
                                <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">CFN ID</p>
                            </th>
                            <th className="w-1/5 border-b border-blue-gray-50 py-3 px-5 text-left">
                                <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">Round Number</p>
                            </th>
                            <th className="w-1/5 border-b border-blue-gray-50 py-3 px-5 text-left">
                                <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">Round Time</p>
                            </th>
                            <th className="w-1/5 border-b border-blue-gray-50 py-3 px-5 text-left">
                                <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">Player One</p>
                            </th>
                            <th className="w-1/5 border-b border-blue-gray-50 py-3 px-5 text-left">
                                <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">Player Two</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {comboUsage.usage.map(comboUse => (
                        <tr 
                            key={comboUsage.combo.id}
                        >
                        <td className="py-3 px-5 border-b border-blue-gray-50 w-1/5">
                            <p className="block antialiased font-sans text-xs font-semibold text-blue-gray-500">{comboUse.cfn_id.toUpperCase()}</p>
                        </td>
                        <td className="py-3 px-5 border-b border-blue-gray-50 w-1/5">
                            <p className="block antialiased font-sans text-xs font-semibold text-blue-gray-600">{comboUse.round_number}</p>
                        </td>
                        <td className="py-3 px-5 border-b border-blue-gray-50 w-1/5">
                            <p className="block antialiased font-sans text-xs font-semibold text-blue-gray-600">{comboUse.round_time}</p>
                        </td>
                        <td className="py-3 px-5 border-b border-blue-gray-50 w-1/5">
                            <div className="inline-flex items-center space-x-2">
                            <SF6CharacterSmallPortrait characterName={comboUse.character_one_name} game={Games.SF6} size={40}/>
                                <p className="block antialiased font-sans text-xs font-semibold text-blue-gray-600">
                                    {comboUse.player_one_name}
                                </p>
                                
                            </div>
                        </td>
                        <td className="py-3 px-5 border-b border-blue-gray-50 w-1/5">
                            <div className="inline-flex items-center space-x-2">
                            <SF6CharacterSmallPortrait characterName={comboUse.character_two_name} game={Games.SF6} size={40}/>
                                <p className="block antialiased font-sans text-xs font-semibold text-blue-gray-600">
                                    {comboUse.player_two_name}
                                </p>
                                
                            </div>
                        </td>
                    </tr>
                    ))}
                    </tbody>
                </table>
            </div>
		</div>
	)
}

export default CombosUsageTable
