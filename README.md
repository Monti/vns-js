# VNS-Js

A conveniant way to integrate the VeChain Name Service into your dApp. :)

## Installation

Install from npm:

`npm install --save vns-js`

## Usage

```javascript
import VNS from 'vns-js';

// Passing connex is required
const vns = new VNS(window.connex);

vns.lookup('raleighca')
.then(address => {
  const expected = '0x4f8f68a0d1cbc75f6ef764a44619277092c32df0';

  if (address === expected) {
    alert('Woohoo! It works!');
  }
})
.catch((error) => {
  // There was an error!
  // Maybe the name wasn't registered
  // Or there is a current auction.
  console.log(error);
});

```

## Available APIs

### vns.lookup( domain )

Takes a valid [VNS](#) name, like `raleighca.vet`, or `vexchange.vet`.

Returns a Promise that resolves to a hex-prefixed hexadecimal string for the resolved address.


