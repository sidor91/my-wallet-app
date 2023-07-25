import { useWeb3Modal } from "@web3modal/react";
import { useState, useEffect } from "react";
import { useAccount, useBalance } from "wagmi";
import { Button } from "./UserButton.styled";


export const UserButton = () => {
	const [userAccount, setUserAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [loading, setLoading] = useState(false);
	const { open } = useWeb3Modal();
	const { address, isConnected } = useAccount();
	const { data: balanceData } = useBalance({
		address,
	});
	useEffect(() => {
		if (isConnected && !userAccount && !userBalance) {
			const addressShownOnBtn =
				`${address?.slice(0, 5)}...${address?.slice(
					address.length - 4,
					address.length
				)}` || "";

			const balanceToSHow = Number(balanceData?.formatted).toFixed(3);
			setUserAccount(addressShownOnBtn);
			setUserBalance(balanceToSHow);
		}
	}, [userAccount, balanceData, isConnected]);

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
