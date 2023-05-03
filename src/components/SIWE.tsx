import { EthereumContext } from '@/context/EthereumContext'
import { useContext } from 'react'
import { Button } from './layout/Button'

export const SIWE = () => {
	const { signInWithEthereum, ethereumEnabled, walletConnected } =
		useContext(EthereumContext)

	const active = ethereumEnabled && walletConnected

	return (
		<Button
			action={signInWithEthereum}
			label="Then - Sign In With Ethereum"
			dark={!active}
			disabled={!active}
		/>
	)
}
