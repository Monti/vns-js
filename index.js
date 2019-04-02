import { find, isUndefined } from 'lodash';
import Registry from './Registry.json';

const address = '0xa94eCb69c9303a5CF27D694602eCE285dBf72672';

class VNS {
  constructor(connex) {
    if (isUndefined(connex)) {
      throw new Error('connex is not supplied');
    }

    this.connex = connex;
    this.abi = Registry.abi;
  }

  async resolveDomain(domain) {
    const abi = find(this.abi, { name: 'resolveDomain' });
    const resolveDomain = this.connex.thor.account(address).method(abi);
    const { decoded: { 0: resolver } } = await resolveDomain.call(domain);

    return resolver;
  }
}

export default VNS;
