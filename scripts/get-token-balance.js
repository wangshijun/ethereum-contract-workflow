const Web3 = require('web3');
const ABI = require('human-standard-token-abi');  // 因为所有的 ERC20 token 遵循相同的接口规范，这里ABI可以使用相同的

const contractAddress = '0xa974c709cfb4566686553a20790685a47aceaa33'; // MIXIN 合约地址，在 Etherscan 上搜索能找到
const accountAddress = '0x464fc4a06af689186154a4c0d4b062474f040a8a'; // 用户钱包
const infuraUrl = 'https://mainnet.infura.io/145318c65eb443c2bf7c0ec83591e49d'; // 注意这里的环境

const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));

(async () => {
  try {
    const token = await new web3.eth.Contract(ABI, contractAddress);

    const [name, symbol, totalSupply, balanceOf] = await Promise.all([
      token.methods.name().call(),
      token.methods.symbol().call(),
      token.methods.totalSupply().call(),
      token.methods.balanceOf(accountAddress).call(),
    ]);

    console.log({
      name,
      symbol,
      totalSupply: `${web3.utils.fromWei(totalSupply.toString())} ${symbol}`,
      balanceOf: `${web3.utils.fromWei(balanceOf.toString())} ${symbol}`,
    });
  } catch (err) {
    console.error(err);
  }
})();
