import '@/styles/globals.css'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import EthereumProvider from '@/context/EthereumContext'

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<EthereumProvider>
			<Component {...pageProps} />
		</EthereumProvider>
	)
}
