import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import {
  Initialized,
  MinWithdrawalDelayBlocksSet,
  OperatorDetailsModified,
  OperatorMetadataURIUpdated,
  OperatorRegistered,
  OperatorSharesDecreased,
  OperatorSharesIncreased,
  OwnershipTransferred,
  Paused,
  PauserRegistrySet,
  StakerDelegated,
  StakerForceUndelegated,
  StakerUndelegated,
  StrategyWithdrawalDelayBlocksSet,
  Unpaused,
  WithdrawalCompleted,
  WithdrawalMigrated,
  WithdrawalQueued
} from "../generated/DelegationManager/DelegationManager"

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

export function createMinWithdrawalDelayBlocksSetEvent(
  previousValue: BigInt,
  newValue: BigInt
): MinWithdrawalDelayBlocksSet {
  let minWithdrawalDelayBlocksSetEvent =
    changetype<MinWithdrawalDelayBlocksSet>(newMockEvent())

  minWithdrawalDelayBlocksSetEvent.parameters = new Array()

  minWithdrawalDelayBlocksSetEvent.parameters.push(
    new ethereum.EventParam(
      "previousValue",
      ethereum.Value.fromUnsignedBigInt(previousValue)
    )
  )
  minWithdrawalDelayBlocksSetEvent.parameters.push(
    new ethereum.EventParam(
      "newValue",
      ethereum.Value.fromUnsignedBigInt(newValue)
    )
  )

  return minWithdrawalDelayBlocksSetEvent
}

export function createOperatorDetailsModifiedEvent(
  operator: Address,
  newOperatorDetails: ethereum.Tuple
): OperatorDetailsModified {
  let operatorDetailsModifiedEvent = changetype<OperatorDetailsModified>(
    newMockEvent()
  )

  operatorDetailsModifiedEvent.parameters = new Array()

  operatorDetailsModifiedEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  operatorDetailsModifiedEvent.parameters.push(
    new ethereum.EventParam(
      "newOperatorDetails",
      ethereum.Value.fromTuple(newOperatorDetails)
    )
  )

  return operatorDetailsModifiedEvent
}

export function createOperatorMetadataURIUpdatedEvent(
  operator: Address,
  metadataURI: string
): OperatorMetadataURIUpdated {
  let operatorMetadataUriUpdatedEvent = changetype<OperatorMetadataURIUpdated>(
    newMockEvent()
  )

  operatorMetadataUriUpdatedEvent.parameters = new Array()

  operatorMetadataUriUpdatedEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  operatorMetadataUriUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "metadataURI",
      ethereum.Value.fromString(metadataURI)
    )
  )

  return operatorMetadataUriUpdatedEvent
}

export function createOperatorRegisteredEvent(
  operator: Address,
  operatorDetails: ethereum.Tuple
): OperatorRegistered {
  let operatorRegisteredEvent = changetype<OperatorRegistered>(newMockEvent())

  operatorRegisteredEvent.parameters = new Array()

  operatorRegisteredEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  operatorRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "operatorDetails",
      ethereum.Value.fromTuple(operatorDetails)
    )
  )

  return operatorRegisteredEvent
}

export function createOperatorSharesDecreasedEvent(
  operator: Address,
  staker: Address,
  strategy: Address,
  shares: BigInt
): OperatorSharesDecreased {
  let operatorSharesDecreasedEvent = changetype<OperatorSharesDecreased>(
    newMockEvent()
  )

  operatorSharesDecreasedEvent.parameters = new Array()

  operatorSharesDecreasedEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  operatorSharesDecreasedEvent.parameters.push(
    new ethereum.EventParam("staker", ethereum.Value.fromAddress(staker))
  )
  operatorSharesDecreasedEvent.parameters.push(
    new ethereum.EventParam("strategy", ethereum.Value.fromAddress(strategy))
  )
  operatorSharesDecreasedEvent.parameters.push(
    new ethereum.EventParam("shares", ethereum.Value.fromUnsignedBigInt(shares))
  )

  return operatorSharesDecreasedEvent
}

export function createOperatorSharesIncreasedEvent(
  operator: Address,
  staker: Address,
  strategy: Address,
  shares: BigInt
): OperatorSharesIncreased {
  let operatorSharesIncreasedEvent = changetype<OperatorSharesIncreased>(
    newMockEvent()
  )

  operatorSharesIncreasedEvent.parameters = new Array()

  operatorSharesIncreasedEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  operatorSharesIncreasedEvent.parameters.push(
    new ethereum.EventParam("staker", ethereum.Value.fromAddress(staker))
  )
  operatorSharesIncreasedEvent.parameters.push(
    new ethereum.EventParam("strategy", ethereum.Value.fromAddress(strategy))
  )
  operatorSharesIncreasedEvent.parameters.push(
    new ethereum.EventParam("shares", ethereum.Value.fromUnsignedBigInt(shares))
  )

  return operatorSharesIncreasedEvent
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

export function createStakerDelegatedEvent(
  staker: Address,
  operator: Address
): StakerDelegated {
  let stakerDelegatedEvent = changetype<StakerDelegated>(newMockEvent())

  stakerDelegatedEvent.parameters = new Array()

  stakerDelegatedEvent.parameters.push(
    new ethereum.EventParam("staker", ethereum.Value.fromAddress(staker))
  )
  stakerDelegatedEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )

  return stakerDelegatedEvent
}

