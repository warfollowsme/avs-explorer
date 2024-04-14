import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  BeaconChainETHDeposited,
  BeaconChainETHWithdrawalCompleted,
  BeaconOracleUpdated,
  DenebForkTimestampUpdated,
  Initialized,
  OwnershipTransferred,
  Paused,
  PauserRegistrySet,
  PodDeployed,
  PodSharesUpdated,
  Unpaused
} from "../generated/EigenPodManager/EigenPodManager"

export function createBeaconChainETHDepositedEvent(
  podOwner: Address,
  amount: BigInt
): BeaconChainETHDeposited {
  let beaconChainEthDepositedEvent = changetype<BeaconChainETHDeposited>(
    newMockEvent()
  )

  beaconChainEthDepositedEvent.parameters = new Array()

  beaconChainEthDepositedEvent.parameters.push(
    new ethereum.EventParam("podOwner", ethereum.Value.fromAddress(podOwner))
  )
  beaconChainEthDepositedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return beaconChainEthDepositedEvent
}

export function createBeaconChainETHWithdrawalCompletedEvent(
  podOwner: Address,
  shares: BigInt,
  nonce: BigInt,
  delegatedAddress: Address,
  withdrawer: Address,
  withdrawalRoot: Bytes
): BeaconChainETHWithdrawalCompleted {
  let beaconChainEthWithdrawalCompletedEvent =
    changetype<BeaconChainETHWithdrawalCompleted>(newMockEvent())

  beaconChainEthWithdrawalCompletedEvent.parameters = new Array()

  beaconChainEthWithdrawalCompletedEvent.parameters.push(
    new ethereum.EventParam("podOwner", ethereum.Value.fromAddress(podOwner))
  )
  beaconChainEthWithdrawalCompletedEvent.parameters.push(
    new ethereum.EventParam("shares", ethereum.Value.fromUnsignedBigInt(shares))
  )
  beaconChainEthWithdrawalCompletedEvent.parameters.push(
    new ethereum.EventParam("nonce", ethereum.Value.fromUnsignedBigInt(nonce))
  )
  beaconChainEthWithdrawalCompletedEvent.parameters.push(
    new ethereum.EventParam(
      "delegatedAddress",
      ethereum.Value.fromAddress(delegatedAddress)
    )
  )
  beaconChainEthWithdrawalCompletedEvent.parameters.push(
    new ethereum.EventParam(
      "withdrawer",
      ethereum.Value.fromAddress(withdrawer)
    )
  )
  beaconChainEthWithdrawalCompletedEvent.parameters.push(
    new ethereum.EventParam(
      "withdrawalRoot",
      ethereum.Value.fromFixedBytes(withdrawalRoot)
    )
  )

  return beaconChainEthWithdrawalCompletedEvent
}

export function createBeaconOracleUpdatedEvent(
  newOracleAddress: Address
): BeaconOracleUpdated {
  let beaconOracleUpdatedEvent = changetype<BeaconOracleUpdated>(newMockEvent())

  beaconOracleUpdatedEvent.parameters = new Array()

  beaconOracleUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newOracleAddress",
      ethereum.Value.fromAddress(newOracleAddress)
    )
  )

  return beaconOracleUpdatedEvent
}

export function createDenebForkTimestampUpdatedEvent(
  newValue: BigInt
): DenebForkTimestampUpdated {
  let denebForkTimestampUpdatedEvent = changetype<DenebForkTimestampUpdated>(
    newMockEvent()
  )

  denebForkTimestampUpdatedEvent.parameters = new Array()

  denebForkTimestampUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newValue",
      ethereum.Value.fromUnsignedBigInt(newValue)
    )
  )

  return denebForkTimestampUpdatedEvent
}

export function createInitializedEvent(version: i32): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  )

  return initializedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPausedEvent(
  account: Address,
  newPausedStatus: BigInt
): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  pausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  pausedEvent.parameters.push(
    new ethereum.EventParam(
      "newPausedStatus",
      ethereum.Value.fromUnsignedBigInt(newPausedStatus)
    )
  )

  return pausedEvent
}

export function createPauserRegistrySetEvent(
  pauserRegistry: Address,
  newPauserRegistry: Address
): PauserRegistrySet {
  let pauserRegistrySetEvent = changetype<PauserRegistrySet>(newMockEvent())

  pauserRegistrySetEvent.parameters = new Array()

  pauserRegistrySetEvent.parameters.push(
    new ethereum.EventParam(
      "pauserRegistry",
      ethereum.Value.fromAddress(pauserRegistry)
    )
  )
  pauserRegistrySetEvent.parameters.push(
    new ethereum.EventParam(
      "newPauserRegistry",
      ethereum.Value.fromAddress(newPauserRegistry)
    )
  )

  return pauserRegistrySetEvent
}

export function createPodDeployedEvent(
  eigenPod: Address,
  podOwner: Address
): PodDeployed {
  let podDeployedEvent = changetype<PodDeployed>(newMockEvent())

  podDeployedEvent.parameters = new Array()

  podDeployedEvent.parameters.push(
    new ethereum.EventParam("eigenPod", ethereum.Value.fromAddress(eigenPod))
  )
  podDeployedEvent.parameters.push(
    new ethereum.EventParam("podOwner", ethereum.Value.fromAddress(podOwner))
  )

  return podDeployedEvent
}

export function createPodSharesUpdatedEvent(
  podOwner: Address,
  sharesDelta: BigInt
): PodSharesUpdated {
  let podSharesUpdatedEvent = changetype<PodSharesUpdated>(newMockEvent())

  podSharesUpdatedEvent.parameters = new Array()

  podSharesUpdatedEvent.parameters.push(
    new ethereum.EventParam("podOwner", ethereum.Value.fromAddress(podOwner))
  )
  podSharesUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "sharesDelta",
      ethereum.Value.fromSignedBigInt(sharesDelta)
    )
  )

  return podSharesUpdatedEvent
}

export function createUnpausedEvent(
  account: Address,
  newPausedStatus: BigInt
): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  unpausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  unpausedEvent.parameters.push(
    new ethereum.EventParam(
      "newPausedStatus",
      ethereum.Value.fromUnsignedBigInt(newPausedStatus)
    )
  )

  return unpausedEvent
}
