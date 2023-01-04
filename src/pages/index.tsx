import Card from '@/components/Card'

export default function Page() {
	return (
		<div className="flex flex-col items-center justify-start h-screen">
			<h1 className="py-60 text-7xl">Welcome to the future</h1>
			<div className="w-1/4">
				<Card>
					<h2>Sign In With Ethereum</h2>
					{/* 
					todo - select method with wallet logos
						- "don't have a wallet yet?"
					*/}
				</Card>
			</div>
		</div>
	)
}
