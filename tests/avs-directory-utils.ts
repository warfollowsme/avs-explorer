import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AVSMetadataURIUpdated,
  Initialized,
  OperatorAVSRegistrationStatusUpdated,
  OwnershipTransferred,
  Paused,
  PauserRegistrySet,
  Unpaused
} from "../generated/AVSDirectory/AVSDirectory"

export function createAVSMetadataURIUpdatedEvent(
  avs: Address,
  metadataURI: string
): AVSMetadataURIUpdated {
  let avsMetadataUriUpdatedEvent = changetype<AVSMetadataURIUpdated>(
    newMockEvent()
  )

  avsMetadataUriUpdatedEvent.parameters = new Array()

  avsMetadataUriUpdatedEvent.parameters.push(
    new ethereum.EventParam("avs", ethereum.Value.fromAddress(avs))
  )
  avsMetadataUriUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "metadataURI",
      ethereum.Value.fromString(metadataURI)
    )
  )

  return avsMetadataUriUpdatedEvent
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

export function createOperatorAVSRegistrationStatusUpdatedEvent(
  operator: Address,
  avs: Address,
  status: i32
): OperatorAVSRegistrationStatusUpdated {
  let operatorAvsRegistrationStatusUpdatedEvent =
    changetype<OperatorAVSRegistrationStatusUpdated>(newMockEvent())

  operatorAvsRegistrationStatusUpdatedEvent.parameters = new Array()

  operatorAvsRegistrationStatusUpdatedEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  operatorAvsRegistrationStatusUpdatedEvent.parameters.push(
    new ethereum.EventParam("avs", ethereum.Value.fromAddress(avs))
  )
  operatorAvsRegistrationStatusUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "status",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(status))
    )
  )

  return operatorAvsRegistrationStatusUpdatedEvent
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