export function createStakerForceUndelegatedEvent(
  staker: Address,
  operator: Address
): StakerForceUndelegated {
  let stakerForceUndelegatedEvent = changetype<StakerForceUndelegated>(
    newMockEvent()
  )

  stakerForceUndelegatedEvent.parameters = new Array()

  stakerForceUndelegatedEvent.parameters.push(
    new ethereum.EventParam("staker", ethereum.Value.fromAddress(staker))
  )
  stakerForceUndelegatedEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )

  return stakerForceUndelegatedEvent
}

export function createStakerUndelegatedEvent(
  staker: Address,
  operator: Address
): StakerUndelegated {
  let stakerUndelegatedEvent = changetype<StakerUndelegated>(newMockEvent())

  stakerUndelegatedEvent.parameters = new Array()

  stakerUndelegatedEvent.parameters.push(
    new ethereum.EventParam("staker", ethereum.Value.fromAddress(staker))
  )
  stakerUndelegatedEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )

  return stakerUndelegatedEvent
}

export function createStrategyWithdrawalDelayBlocksSetEvent(
  strategy: Address,
  previousValue: BigInt,
  newValue: BigInt
): StrategyWithdrawalDelayBlocksSet {
  let strategyWithdrawalDelayBlocksSetEvent =
    changetype<StrategyWithdrawalDelayBlocksSet>(newMockEvent())

  strategyWithdrawalDelayBlocksSetEvent.parameters = new Array()

  strategyWithdrawalDelayBlocksSetEvent.parameters.push(
    new ethereum.EventParam("strategy", ethereum.Value.fromAddress(strategy))
  )
  strategyWithdrawalDelayBlocksSetEvent.parameters.push(
    new ethereum.EventParam(
      "previousValue",
      ethereum.Value.fromUnsignedBigInt(previousValue)
    )
  )
  strategyWithdrawalDelayBlocksSetEvent.parameters.push(
    new ethereum.EventParam(
      "newValue",
      ethereum.Value.fromUnsignedBigInt(newValue)
    )
  )

  return strategyWithdrawalDelayBlocksSetEvent
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

export function createWithdrawalCompletedEvent(
  withdrawalRoot: Bytes
): WithdrawalCompleted {
  let withdrawalCompletedEvent = changetype<WithdrawalCompleted>(newMockEvent())

  withdrawalCompletedEvent.parameters = new Array()

  withdrawalCompletedEvent.parameters.push(
    new ethereum.EventParam(
      "withdrawalRoot",
      ethereum.Value.fromFixedBytes(withdrawalRoot)
    )
  )

  return withdrawalCompletedEvent
}

export function createWithdrawalMigratedEvent(
  oldWithdrawalRoot: Bytes,
  newWithdrawalRoot: Bytes
): WithdrawalMigrated {
  let withdrawalMigratedEvent = changetype<WithdrawalMigrated>(newMockEvent())

  withdrawalMigratedEvent.parameters = new Array()

  withdrawalMigratedEvent.parameters.push(
    new ethereum.EventParam(
      "oldWithdrawalRoot",
      ethereum.Value.fromFixedBytes(oldWithdrawalRoot)
    )
  )
  withdrawalMigratedEvent.parameters.push(
    new ethereum.EventParam(
      "newWithdrawalRoot",
      ethereum.Value.fromFixedBytes(newWithdrawalRoot)
    )
  )

  return withdrawalMigratedEvent
}

export function createWithdrawalQueuedEvent(
  withdrawalRoot: Bytes,
  withdrawal: ethereum.Tuple
): WithdrawalQueued {
  let withdrawalQueuedEvent = changetype<WithdrawalQueued>(newMockEvent())

  withdrawalQueuedEvent.parameters = new Array()

  withdrawalQueuedEvent.parameters.push(
    new ethereum.EventParam(
      "withdrawalRoot",
      ethereum.Value.fromFixedBytes(withdrawalRoot)
    )
  )
  withdrawalQueuedEvent.parameters.push(
    new ethereum.EventParam("withdrawal", ethereum.Value.fromTuple(withdrawal))
  )

  return withdrawalQueuedEvent
}
