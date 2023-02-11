import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react';
import { CrowdsaleContext } from "../context/CrowdsaleContext";
import { ConnectWallet,useAddress,useSDK, Web3Button } from "@thirdweb-dev/react";
import {
	icoContractAddress, 
	BUSDtokenAddress,
	ICOAbi,
	BUSDAbi
} from "../lib/constants"
import Swal from 'sweetalert2'
import { ethers } from 'ethers';

export default function Ico() {

    const [isAmountAproved, setIsAmountAproved] = useState(false);

	const [amount, setAmount] = useState();

	const [beneficiary, setBeneficiary] = useState();

	const sdk = useSDK();

	const address = useAddress()

	const approveUSD = async(contract) => {

		try {
           console.log("Approving Contract");
            //const challengeAmountWei = ethers.utils.parseEther(challengeAmount);
        
		   validateInput();

           await contract.call('approve', icoContractAddress, amount); 
           
		   setIsAmountAproved(true);

		   Swal.fire({
			icon: 'success',
			title: 'Approved',
			text: 'Transaction has been approved by user',
		   })

            //console.log(`${challengeAmountWei}SVT Approved for spending`);
        }catch(error){
            console.log({error})
			Swal.fire({
				icon: 'error',
				title: 'Error Occured',
				text: error
			})
        }
	}

	const validateInput = () =>{
		if(!beneficiary  || !amount || !ethers.utils.isAddress(beneficiary)){
			throw new Error("Enter Valid Benefiaciary and Amount");
		}
	}

	const buyToken = async(contract) => {
		console.log("Buying Token"+beneficiary);

		validateInput();

		await contract.call('buyTokensInBUSD', beneficiary , amount)
		.then((ss)=>{
			console.log("Logging 1");
			console.log(ss)
			Swal.fire({
				icon: 'success',
				title: 'Successful',
				text: 'payME Token Purchase is Successful',
			})

		}).catch((error) => {
			console.log("Logging 2");
			console.log(error.data)
			
			Swal.fire({
				icon: 'error',
				title: 'Error Occured',
				text: error.reason
			})
		}); 




	}

    // useEffect(async()=>{
		
	// 	await setAddress(sdk.wallet.getAddress());
	// },[address]);


    return (
        <div>
		<header className="transition">
			<div className="container">
				<div className="row flex-align">
					<div className="col-lg-4 col-md-3 col-8">
						<div className="logo">
							<a href="index.html">
								daveCoin
							</a>
						</div>
					</div>
					<div className="col-lg-8 col-md-9 col-4 text-right">
						<div className="menu-toggle">
							<span></span>
						</div>
						<div className="menu">
							<ul className="d-inline-block">
								<li><a href="#TokenSale">Buy Token</a></li>
							</ul>
							<div className="signin d-inline-block">
							<ConnectWallet accentColor="#f213a4" colorMode="dark" />

								
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>

		<section className="sub-page-banner parallax" id="banner">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<div className="page-banner text-center wow fadeInUp">
							<h1 className="sub-banner-title">What is daveCoin</h1>
							<button className="btn">Read White-paper</button>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section id='TokenSale' className="token-sele skyblue pt-20">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<div className="section-heading text-center pb-65 wow fadeInUp">
							<label className="sub-heading">daveCoin Token</label>
							<h2 className="heading-title">Initial Coin Offering</h2>
							<p className="heading-des">Get whitelisted to participate in ICO</p>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-6 col-md-12 wow fadeInLeft">
						<div className="information-token">
							<h2 className="information-token-head">Information About Tokens</h2>
							<ul>
								<li><label>Token Name</label> <span>daveCoin</span></li>
								<li><label>Nominal Price</label> <span>1daveCoin = 0.00005USD</span></li>
								<li><label>Total Number of Token Produced</label> <span>5 BN daveCoin</span></li>
								<li><label>Unsold Tokens</label> <span>Burn Smart Contrac</span></li>
								<li><label>Type of Token</label> <span>BEP-20</span></li>
								<li><label>Minimal transaction amount</label> <span>100 USD</span></li>
							</ul>
							<div className="clear"></div>
						</div>
					</div>

					<div className="col-xl-5 col-lg-6 col-md-12 wow fadeInRight animated">
                        <div className="contact-form">
                            <h2 className="page-heading mb-4">Buy daveCoin Token Now</h2>
                            <div className="contactfrm token-sale-counter">
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12 col-md-12">
                                        <div className="form-group">
											<label className='form-label'>Beneficiary</label>
                                            <input 
											  type="text" 
											  name="Beneficiary" 
											  className="form-control" 
											  placeholder="Beneficiary*" 
											  required=""
											  value={beneficiary}
											  onChange={(e) => setBeneficiary(e.target.value)}
											  />
                                        </div>
                                    </div>
                                    <div className="col-xl-12 col-lg-12 col-md-12">
                                        <div className="form-group">
										<label className='form-label'>Amount</label>

                                            <input 
											value={amount}
											onChange={(e) => setAmount(e.target.value)}
											type="number" 
											name="Amount" className="form-control" placeholder="Amount*" required=""/>
                                        </div>
                                    </div>                                 

								  {address ? (
									<div>
										<div className="col-xl-12 col-lg-12 col-md-12 ">
								 <Web3Button
									contractAddress={BUSDtokenAddress}
									contractAbi = {BUSDAbi}
									// action={(contract) => console.log(contract)}
									action={(contract) => approveUSD(contract) }
									onError = {(e)=>{
										console.log(e);
									}}
									>
									Approve Amount
								</Web3Button>
									
								</div>

								<div className="col-xl-12 col-lg-12 col-md-12 mt-2">
								
									<Web3Button
									contractAddress={icoContractAddress}
									contractAbi = {ICOAbi}
									// action={(contract) => console.log(contract)}
									action={(contract) => buyToken(contract) }
									>
									Buy Token
								</Web3Button>
								
								
								</div>
																

								</div>
								  ) : (

									<ConnectWallet accentColor="#f213a4" colorMode="dark" />

								  )}
                                    


                                </div>
                            </div>
                        </div>
                    </div>
				</div>
				<div className="row pt-100">
					<div className="col-md-12 wow fadeInUp">
						<div className="section-heading text-center pb-65">
							<h2 className="heading-title">Token Distribution</h2>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-6 wow fadeInLeft">
						<div className="token-distribut text-center">
							<h2 className="distribution-title">Token Distribution</h2>
							<div className="token-graph w-100">
								<Image src="/images/token-chart.png" width={100} height={70} alt="Token Distribution"/>
							</div>
						</div>
					</div>
					<div className="col-md-6 wow fadeInRight">
						<div className="token-distribut text-center">
							<h2 className="distribution-title">Use of Proceeds</h2>
							<div className="token-graph w-100">
								<Image src="/images/token-chart-2.png" width={100} height={70}  alt="Use of Proceeds"/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<footer className="bg-pattern darkblue ptb-100">
			<div className="container">
				
				<div className="copyright">
					<div className="row">
						<div className="col-12-6">
							<p className='text-center'>Built with Love by <a href="https://www.linkedin.com/in/devtobi/">Olaboye David Tobi</a></p>
						</div>
						
					</div>
				</div>
			</div>
		</footer>
    </div>
    );

}