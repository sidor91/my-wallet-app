import { useWeb3Modal } from "@web3modal/react";
import { useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { Button } from "./UserButton.styled";

export const UserButton = () => {
	const [userAccount, setUserAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [loading, setLoading] = useState(false);
	const { open } = useWeb3Modal();
	const { address, isConnected } = useAccount({
		onConnect({ address }) {
			const addressShownOnBtn = `${address.slice(0, 5)}...${address.slice(
				address.length - 4,
				address.length
			)}`;
			setUserAccount(addressShownOnBtn);
		},
	});
	useBalance({
		address,
		onSuccess(data) {
		const balanceToSHow = Number(data.formatted).toFixed(3);
		setUserBalance(balanceToSHow);
		},
	});

	async function onOpen() {
		setLoading(true);
		await open();
		setLoading(false);
	}

	return (
		<Button onClick={() => onOpen()} disabled={loading}>
			{isConnected && (
				<>
					<span style={{ marginRight: 10 }}>{userBalance}</span>
					<span>{userAccount}</span>
				</>
			)}
			{!isConnected && !loading && "Connect Wallet"}
			{loading && "Loading..."}
		</Button>
	);
};
