import { ReactNode } from 'react'

export default function Card({ children }: { children: ReactNode }) {
	return (
		<div className="flex items-center justify-center bg-black text-white rounded-md drop-shadow-lg font-semibold">
			{children}
		</div>
	)
}
