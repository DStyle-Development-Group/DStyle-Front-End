import { IEthereumContext } from '@/Interfaces/interfaces'
import { ReactNode, createContext, useEffect, useState } from 'react'
import { providers } from 'ethers'
import { SiweMessage } from 'siwe'

export const EthereumContext = createContext<IEthereumContext>({
	ethereumEnabled: false,
	provider: undefined,
	walletConnected: false,
	account: undefined,
	signer: undefined,
	statusMessage: '',
	connectWallet: undefined,
	signInWithEthereum: undefined
})

const EthereumProvider = ({ children }: { children: ReactNode }) => {
	const [ethereumEnabled, setEthereumEnabled] = useState(false)
	const [provider, setProvider] = useState<providers.Web3Provider>()
	const [walletConnected, setWalletConnected] = useState(false)
	const [account, setAccount] = useState('')
	const [signer, setSigner] = useState<providers.JsonRpcSigner>()
	const [signature, setSignature] = useState<string | undefined>(undefined)
	const [token, setToken] = useState('')
	const [statusMessage, setStatusMessage] = useState('')

	useEffect(() => {
		try {
			setProvider(new providers.Web3Provider(window.ethereum))
			setEthereumEnabled(true)
		} catch {
			setStatusMessage(
				'No Ethereum wallet found - have you installed Metamask?'
			)
		}
	}, [])

	async function connectWallet() {
		try {
			setAccount(await provider?.send('eth_requestAccounts', []))
			setSigner(provider?.getSigner())
			setWalletConnected(true)
		} catch (err) {
			setStatusMessage(`Error connecting wallet: ${err}`)
		}
	}

	async function signInWithEthereum() {
		try {
			const message = createSiweMessage(
				account,
				'Sign in with Ethereum wallet'
			)
			console.log(await signer?.signMessage(message))
		} catch (err) {
			setStatusMessage(`Error signing in: ${err}`)
		}
	}

	function createSiweMessage(address: string, statement: string) {
		const domain = window.location.host
		const origin = window.location.origin

		const message = new SiweMessage({
			domain,
			address,
			statement,
			uri: origin,
			version: '1',
			chainId: 1
		})
		return message.prepareMessage()
	}

	const value = {
		ethereumEnabled,
		provider,
		walletConnected,
		account,
		signer,
		statusMessage,
		connectWallet,
		signInWithEthereum
	}

	return (
		<EthereumContext.Provider value={value}>
			{children}
		</EthereumContext.Provider>
	)
}

export default EthereumProvider
