import { Card } from '@/components/layout/Card'
import { SIWE } from '@/components/SIWE'
import { ConnectUserWallet } from '@/components/connectUserWallet'
import Image from 'next/image'
import { metamaskDownloadLink } from '@/constants'

export default function Page() {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="m-20 text-7xl">Welcome to the future</h1>
			<Card>
				<div className="flex items-center text-4xl my-8">
					<div>
						<Image
							src="/ethereumLogo.png"
							alt="Image of Ethereum logo"
							height={100}
							width={55}
						></Image>
					</div>

					<h2 className="ml-3">
						Sign In With <br /> Ethereum
					</h2>
				</div>

				<ConnectUserWallet />
				<SIWE />
				<p className="my-4 text-4xl">or</p>
				<div className="flex flex-col items-center my-4">
					<h2 className="text-2xl">New to Ethereum?</h2>
					<p>Install Metamask to get started</p>
					<a
						href={metamaskDownloadLink}
						className="flex flex-col items-center p-4 bg-violet-700 rounded-lg m-2"
					>
						<Image
							src="/MMFox-clipped.png"
							alt="Image of MetaMask logo"
							height={100}
							width={100}
						></Image>
						<p>Metamask</p>
					</a>
				</div>
			</Card>
		</div>
	)
}
