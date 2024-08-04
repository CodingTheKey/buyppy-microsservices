export class Hash {
	async execute(value: string, SECRET_KEY: string): Promise<string> {
		const secretKey = new TextEncoder().encode(SECRET_KEY);

		const messageBuffer = new TextEncoder().encode(value);

		const key = await crypto.subtle.importKey(
			"raw",
			secretKey,
			{ name: "HMAC", hash: "SHA-256" },
			false,
			["sign", "verify"],
		);

		const signature = await crypto.subtle.sign("HMAC", key, messageBuffer);

		const hashHex = Array.prototype.map
			.call(new Uint8Array(signature), (x) => ("00" + x.toString(16)).slice(-2))
			.join("");

		return hashHex;
	}
}
