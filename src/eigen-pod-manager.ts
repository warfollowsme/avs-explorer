import {
  BeaconChainETHDeposited as BeaconChainETHDepositedEvent,
  BeaconChainETHWithdrawalCompleted as BeaconChainETHWithdrawalCompletedEvent,
  BeaconOracleUpdated as BeaconOracleUpdatedEvent,
  DenebForkTimestampUpdated as DenebForkTimestampUpdatedEvent,
  Initialized as InitializedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Paused as PausedEvent,
  PauserRegistrySet as PauserRegistrySetEvent,
  PodDeployed as PodDeployedEvent,
  PodSharesUpdated as PodSharesUpdatedEvent,
  Unpaused as UnpausedEvent,
} from "../generated/EigenPodManager/EigenPodManager"
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
  Unpaused,
} from "../generated/schema"

export function handleBeaconChainETHDeposited(
  event: BeaconChainETHDepositedEvent,
): void {
  let entity = new BeaconChainETHDeposited(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.podOwner = event.params.podOwner
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBeaconChainETHWithdrawalCompleted(
  event: BeaconChainETHWithdrawalCompletedEvent,
): void {
  let entity = new BeaconChainETHWithdrawalCompleted(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.podOwner = event.params.podOwner
  entity.shares = event.params.shares
  entity.nonce = event.params.nonce
  entity.delegatedAddress = event.params.delegatedAddress
  entity.withdrawer = event.params.withdrawer
  entity.withdrawalRoot = event.params.withdrawalRoot

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBeaconOracleUpdated(
  event: BeaconOracleUpdatedEvent,
): void {
  let entity = new BeaconOracleUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.newOracleAddress = event.params.newOracleAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDenebForkTimestampUpdated(
  event: DenebForkTimestampUpdatedEvent,
): void {
  let entity = new DenebForkTimestampUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.newValue = event.params.newValue

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
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

export function handlePodDeployed(event: PodDeployedEvent): void {
  let entity = new PodDeployed(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.eigenPod = event.params.eigenPod
  entity.podOwner = event.params.podOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePodSharesUpdated(event: PodSharesUpdatedEvent): void {
  let entity = new PodSharesUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.podOwner = event.params.podOwner
  entity.sharesDelta = event.params.sharesDelta

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
