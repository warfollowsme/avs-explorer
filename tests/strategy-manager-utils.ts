import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Deposit,
  Initialized,
  OwnershipTransferred,
  Paused,
  PauserRegistrySet,
  StrategyAddedToDepositWhitelist,
  StrategyRemovedFromDepositWhitelist,
  StrategyWhitelisterChanged,
  Unpaused,
  UpdatedThirdPartyTransfersForbidden
} from "../generated/StrategyManager/StrategyManager"

export function createDepositEvent(
  staker: Address,
  token: Address,
  strategy: Address,
  shares: BigInt
): Deposit {
  let depositEvent = changetype<Deposit>(newMockEvent())

  depositEvent.parameters = new Array()

  depositEvent.parameters.push(
    new ethereum.EventParam("staker", ethereum.Value.fromAddress(staker))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam("strategy", ethereum.Value.fromAddress(strategy))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam("shares", ethereum.Value.fromUnsignedBigInt(shares))
  )

  return depositEvent
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

export function createStrategyAddedToDepositWhitelistEvent(
  strategy: Address
): StrategyAddedToDepositWhitelist {
  let strategyAddedToDepositWhitelistEvent =
    changetype<StrategyAddedToDepositWhitelist>(newMockEvent())

  strategyAddedToDepositWhitelistEvent.parameters = new Array()

  strategyAddedToDepositWhitelistEvent.parameters.push(
    new ethereum.EventParam("strategy", ethereum.Value.fromAddress(strategy))
  )

  return strategyAddedToDepositWhitelistEvent
}

export function createStrategyRemovedFromDepositWhitelistEvent(
  strategy: Address
): StrategyRemovedFromDepositWhitelist {
  let strategyRemovedFromDepositWhitelistEvent =
    changetype<StrategyRemovedFromDepositWhitelist>(newMockEvent())

  strategyRemovedFromDepositWhitelistEvent.parameters = new Array()

  strategyRemovedFromDepositWhitelistEvent.parameters.push(
    new ethereum.EventParam("strategy", ethereum.Value.fromAddress(strategy))
  )

  return strategyRemovedFromDepositWhitelistEvent
}

export function createStrategyWhitelisterChangedEvent(
  previousAddress: Address,
  newAddress: Address
): StrategyWhitelisterChanged {
  let strategyWhitelisterChangedEvent = changetype<StrategyWhitelisterChanged>(
    newMockEvent()
  )

  strategyWhitelisterChangedEvent.parameters = new Array()

  strategyWhitelisterChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAddress",
      ethereum.Value.fromAddress(previousAddress)
    )
  )
  strategyWhitelisterChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAddress",
      ethereum.Value.fromAddress(newAddress)
    )
  )

  return strategyWhitelisterChangedEvent
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

export function createUpdatedThirdPartyTransfersForbiddenEvent(
  strategy: Address,
  value: boolean
): UpdatedThirdPartyTransfersForbidden {
  let updatedThirdPartyTransfersForbiddenEvent =
    changetype<UpdatedThirdPartyTransfersForbidden>(newMockEvent())

  updatedThirdPartyTransfersForbiddenEvent.parameters = new Array()

  updatedThirdPartyTransfersForbiddenEvent.parameters.push(
    new ethereum.EventParam("strategy", ethereum.Value.fromAddress(strategy))
  )
  updatedThirdPartyTransfersForbiddenEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromBoolean(value))
  )

  return updatedThirdPartyTransfersForbiddenEvent
}
