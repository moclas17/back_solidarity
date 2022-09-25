/*
 * https://docs.nftport.xyz/docs/nftport/ZG9jOjQ0MDgxNDc3-how-to-create-your-nft-collection#step-3-deploy-a-collection-contract
 *
 * servicio que crea y despliga un contrato de coleccion de NFTs
 */

const axios = require("axios").default;
require("dotenv").config();

const permitWallets = [
	"0x0e88AC34917a6BF5E36bFdc2C6C658E58078A1e6".toLowerCase(),
	"0x105f83C74aD66776e317ABa4AeC1FB392cCa7c37".toLowerCase(),
	"0x6525BcC36B71371514a1faAf1966395B6c7bE599".toLowerCase(),
	"0x76D9995e68a44B786a665E5631d06fbbdA047eE2".toLowerCase(),
];
let valid = false;

const collection = (req, res) => {
	let wallet = req.body.wallet;
	for (let i = 0; i < permitWallets.length; i++) {
		if (wallet == permitWallets[i]) {
			valid = true;
		}
	}
	if (valid) {
		var options = {
			method: "POST",
			url: "https://api.nftport.xyz/v0/contracts/collections",
			headers: { "Content-Type": "application/json", Authorization: process.env.API_KEY },
			data: {
				chain: process.env.CHAIN,
				name: req.body.name,
				symbol: req.body.simbol,
				max_supply: req.body.maxSupply,
				mint_price: req.body.price,
				tokens_per_mint: 10,
				royalties_share: 500,
				royalties_address: "0x105f83C74aD66776e317ABa4AeC1FB392cCa7c37",
				owner_address: "0x105f83C74aD66776e317ABa4AeC1FB392cCa7c37",
				treasury_address: "0x105f83C74aD66776e317ABa4AeC1FB392cCa7c37",
				public_mint_start_date: req.body.fechaLanzamiento, //formato '2022-02-08T11:30:48+00:00',
				metadata_updatable: true,
				base_uri: "",
				prereveal_token_uri: req.body.baseURI,
			},
		};

		axios.request(options)
			.then(function (response) {
				res.json(response.data);
			})
			.catch(function (err) {
				res.status(500).json({ error: err });
			});
	} else {
		res.status(500).json({ error: "not Allowed" });
	}
};

module.exports = collection;
