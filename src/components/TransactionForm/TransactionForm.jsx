import { useSendTransaction, useWaitForTransaction } from "wagmi";
import { useState } from "react";
import { ethers } from "ethers";
import {
	Container,
	Header,
	Form,
	SubmitButton,
	CancelButton,
	WalletAddrInput,
	ValueInput,
	WalletAddrInputContainer,
	ValueInputContainer,
	InputErrorContainer,
	InputWarningContainer,
	InputWarningText,
	SuccessStatusIcon,
} from "./TransactionForm.styled";
import { useFormik } from "formik";
import * as Yup from "yup";
import { RotatingLines } from "react-loader-spinner";
import toast from "react-hot-toast";
import inputIconSuccess from "../../assets/inputIconSuccess.svg";
import inputIconError from "../../assets/inputIconError.svg";

export const TransactionForm = () => {
	const [checksumError, setChecksumError] = useState(null);
	const [hash, setHash] = useState("");

	const {
		isLoading: sendTransactionLoading,
		sendTransactionAsync,
		reset,
	} = useSendTransaction({
		onSuccess() {
			toast.success("Transaction sent");
		},
	});

	const { isLoading: waitTransactionLoading } = useWaitForTransaction({
		hash,
		onSuccess() {
			toast.success("Transaction delivered successfully");
			formik.values.address = "";
			formik.values.amount = "";
		},
		onError() {
			toast.error("Transaction failed");
			formik.values.address = "";
			formik.values.amount = "";
		},
	});

	const onSubmit = async (data) => {
		try {
			ethers.getAddress(data.address);
			const transaction = await sendTransactionAsync({
				to: data.address,
				value: ethers.parseEther(data.amount.toString()),
			});
			setHash(transaction.hash);
		} catch (error) {
			if (error.code === "INVALID_ARGUMENT") {
				setChecksumError("The Checksum hasn't been passed");
			} else if (error.message.slice(0, 26) === "User rejected the request.") {
				toast.error("User rejected the request.");
			}
		}
	};

	const initialValues = { address: "", amount: "" };

	const validationSchema = Yup.object({
		address: Yup.string()
			.matches(/^0x[0-9A-Fa-f]{40}$/, "Invalid format")
			.required("Required"),
		amount: Yup.number()
			.min(0.000001, "The minimum amount is 0.000001")
			.max(100000, "The maximum amount is 100000")
			.required("Required"),
	});

	var formik = useFormik({
		initialValues,
		onSubmit,
		validationSchema,
	});

	return (
		<Container>
			<Header>Make a transaction</Header>
			<Form onSubmit={formik.handleSubmit}>
				<WalletAddrInputContainer>
					<WalletAddrInput
						$haserror={formik.touched.address && formik.errors.address}
						$correct={
							formik.touched.address &&
							!formik.errors.address &&
							formik.values.address !== ""
						}
						$checksumerror={checksumError}
						disabled={sendTransactionLoading}
						type="text"
						name="address"
						placeholder="Wallet address"
						onChange={(e) => {
							formik.handleChange(e);
							setChecksumError(null);
						}}
						value={formik.values.address}
						onBlur={formik.handleBlur}
					/>
					{formik.touched.address && formik.errors.address && (
						<>
							<SuccessStatusIcon src={inputIconError} />
							<InputErrorContainer>{formik.errors.address}</InputErrorContainer>
						</>
					)}
					{formik.touched.address && !formik.errors.address && (
						<SuccessStatusIcon src={inputIconSuccess} />
					)}
					{checksumError && (
						<InputErrorContainer>{checksumError}</InputErrorContainer>
					)}
				</WalletAddrInputContainer>
				<ValueInputContainer>
					<ValueInput
						$haserror={formik.touched.amount && formik.errors.amount}
						$correct={
							formik.touched.amount &&
							!formik.errors.amount &&
							formik.values.amount !== ""
						}
						disabled={sendTransactionLoading}
						name="amount"
						type="number"
						placeholder="Value"
						step="0.000001"
						min="0.000001"
						onChange={formik.handleChange}
						value={formik.values.amount}
						onBlur={formik.handleBlur}
					/>
					{formik.touched.amount && formik.errors.amount && (
						<>
							<SuccessStatusIcon src={inputIconError} />
							<InputErrorContainer>{formik.errors.amount}</InputErrorContainer>
						</>
					)}
					{formik.touched.amount && !formik.errors.amount && (
						<SuccessStatusIcon src={inputIconSuccess} />
					)}
				</ValueInputContainer>
				{waitTransactionLoading && (
					<InputWarningContainer>
						<InputWarningText>
							Transaction complete is pending...Please wait
						</InputWarningText>
					</InputWarningContainer>
				)}
				{sendTransactionLoading && (
					<InputWarningContainer>
						<InputWarningText>
							Please, confirm your transaction in MetaMask...
						</InputWarningText>
					</InputWarningContainer>
				)}
				<SubmitButton
					type="submit"
					disabled={sendTransactionLoading || waitTransactionLoading}
				>
					{sendTransactionLoading || waitTransactionLoading ? (
						<span style={{ marginRight: 10 }}>Loading...</span>
					) : (
						"Send"
					)}
					<RotatingLines
						strokeColor="grey"
						strokeWidth="5"
						animationDuration="0.75"
						width="30"
						visible={sendTransactionLoading || waitTransactionLoading}
					/>
				</SubmitButton>
				{sendTransactionLoading && (
					<CancelButton type="button" onClick={() => reset()}>
						Cancel
					</CancelButton>
				)}
			</Form>
		</Container>
	);
};
