"use server";

import url from "url";
import path from "path";
import Gerencianet from "gn-api-sdk-typescript";

const certPath = url.pathToFileURL(
	path.join(
		process.cwd(),
		process.env.VERCEL_ENV == "production"
			? "/cert/production.p12"
			: "/cert/development.p12"
	)
);

const gn = new Gerencianet({
	sandbox: process.env.VERCEL_ENV == "development" ? true : false,
	client_id: process.env.EFI_CLIENT_ID as string,
	client_secret: process.env.EFI_SECRET as string,
	certificate: certPath,
});

export default gn;
