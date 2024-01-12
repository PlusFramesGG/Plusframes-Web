import React from 'react'
import Image from 'next/image'

const MaterialTable = () => {
	return (
		<div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md max-w-[90vw] mx-auto mt-10">
			<div className="relative bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 shadow-lg -mt-6 mb-8 p-6">
				<h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
					All Combos
				</h6>
			</div>
			<div className="p-6 px-0 pt-0 pb-2">
				<table className="w-full min-w-[640px] table-auto">
					<thead>
						<tr>
							<th className="border-b border-blue-gray-50 py-3 px-5 text-left">
								<p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">combo</p>
							</th>
							<th className="border-b border-blue-gray-50 py-3 px-5 text-left">
								<p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">damage</p>
							</th>
							<th className="border-b border-blue-gray-50 py-3 px-5 text-left">
								<p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">position</p>
							</th>
							<th className="border-b border-blue-gray-50 py-3 px-5 text-left">
								<p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">meter</p>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
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
										<p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">
											Standing MK
										</p>
										<p className="block antialiased font-sans text-xs font-normal text-blue-gray-500">MK - QCF L|M|H</p>
									</div>
								</div>
							</td>
							<td className="py-3 px-5 border-b border-blue-gray-50">
								<p className="block antialiased font-sans text-xs font-semibold text-blue-gray-600">Minimum: 95</p>
								<p className="block antialiased font-sans text-xs font-semibold text-blue-gray-500">Maximum: 169</p>
							</td>
							<td className="py-3 px-5 border-b border-blue-gray-50">
								<p className="block antialiased font-sans text-xs font-semibold text-blue-gray-500">Corner | Midscreen</p>
								{/* <div
									className="relative grid items-center font-sans uppercase whitespace-nowrap select-none bg-gradient-to-tr from-green-600 to-green-400 text-white rounded-lg py-0.5 px-2 text-[11px] font-medium w-fit"
									style={{ opacity: 1 }}
								>
									<span className="">online</span>
								</div> */}
							</td>
							<td className="py-3 px-5 border-b border-blue-gray-50">
								<p className="block antialiased font-sans text-xs font-semibold text-blue-gray-600">Drive: 0</p>
								<p className="block antialiased font-sans text-xs font-semibold text-blue-gray-500">Super: 0</p>
							</td>
							{/* <td className="py-3 px-5 border-b border-blue-gray-50">
								<a href="#" className="block antialiased font-sans text-xs font-semibold text-blue-gray-600">
									Edit
								</a>
							</td> */}
						</tr>
						<tr>
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
										<p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">
											Standing MK
										</p>
										<p className="block antialiased font-sans text-xs font-normal text-blue-gray-500">MK - QCF L|M|H</p>
									</div>
								</div>
							</td>
							<td className="py-3 px-5 border-b border-blue-gray-50">
								<p className="block antialiased font-sans text-xs font-semibold text-blue-gray-600">Minimum: 95</p>
								<p className="block antialiased font-sans text-xs font-semibold text-blue-gray-500">Maximum: 169</p>
							</td>
							<td className="py-3 px-5 border-b border-blue-gray-50">
								<p className="block antialiased font-sans text-xs font-semibold text-blue-gray-500">Corner | Midscreen</p>
								{/* <div
									className="relative grid items-center font-sans uppercase whitespace-nowrap select-none bg-gradient-to-tr from-green-600 to-green-400 text-white rounded-lg py-0.5 px-2 text-[11px] font-medium w-fit"
									style={{ opacity: 1 }}
								>
									<span className="">online</span>
								</div> */}
							</td>
							<td className="py-3 px-5 border-b border-blue-gray-50">
								<p className="block antialiased font-sans text-xs font-semibold text-blue-gray-600">Drive: 0</p>
								<p className="block antialiased font-sans text-xs font-semibold text-blue-gray-500">Super: 0</p>
							</td>
							{/* <td className="py-3 px-5 border-b border-blue-gray-50">
								<a href="#" className="block antialiased font-sans text-xs font-semibold text-blue-gray-600">
									Edit
								</a>
							</td> */}
						</tr>
						<tr>
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
										<p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">
											Standing MK
										</p>
										<p className="block antialiased font-sans text-xs font-normal text-blue-gray-500">MK - QCF L|M|H</p>
									</div>
								</div>
							</td>
							<td className="py-3 px-5 border-b border-blue-gray-50">
								<p className="block antialiased font-sans text-xs font-semibold text-blue-gray-600">Minimum: 95</p>
								<p className="block antialiased font-sans text-xs font-semibold text-blue-gray-500">Maximum: 169</p>
							</td>
							<td className="py-3 px-5 border-b border-blue-gray-50">
								<p className="block antialiased font-sans text-xs font-semibold text-blue-gray-500">Corner | Midscreen</p>
								{/* <div
									className="relative grid items-center font-sans uppercase whitespace-nowrap select-none bg-gradient-to-tr from-green-600 to-green-400 text-white rounded-lg py-0.5 px-2 text-[11px] font-medium w-fit"
									style={{ opacity: 1 }}
								>
									<span className="">online</span>
								</div> */}
							</td>
							<td className="py-3 px-5 border-b border-blue-gray-50">
								<p className="block antialiased font-sans text-xs font-semibold text-blue-gray-600">Drive: 0</p>
								<p className="block antialiased font-sans text-xs font-semibold text-blue-gray-500">Super: 0</p>
							</td>
							{/* <td className="py-3 px-5 border-b border-blue-gray-50">
								<a href="#" className="block antialiased font-sans text-xs font-semibold text-blue-gray-600">
									Edit
								</a>
							</td> */}
						</tr>
						<tr>
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
										<p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">
											Standing MK
										</p>
										<p className="block antialiased font-sans text-xs font-normal text-blue-gray-500">MK - QCF L|M|H</p>
									</div>
								</div>
							</td>
							<td className="py-3 px-5 border-b border-blue-gray-50">
								<p className="block antialiased font-sans text-xs font-semibold text-blue-gray-600">Minimum: 95</p>
								<p className="block antialiased font-sans text-xs font-semibold text-blue-gray-500">Maximum: 169</p>
							</td>
							<td className="py-3 px-5 border-b border-blue-gray-50">
								<p className="block antialiased font-sans text-xs font-semibold text-blue-gray-500">Corner | Midscreen</p>
								{/* <div
									className="relative grid items-center font-sans uppercase whitespace-nowrap select-none bg-gradient-to-tr from-green-600 to-green-400 text-white rounded-lg py-0.5 px-2 text-[11px] font-medium w-fit"
									style={{ opacity: 1 }}
								>
									<span className="">online</span>
								</div> */}
							</td>
							<td className="py-3 px-5 border-b border-blue-gray-50">
								<p className="block antialiased font-sans text-xs font-semibold text-blue-gray-600">Drive: 0</p>
								<p className="block antialiased font-sans text-xs font-semibold text-blue-gray-500">Super: 0</p>
							</td>
							{/* <td className="py-3 px-5 border-b border-blue-gray-50">
								<a href="#" className="block antialiased font-sans text-xs font-semibold text-blue-gray-600">
									Edit
								</a>
							</td> */}
						</tr>
						<tr>
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
										<p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">
											Standing MK
										</p>
										<p className="block antialiased font-sans text-xs font-normal text-blue-gray-500">MK - QCF L|M|H</p>
									</div>
								</div>
							</td>
							<td className="py-3 px-5 border-b border-blue-gray-50">
								<p className="block antialiased font-sans text-xs font-semibold text-blue-gray-600">Minimum: 95</p>
								<p className="block antialiased font-sans text-xs font-semibold text-blue-gray-500">Maximum: 169</p>
							</td>
							<td className="py-3 px-5 border-b border-blue-gray-50">
								<p className="block antialiased font-sans text-xs font-semibold text-blue-gray-500">Corner | Midscreen</p>
								{/* <div
									className="relative grid items-center font-sans uppercase whitespace-nowrap select-none bg-gradient-to-tr from-green-600 to-green-400 text-white rounded-lg py-0.5 px-2 text-[11px] font-medium w-fit"
									style={{ opacity: 1 }}
								>
									<span className="">online</span>
								</div> */}
							</td>
							<td className="py-3 px-5 border-b border-blue-gray-50">
								<p className="block antialiased font-sans text-xs font-semibold text-blue-gray-600">Drive: 0</p>
								<p className="block antialiased font-sans text-xs font-semibold text-blue-gray-500">Super: 0</p>
							</td>
							{/* <td className="py-3 px-5 border-b border-blue-gray-50">
								<a href="#" className="block antialiased font-sans text-xs font-semibold text-blue-gray-600">
									Edit
								</a>
							</td> */}
						</tr>
						<tr>
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
										<p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">
											Standing MK
										</p>
										<p className="block antialiased font-sans text-xs font-normal text-blue-gray-500">MK - QCF L|M|H</p>
									</div>
								</div>
							</td>
							<td className="py-3 px-5 border-b border-blue-gray-50">
								<p className="block antialiased font-sans text-xs font-semibold text-blue-gray-600">Minimum: 95</p>
								<p className="block antialiased font-sans text-xs font-semibold text-blue-gray-500">Maximum: 169</p>
							</td>
							<td className="py-3 px-5 border-b border-blue-gray-50">
								<p className="block antialiased font-sans text-xs font-semibold text-blue-gray-500">Corner | Midscreen</p>
								{/* <div
									className="relative grid items-center font-sans uppercase whitespace-nowrap select-none bg-gradient-to-tr from-green-600 to-green-400 text-white rounded-lg py-0.5 px-2 text-[11px] font-medium w-fit"
									style={{ opacity: 1 }}
								>
									<span className="">online</span>
								</div> */}
							</td>
							<td className="py-3 px-5 border-b border-blue-gray-50">
								<p className="block antialiased font-sans text-xs font-semibold text-blue-gray-600">Drive: 0</p>
								<p className="block antialiased font-sans text-xs font-semibold text-blue-gray-500">Super: 0</p>
							</td>
							{/* <td className="py-3 px-5 border-b border-blue-gray-50">
								<a href="#" className="block antialiased font-sans text-xs font-semibold text-blue-gray-600">
									Edit
								</a>
							</td> */}
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default MaterialTable
