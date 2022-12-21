import "./Loading.css";

interface LoadingProps {
	loading: boolean;
}

function Loading(props: React.PropsWithChildren<LoadingProps>) {
	const { loading } = props;

	if (loading) {
		return (
			<div className="loading-wrapper d-flex align-items-center justify-content-center">
				{loading && (
					<div>
						<div className="loading-spinner mx-auto"></div>
						<div className="text-center mt-2">carregando</div>
					</div>
				)}
			</div>
		);
	}

	return <div>{props.children}</div>;
}

export default Loading;
