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
  AVS,
  Operator,
  AVSOperatorStatus
} from "../generated/schema"

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

  const avsId = event.params.avs.toHexString()
  let avsEntity = AVS.load(avsId)
  if (avsEntity == null) {
    avsEntity = new AVS(avsId)
  }
  avsEntity.metadataURI = event.params.metadataURI
  avsEntity.save()
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

  const operatorId = event.params.operator.toHexString()
  const avsId = event.params.avs.toHexString()
  let operator = Operator.load(operatorId)
  if(operator == null){
    operator = new Operator(operatorId)
  }
  let avsStatus = AVSOperatorStatus.load(`${avsId}-${operatorId}`)
  if(avsStatus == null){
    avsStatus = new AVSOperatorStatus(`${avsId}-${operatorId}`)
    avsStatus.avs = avsId
    avsStatus.operator = operatorId
  }
  avsStatus.status = event.params.status
  avsStatus.save()
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
