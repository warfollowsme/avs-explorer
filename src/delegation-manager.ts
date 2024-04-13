import {
  Initialized as InitializedEvent,
  MinWithdrawalDelayBlocksSet as MinWithdrawalDelayBlocksSetEvent,
  OperatorDetailsModified as OperatorDetailsModifiedEvent,
  OperatorMetadataURIUpdated as OperatorMetadataURIUpdatedEvent,
  OperatorRegistered as OperatorRegisteredEvent,
  OperatorSharesDecreased as OperatorSharesDecreasedEvent,
  OperatorSharesIncreased as OperatorSharesIncreasedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Paused as PausedEvent,
  PauserRegistrySet as PauserRegistrySetEvent,
  StakerDelegated as StakerDelegatedEvent,
  StakerForceUndelegated as StakerForceUndelegatedEvent,
  StakerUndelegated as StakerUndelegatedEvent,
  StrategyWithdrawalDelayBlocksSet as StrategyWithdrawalDelayBlocksSetEvent,
  Unpaused as UnpausedEvent,
  WithdrawalCompleted as WithdrawalCompletedEvent,
  WithdrawalMigrated as WithdrawalMigratedEvent,
  WithdrawalQueued as WithdrawalQueuedEvent
} from "../generated/DelegationManager/DelegationManager"
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
} from "../generated/schema"

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.version = event.params.version

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMinWithdrawalDelayBlocksSet(
  event: MinWithdrawalDelayBlocksSetEvent
): void {
  let entity = new MinWithdrawalDelayBlocksSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousValue = event.params.previousValue
  entity.newValue = event.params.newValue

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOperatorDetailsModified(
  event: OperatorDetailsModifiedEvent
): void {
  let entity = new OperatorDetailsModified(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.operator = event.params.operator
  entity.newOperatorDetails_earningsReceiver =
    event.params.newOperatorDetails.earningsReceiver
  entity.newOperatorDetails_delegationApprover =
    event.params.newOperatorDetails.delegationApprover
  entity.newOperatorDetails_stakerOptOutWindowBlocks =
    event.params.newOperatorDetails.stakerOptOutWindowBlocks

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOperatorMetadataURIUpdated(
  event: OperatorMetadataURIUpdatedEvent
): void {
  let entity = new OperatorMetadataURIUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.operator = event.params.operator
  entity.metadataURI = event.params.metadataURI

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOperatorRegistered(event: OperatorRegisteredEvent): void {
  let entity = new OperatorRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.operator = event.params.operator
  entity.operatorDetails_earningsReceiver =
    event.params.operatorDetails.earningsReceiver
  entity.operatorDetails_delegationApprover =
    event.params.operatorDetails.delegationApprover
  entity.operatorDetails_stakerOptOutWindowBlocks =
    event.params.operatorDetails.stakerOptOutWindowBlocks

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOperatorSharesDecreased(
  event: OperatorSharesDecreasedEvent
): void {
  let entity = new OperatorSharesDecreased(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.operator = event.params.operator
  entity.staker = event.params.staker
  entity.strategy = event.params.strategy
  entity.shares = event.params.shares

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOperatorSharesIncreased(
  event: OperatorSharesIncreasedEvent
): void {
  let entity = new OperatorSharesIncreased(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.operator = event.params.operator
  entity.staker = event.params.staker
  entity.strategy = event.params.strategy
  entity.shares = event.params.shares

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
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
    event.transaction.hash.concatI32(event.logIndex.toI32())
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
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.pauserRegistry = event.params.pauserRegistry
  entity.newPauserRegistry = event.params.newPauserRegistry

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleStakerDelegated(event: StakerDelegatedEvent): void {
  let entity = new StakerDelegated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.staker = event.params.staker
  entity.operator = event.params.operator

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleStakerForceUndelegated(
  event: StakerForceUndelegatedEvent
): void {
  let entity = new StakerForceUndelegated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.staker = event.params.staker
  entity.operator = event.params.operator

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleStakerUndelegated(event: StakerUndelegatedEvent): void {
  let entity = new StakerUndelegated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.staker = event.params.staker
  entity.operator = event.params.operator

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleStrategyWithdrawalDelayBlocksSet(
  event: StrategyWithdrawalDelayBlocksSetEvent
): void {
  let entity = new StrategyWithdrawalDelayBlocksSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.strategy = event.params.strategy
  entity.previousValue = event.params.previousValue
  entity.newValue = event.params.newValue

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new Unpaused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account
  entity.newPausedStatus = event.params.newPausedStatus

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdrawalCompleted(
  event: WithdrawalCompletedEvent
): void {
  let entity = new WithdrawalCompleted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.withdrawalRoot = event.params.withdrawalRoot

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdrawalMigrated(event: WithdrawalMigratedEvent): void {
  let entity = new WithdrawalMigrated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.oldWithdrawalRoot = event.params.oldWithdrawalRoot
  entity.newWithdrawalRoot = event.params.newWithdrawalRoot

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdrawalQueued(event: WithdrawalQueuedEvent): void {
  let entity = new WithdrawalQueued(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.withdrawalRoot = event.params.withdrawalRoot
  entity.withdrawal_staker = event.params.withdrawal.staker
  entity.withdrawal_delegatedTo = event.params.withdrawal.delegatedTo
  entity.withdrawal_withdrawer = event.params.withdrawal.withdrawer
  entity.withdrawal_nonce = event.params.withdrawal.nonce
  entity.withdrawal_startBlock = event.params.withdrawal.startBlock
  entity.withdrawal_strategies = event.params.withdrawal.strategies
  entity.withdrawal_shares = event.params.withdrawal.shares

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
