import type { providers } from 'ethers'

declare global {
	interface Window {
		ethereum: EthersProvider
	}
}

type ExtensionForProvider = {
	isConnected(): () => boolean
}

type EthersProvider = providers.ExternalProvider & ExtensionForProvider

export interface IEthereumContext {
	ethereumEnabled: boolean
	provider: providers.Web3Provider | undefined
	walletConnected: boolean
	signer: providers.JsonRpcSigner | undefined
	account: string | undefined
	statusMessage: string
	connectWallet: (() => Promise<void>) | undefined
	signInWithEthereum: (() => Promise<void>) | undefined
}
