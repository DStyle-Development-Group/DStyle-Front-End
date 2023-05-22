import type { providers } from 'ethers'

// required because metamasks injects an api for ethereum access
// using the window.ethereum provider object
declare global {
	interface Window {
		ethereum: EthersProvider
	}
}

type ExtensionForProvider = {
	isConnected(): () => boolean
}

type EthersProvider = providers.ExternalProvider & ExtensionForProvider
