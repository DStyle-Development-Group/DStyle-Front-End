import { ReactNode } from 'react'

export const Card = ({ children }: { children: ReactNode }) => {
	return (
		<div className="p-10 h-96 w-1/3 flex flex-col items-center justify-start min-w-max bg-black text-white rounded-3xl drop-shadow-lg font-semibold">
			{children}
		</div>
	)
}
