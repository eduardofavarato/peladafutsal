import { Alert } from "react-bootstrap";

interface ErrorAlertProps {
	dismiss: () => void;
}

function ErrorAlert(props: React.PropsWithChildren<ErrorAlertProps>) {
	const { dismiss } = props;

	return (
		<Alert variant="danger" onClose={dismiss} dismissible>
			Vish, algo deu errado! Tenta de novo aí
		</Alert>
	);
}

export default ErrorAlert;
