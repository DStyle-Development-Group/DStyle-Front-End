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
