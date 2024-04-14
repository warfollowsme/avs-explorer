import {
  FrozenStatusReset as FrozenStatusResetEvent,
  Initialized as InitializedEvent,
  MiddlewareTimesAdded as MiddlewareTimesAddedEvent,
  OperatorFrozen as OperatorFrozenEvent,
  OptedIntoSlashing as OptedIntoSlashingEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Paused as PausedEvent,
  PauserRegistrySet as PauserRegistrySetEvent,
  SlashingAbilityRevoked as SlashingAbilityRevokedEvent,
  Unpaused as UnpausedEvent,
} from "../generated/Slasher/Slasher"
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
  Unpaused,
} from "../generated/schema"

export function handleFrozenStatusReset(event: FrozenStatusResetEvent): void {
  let entity = new FrozenStatusReset(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.previouslySlashedAddress = event.params.previouslySlashedAddress

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

export function handleMiddlewareTimesAdded(
  event: MiddlewareTimesAddedEvent,
): void {
  let entity = new MiddlewareTimesAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.operator = event.params.operator
  entity.index = event.params.index
  entity.stalestUpdateBlock = event.params.stalestUpdateBlock
  entity.latestServeUntilBlock = event.params.latestServeUntilBlock

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOperatorFrozen(event: OperatorFrozenEvent): void {
  let entity = new OperatorFrozen(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.slashedOperator = event.params.slashedOperator
  entity.slashingContract = event.params.slashingContract

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOptedIntoSlashing(event: OptedIntoSlashingEvent): void {
  let entity = new OptedIntoSlashing(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.operator = event.params.operator
  entity.contractAddress = event.params.contractAddress

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

export function handleSlashingAbilityRevoked(
  event: SlashingAbilityRevokedEvent,
): void {
  let entity = new SlashingAbilityRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.operator = event.params.operator
  entity.contractAddress = event.params.contractAddress
  entity.contractCanSlashOperatorUntilBlock =
    event.params.contractCanSlashOperatorUntilBlock

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
