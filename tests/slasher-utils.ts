import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  FrozenStatusReset,
  Initialized,
  MiddlewareTimesAdded,
  OperatorFrozen,
  OptedIntoSlashing,
  OwnershipTransferred,
  Paused,
  PauserRegistrySet,
  SlashingAbilityRevoked,
  Unpaused
} from "../generated/Slasher/Slasher"

export function createFrozenStatusResetEvent(
  previouslySlashedAddress: Address
): FrozenStatusReset {
  let frozenStatusResetEvent = changetype<FrozenStatusReset>(newMockEvent())

  frozenStatusResetEvent.parameters = new Array()

  frozenStatusResetEvent.parameters.push(
    new ethereum.EventParam(
      "previouslySlashedAddress",
      ethereum.Value.fromAddress(previouslySlashedAddress)
    )
  )

  return frozenStatusResetEvent
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

export function createMiddlewareTimesAddedEvent(
  operator: Address,
  index: BigInt,
  stalestUpdateBlock: BigInt,
  latestServeUntilBlock: BigInt
): MiddlewareTimesAdded {
  let middlewareTimesAddedEvent = changetype<MiddlewareTimesAdded>(
    newMockEvent()
  )

  middlewareTimesAddedEvent.parameters = new Array()

  middlewareTimesAddedEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  middlewareTimesAddedEvent.parameters.push(
    new ethereum.EventParam("index", ethereum.Value.fromUnsignedBigInt(index))
  )
  middlewareTimesAddedEvent.parameters.push(
    new ethereum.EventParam(
      "stalestUpdateBlock",
      ethereum.Value.fromUnsignedBigInt(stalestUpdateBlock)
    )
  )
  middlewareTimesAddedEvent.parameters.push(
    new ethereum.EventParam(
      "latestServeUntilBlock",
      ethereum.Value.fromUnsignedBigInt(latestServeUntilBlock)
    )
  )

  return middlewareTimesAddedEvent
}

export function createOperatorFrozenEvent(
  slashedOperator: Address,
  slashingContract: Address
): OperatorFrozen {
  let operatorFrozenEvent = changetype<OperatorFrozen>(newMockEvent())

  operatorFrozenEvent.parameters = new Array()

  operatorFrozenEvent.parameters.push(
    new ethereum.EventParam(
      "slashedOperator",
      ethereum.Value.fromAddress(slashedOperator)
    )
  )
  operatorFrozenEvent.parameters.push(
    new ethereum.EventParam(
      "slashingContract",
      ethereum.Value.fromAddress(slashingContract)
    )
  )

  return operatorFrozenEvent
}

export function createOptedIntoSlashingEvent(
  operator: Address,
  contractAddress: Address
): OptedIntoSlashing {
  let optedIntoSlashingEvent = changetype<OptedIntoSlashing>(newMockEvent())

  optedIntoSlashingEvent.parameters = new Array()

  optedIntoSlashingEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  optedIntoSlashingEvent.parameters.push(
    new ethereum.EventParam(
      "contractAddress",
      ethereum.Value.fromAddress(contractAddress)
    )
  )

  return optedIntoSlashingEvent
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

export function createSlashingAbilityRevokedEvent(
  operator: Address,
  contractAddress: Address,
  contractCanSlashOperatorUntilBlock: BigInt
): SlashingAbilityRevoked {
  let slashingAbilityRevokedEvent = changetype<SlashingAbilityRevoked>(
    newMockEvent()
  )

  slashingAbilityRevokedEvent.parameters = new Array()

  slashingAbilityRevokedEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  slashingAbilityRevokedEvent.parameters.push(
    new ethereum.EventParam(
      "contractAddress",
      ethereum.Value.fromAddress(contractAddress)
    )
  )
  slashingAbilityRevokedEvent.parameters.push(
    new ethereum.EventParam(
      "contractCanSlashOperatorUntilBlock",
      ethereum.Value.fromUnsignedBigInt(contractCanSlashOperatorUntilBlock)
    )
  )

  return slashingAbilityRevokedEvent
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
