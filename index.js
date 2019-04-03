import { find, isUndefined } from 'lodash';
import { hexToBytes } from 'web3-utils';
import Registry from './Registry.json';

const addresses = {
  74: '0xa94eCb69c9303a5CF27D694602eCE285dBf72672',
  39: '0xB19fad8a6AcC6B42b69299Fd82C5C4f7C5332c4B',
};

class VNS {
  constructor(connex) {
    if (isUndefined(connex)) {
      throw new Error('connex is not supplied');
    }

    this.connex = connex;
    this.abi = Registry.abi;
    this.networkId = null;
    this.networkId = this.getNetworkId();
  }

  async getNetworkId() {
    const block = await this.connex.thor.block(0).get();
    return hexToBytes(block.id).pop();
  }

  async lookup(domain) {
    const networkId = await this.networkId;
    const address = addresses[networkId];
    const abi = find(this.abi, { name: 'resolveDomain' });
    const resolveDomain = this.connex.thor.account(address).method(abi);
    const { decoded: { 0: resolver } } = await resolveDomain.call(domain);

    return resolver;
  }
}

export default VNS;
