import {
  AVSMetadataURIUpdated as AVSMetadataURIUpdatedEvent,
  Initialized as InitializedEvent,
  OperatorAVSRegistrationStatusUpdated as OperatorAVSRegistrationStatusUpdatedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Paused as PausedEvent,
  PauserRegistrySet as PauserRegistrySetEvent,
  Unpaused as UnpausedEvent,
} from "../generated/AVSDirectory/AVSDirectory"
import {
  AVSMetadataURIUpdated,
  Initialized,
  OperatorAVSRegistrationStatusUpdated,
  OwnershipTransferred,
  Paused,
  PauserRegistrySet,
  Unpaused,
  OperatorAction,
  AVSOperatorStatus,
  AVSAction
} from "../generated/schema"
import { createOrLoadAVS, createOrLoadOperator } from "./utils/helper"

export function handleAVSMetadataURIUpdated(
  event: AVSMetadataURIUpdatedEvent,
): void {
  let entity = new AVSMetadataURIUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.avs = event.params.avs
  entity.metadataURI = event.params.metadataURI

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let avsEntity = createOrLoadAVS(event.params.avs, event.transaction.hash, event.block.timestamp)
  avsEntity.metadataURI = event.params.metadataURI
  avsEntity.actionsCount = avsEntity.actionsCount + 1
  avsEntity.save()

  let action = new AVSAction(event.transaction.hash.concatI32(event.logIndex.toI32()))
  action.avs = event.params.avs
  action.type = "MetadataURIUpdated"
  action.blockNumber = event.block.number
  action.blockTimestamp = event.block.timestamp
  action.transactionHash = event.transaction.hash
  action.metadataURI = event.params.metadataURI
  action.save()
}

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.version = event.params.version

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOperatorAVSRegistrationStatusUpdated(
  event: OperatorAVSRegistrationStatusUpdatedEvent,
): void {
  let entity = new OperatorAVSRegistrationStatusUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )

  entity.operator = event.params.operator
  entity.avs = event.params.avs
  entity.status = event.params.status

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  const operatorId = event.params.operator
  const avsId = event.params.avs

  let operator = createOrLoadOperator(operatorId, event.transaction.hash, event.block.timestamp)
  operator.statusesCount = operator.statusesCount + 1

  let avsEntity = createOrLoadAVS(avsId, event.transaction.hash, event.block.timestamp)
  avsEntity.actionsCount = avsEntity.actionsCount + 1

  let avsStatus = AVSOperatorStatus.load(avsId.concat(operatorId))
  if (avsStatus == null) {
    avsStatus = new AVSOperatorStatus(avsId.concat(operatorId))
    avsStatus.avs = avsId
    avsStatus.operator = operatorId   
    avsStatus.registeredTransactionHash = event.transaction.hash
    avsStatus.registeredTimestamp = event.block.timestamp
    
    operator.actionsCount = operator.actionsCount + 1
    avsEntity.registrationsCount = avsEntity.registrationsCount + 1
  }
  avsStatus.lastUpdatedTransactionHash = event.transaction.hash
  avsStatus.lastUpdatedTimestamp = event.block.timestamp
  avsStatus.status = event.params.status
  avsStatus.save()
  operator.save()
  avsEntity.save()

  let action = new OperatorAction(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  action.operator = operatorId
  action.type = "AVSRegistrationStatusUpdated"
  action.blockNumber = event.block.number
  action.blockTimestamp = event.block.timestamp
  action.transactionHash = event.transaction.hash
  action.avs = avsId
  action.status = event.params.status
  action.save()


  let avsAction = new AVSAction(event.transaction.hash.concatI32(event.logIndex.toI32()))
  avsAction.avs = avsId
  if (event.params.status == 1)
    avsAction.type = "OperatorAdded"
  else if (event.params.status == 0)
    avsAction.type = "OperatorRemoved"
  avsAction.blockNumber = event.block.number
  avsAction.blockTimestamp = event.block.timestamp
  avsAction.transactionHash = event.transaction.hash
  avsAction.operator = operatorId
  avsAction.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent,
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePaused(event: PausedEvent): void {
  let entity = new Paused(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.account = event.params.account
  entity.newPausedStatus = event.params.newPausedStatus

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePauserRegistrySet(event: PauserRegistrySetEvent): void {
  let entity = new PauserRegistrySet(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.pauserRegistry = event.params.pauserRegistry
  entity.newPauserRegistry = event.params.newPauserRegistry

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new Unpaused(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.account = event.params.account
  entity.newPausedStatus = event.params.newPausedStatus

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
