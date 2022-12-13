import React from "react";
import NavBar from "../components/navBar";

const ErrorPage = () => {
	return (
			<>
				<NavBar />
				<div className="text-center"  id="error-page" style={{padding: "20px"}}>
						<img src="/pictures/error_emoji.svg" alt="" width="50%" height="50%" />
						<h1>Oops, page didn`t found</h1>
				</div>
			</>
	)
}

export default ErrorPage;
