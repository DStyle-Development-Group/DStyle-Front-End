import { EthereumContext } from '@/context/EthereumContext'
import { useContext } from 'react'
import { Button } from './layout/Button'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

export const ConnectUserWallet = () => {
	const { connectWallet, ethereumEnabled, walletConnected, account } =
		useContext(EthereumContext)

	const active = ethereumEnabled

	return (
		<>
			{walletConnected ? (
				<div className="flex items-center">
					<CheckCircleIcon className="h-10 w-10 text-green-500 mr-2" />
					Wallet connected with account <br /> {account}
				</div>
			) : (
				<Button
					action={connectWallet}
					label={'First - Connect Wallet'}
					dark={!active}
					disabled={!active}
				/>
			)}
		</>
	)
}
