# Dapp, Custom Node + Next.js: Kickstart

- Links
  - [Ethereum and Solidity: The Complete Developer's Guide (Section 5 - 7), Udemy](https://www.udemy.com/ethereum-and-solidity-the-complete-developers-guide/learn/v4/content)

## 1. Project Overview
  - Create a campaign contract where contributors to a campaign will send money to an ethereum contract. This contract will have some amount of code that regulates who can receive money from the campaign. It will display all the expenses and fundings of the campaign.

  ![](images/1-proj/contract.png)

  - In order for a manager to actually spend money, they have to create a spending request. So in the contract they're going to call a function that creates a spending request. A spending request is going to attempt to withdraw money from the contract and send it to some specific external address, the vendor.

  ![](images/1-proj/spending-request.png)

  - Everyone contributing to the campaign has to vote on every spending request. Each contributor has to call a function to approve the spending request. If enough people approve the request then the funds automatically get sent to the vendor.

  ![](images/1-proj/vote.png)

  - Deployment
    - Each instance of the campaign contract that gets deployed to a network will get back one very unique address. Each of these addresses are completely divorced and separate from each other. So to show the users a list of all the different campaigns, each of the campaign has to be recorded and written down somewhere.

    ![](images/1-proj/problem.png)

    - Solution
      - Create a factory contract that is going to manage all the different instances of campaigns that will
      eventually get deployed to the network. The purpose of this contract is to create and deploy new instances of the campaign.

      ![](images/1-proj/solution1.png)

      - Write a campaign factory contract and deploy it to the network (this will be a one time deployment). The factory contract itself is going to contain all the source code for an individual campaign--a clean version of the campaign source code where no one is able to rewrite or modify the contract in any way. When a user wants to create a new campaign that user is going to send a transaction to the factory and that transaction is going to include some amount of money to pay for the deployment. The factory will take that money and create a new instance of a campaign using the stored campaign source code and then deploy it to the network.

      ![](images/1-proj/solution2.png)

## 2. Contract
  - Campaign contract

  ![](images/2-contract/campaign-contract.png)

    - Approving a request
      - The index of the request has to be provided whenever approveRequest() is called.
      - In this case since we are doing a lookup and not searching for a value in the array of requests, it's a constant time operation just like it is a search on a mapping (hash table). So because we're not iterating through the array of requests, this function will always be constant time lookup with the requests array and don't have to worry about any issues around run time.

      ![](images/2-contract/approve-request.png)

  - Campaign factory contract

  ![](images/2-contract/factory-contract.png)

## 3. Compile
  - Compile the contract one time, write the output to a new file inside the build folder of the project and then access that compiled version. Rather than compiling every time we start the project (approach 1), compile it one time and write the output to a file that can be read in the future.
  - Compile flow
    - There's one single campaign file contract but inside there there are two separate actual contracts. When this one file is fed into the solidity compiler, it'll spit out two separate files. One file is going to contain the compiled campaign and the other is going to contain the compiled campaign factory. Take both these output files and save them both to the build folder in the project directory (the build folder is where all the compiled contracts will be placed).

    ![](images/3-compile/compile-flow1.png)

    - The idea is that we only need to run the compiled script one time and then we should be able to run the app as many times as we wish without having to wait for solidity compiler to run again.
    - If the compiled script were to ever run more than one time in a row that means that we are making some very active changes to the contracts in the contracts folder. So if we are changing the contracts, we will likely want to throw away all the previous stuff that was compiled before. So the first thing we're going to do inside this compile.js file is to delete the entire build folder if it exists.
    - Steps:
      1. Delete the entire build folder if it exists.
      2. Read the contents of the Campaign.sol file in the contracts folder.
      3. Compile both contracts inside the Campaign.sol file with the solidity compiler. The output of that is going to be the compiled campaign and compiled campaign factory.
      4. Take both those outputs and write them both to the build folder as json files. So any time in the future when we need to access the ABI, we can read them from this build folder without having to recompile any of the contracts.

    ![](images/3-compile/compile-flow2.png)

## 4. Deploy
  - Only need to deploy the compiled CampaignFactory

## 5. App
  - Mockups

  ![](images/5-app/mockups/campaigns-list.png)

  ![](images/5-app/mockups/campaign-details.png)

  ![](images/5-app/mockups/campaign-create.png)

  ![](images/5-app/mockups/requests-pending.png)

  ![](images/5-app/mockups/request-create.png)

  ![](images/5-app/mockups/routing.png)

  - Next.js

  ![](images/5-app/nextjs/proj-dir1.png)

  ![](images/5-app/nextjs/proj-dir2.png)

  - Components
    - Common elements to display on every separate page

  ![](images/5-app/nextjs/proj-dir3.png)

  - Steps:

  ![](images/5-app/steps.png)

    - Server vs Client Web3 Instances (/ethereum/web3.js)
      - Unlike CRA, code for next.js gets executed on the next server so the window global variable is not available (window is a global variable that is only available inside the browser and not on node where the server is running).

      ![](images/5-app/CRA.png)

      ![](images/5-app/nextjs.png)

      - When code is rendered on the next server, reach out to the ethereum network and do some initial calls and data fetching so it will not matter whether or not a user has metamask installed.

      ![](images/5-app/nextjs-ethereum.png)

      - Create an instance of web3 that can be executed on either the browser or the server.

      ![](images/5-app/web3-browser-server.png)

    - Contracts
      - Create an instance of the factory(/ethereum/factory.js) and campaign(/ethereum/campaign.js) contract.

    - Redeploy the contract
      - compile
      - deploy
      - factory.js: add the new address to factory.js
