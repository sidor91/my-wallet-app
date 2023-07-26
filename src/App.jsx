import {
	EthereumClient,
	w3mConnectors,
	w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import {
	configureChains,
	createConfig,
	WagmiConfig,
} from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { Toaster } from "react-hot-toast";
import { HomePage } from "./pages/HomePage/HomePage";
import { goerli, sepolia, mainnet } from "wagmi/chains";

const { VITE_PROJECT_ID, VITE_ALCHEMY_API_KEY } = import.meta.env;

const chains = [mainnet, sepolia,goerli];
const projectId = VITE_PROJECT_ID;

const { publicClient } = configureChains(chains, [
	alchemyProvider({ apiKey: VITE_ALCHEMY_API_KEY }),
	w3mProvider({ projectId }),
]);
const wagmiConfig = createConfig({
	autoConnect: true,
	connectors: w3mConnectors({ version: 1, projectId, chains }),
	publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

function App() {
	return (
		<>
			<WagmiConfig config={wagmiConfig}>
				<HomePage />
			</WagmiConfig>
			<Toaster
				position="top-center"
				reverseOrder={false}
				gutter={8}
				containerClassName=""
				containerStyle={{}}
				toastOptions={{
					duration: 3000,
					style: {
						background: "rgb(250, 250, 250)",
						color: "rgb(30, 31, 40)",
					},
				}}
			/>
			<Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
		</>
	);
}
export default App;
