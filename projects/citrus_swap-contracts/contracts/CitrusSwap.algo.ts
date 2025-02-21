import { Contract } from '@algorandfoundation/tealscript';

export class CitrusSwap extends Contract {
  programVersion = 10;

  // Global State Variables

  asset1Id = GlobalStateKey<uint64>();

  asset2Id = GlobalStateKey<uint64>();

  lpAssetId = GlobalStateKey<uint64>();

  asset1Reserve = GlobalStateKey<uint64>();

  asset2Reserve = GlobalStateKey<uint64>();

  totalAsset1 = GlobalStateKey<uint64>();

  totalAsset2 = GlobalStateKey<uint64>();

  adminAddress = GlobalStateKey<Address>();

  treasuryAddress = GlobalStateKey<Address>();

  creatApplication(adminAddress: Address, treasuryAddress: Address, asset1Id: uint64, asset2Id: uint64): void {
    this.adminAddress.value = adminAddress;
    this.treasuryAddress.value = treasuryAddress;
    this.asset1Id.value = asset1Id;
    this.asset2Id.value = asset2Id;
    this.asset1Reserve.value = 0;
    this.asset2Reserve.value = 0;
    this.totalAsset1.value = 0;
    this.totalAsset2.value = 0;
  }

  initApplication(payTxn: PayTxn): void {
    verifyPayTxn(payTxn, { receiver: this.app.address, amount: 300_000 });
    sendAssetTransfer({
      xferAsset: AssetID.fromUint64(this.asset1Id.value),
      assetReceiver: this.app.address,
      assetAmount: 0,
    });
    sendAssetTransfer({
      xferAsset: AssetID.fromUint64(this.asset2Id.value),
      assetReceiver: this.app.address,
      assetAmount: 0,
    });
  }

  gas(): void {}
}
