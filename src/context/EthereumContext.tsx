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
	const [token, setToken] = useState('') // eventually move to separate context
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
			const signature = await (
				signer as providers.JsonRpcSigner
			).signMessage(message)
			await getToken(signature)
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

	// todo - is there anon way to ensure eth accounts are owned by unique real people?
	// todo - if new eth address, verify/create new user
	// todo - figure out way to prevent DDOS (maybe just time delay + animation while receiving token?)
	async function getToken(signedMessage: string): Promise<void> {
		const response = await fetch('https://example.com/api/login', {
			method: 'POST',
			body: JSON.stringify({
				signature: signedMessage
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		if (!response.ok) {
			setStatusMessage(`${response.status} ${response.statusText}`)
		} else {
			const data = await response.json()
			setToken(data.token)
		}
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
