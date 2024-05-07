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
  WithdrawalQueued,
  Operator,
  OperatorAction,
  Staker,
  Delegation,
  Strategy,
  StakerAction,
  Withdrawal,
  WithdrawalStrategy
} from "../generated/schema"
import {
  BigInt,
  Address,
  Bytes,
  log
} from "@graphprotocol/graph-ts";
import {
  createOrLoadEigenLayer,
  createOrLoadStrategy,
  createOrLoadOperator,
  createOrLoadStaker,
  createOrLoadStrategyDeposit,
  createOrLoadDelegation
} from "./utils/helper"

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

  let operator = createOrLoadOperator(event.params.operator, event.transaction.hash, event.block.timestamp)
  operator.earningsReceiver = event.params.newOperatorDetails.earningsReceiver
  operator.delegationApprover = event.params.newOperatorDetails.delegationApprover
  operator.stakerOptOutWindowBlocks = event.params.newOperatorDetails.stakerOptOutWindowBlocks
  operator.save()

  let action = new OperatorAction(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  action.operator = event.params.operator
  action.type = "DetailsModified"
  action.blockNumber = event.block.number
  action.blockTimestamp = event.block.timestamp
  action.transactionHash = event.transaction.hash
  action.earningsReceiver = event.params.newOperatorDetails.earningsReceiver
  action.delegationApprover = event.params.newOperatorDetails.delegationApprover
  action.stakerOptOutWindowBlocks = event.params.newOperatorDetails.stakerOptOutWindowBlocks
  action.save()
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

  let operator = createOrLoadOperator(event.params.operator, event.transaction.hash, event.block.timestamp)
  operator.metadataURI = event.params.metadataURI
  operator.save()

  let action = new OperatorAction(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  action.operator = event.params.operator
  action.type = "MetadataURIUpdated"
  action.blockNumber = event.block.number
  action.blockTimestamp = event.block.timestamp
  action.transactionHash = event.transaction.hash
  action.metadataURI = event.params.metadataURI
  action.save()
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

  let operator = createOrLoadOperator(event.params.operator, event.transaction.hash, event.block.timestamp)
  operator.earningsReceiver = event.params.operatorDetails.earningsReceiver
  operator.delegationApprover = event.params.operatorDetails.delegationApprover
  operator.stakerOptOutWindowBlocks = event.params.operatorDetails.stakerOptOutWindowBlocks
  operator.save()

  let action = new OperatorAction(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  action.operator = event.params.operator
  action.type = "Registered"
  action.blockNumber = event.block.number
  action.blockTimestamp = event.block.timestamp
  action.transactionHash = event.transaction.hash
  action.earningsReceiver = event.params.operatorDetails.earningsReceiver
  action.delegationApprover = event.params.operatorDetails.delegationApprover
  action.stakerOptOutWindowBlocks = event.params.operatorDetails.stakerOptOutWindowBlocks
  action.save()
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

  const operatorId = event.params.operator
  const stakerId = event.params.staker
  const strategyId = event.params.strategy

  let delegation = createOrLoadDelegation(
    operatorId,
    stakerId,
    strategyId,
    event.transaction.hash,
    event.block.timestamp
  )
  delegation.shares.minus(event.params.shares)
  delegation.lastUpdatedTimestamp = event.block.timestamp
  delegation.lastUpdatedTransactionHash = event.transaction.hash
  delegation.save()

  let strategy = createOrLoadStrategy(event.params.strategy)
  strategy.whitelisted = true
  strategy.totalDelegated = strategy.totalDelegated.minus(event.params.shares)
  strategy.save()
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

  const operatorId = event.params.operator
  const stakerId = event.params.staker
  const strategyId = event.params.strategy

  let delegation = createOrLoadDelegation(
    operatorId,
    stakerId,
    strategyId,
    event.transaction.hash,
    event.block.timestamp
  )
  delegation.shares.plus(event.params.shares)
  delegation.lastUpdatedTimestamp = event.block.timestamp
  delegation.lastUpdatedTransactionHash = event.transaction.hash
  delegation.save()

  let strategy = createOrLoadStrategy(event.params.strategy)
  strategy.whitelisted = true
  strategy.totalDelegated = strategy.totalDelegated.plus(event.params.shares)
  strategy.save()
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

  let layer = createOrLoadEigenLayer()
  layer.stakersWhoDelegateCount = layer.stakersWhoDelegateCount + 1
  layer.save()

  let staker = createOrLoadStaker(event.params.staker)
  staker.delegatedTo = event.params.operator
  staker.actionsCount = staker.actionsCount + 1
  staker.save()

  let action = new StakerAction(event.transaction.hash.concatI32(event.logIndex.toI32()))
  action.staker = event.params.staker
  action.delegatedTo = event.params.operator
  action.blockNumber = event.block.number
  action.blockTimestamp = event.block.timestamp
  action.transactionHash = event.transaction.hash
  action.type = "Delegated"
  action.save()
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

  let layer = createOrLoadEigenLayer()
  layer.stakersWhoDelegateCount = layer.stakersWhoDelegateCount - 1
  layer.save()

  let staker = createOrLoadStaker(event.params.staker)
  staker.delegatedTo = null
  staker.actionsCount = staker.actionsCount + 1
  staker.save()

  let action = new StakerAction(event.transaction.hash.concatI32(event.logIndex.toI32()))
  action.staker = event.params.staker
  action.delegatedTo = event.params.operator
  action.blockNumber = event.block.number
  action.blockTimestamp = event.block.timestamp
  action.transactionHash = event.transaction.hash
  action.type = "Undelegated"
  action.save()
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

  let strategy = createOrLoadStrategy(event.params.strategy)
  strategy.withdrawalDelayBlocks = event.params.newValue
  strategy.save()
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

  let withdrawal = Withdrawal.load(event.params.withdrawalRoot)
  if (withdrawal != null) {
    withdrawal.completedBlockNumber = event.block.number
    withdrawal.completedBlockTimestamp = event.block.timestamp
    withdrawal.completedTransactionHash = event.transaction.hash
    withdrawal.save()

    let strategies = withdrawal.strategies.load()
    for (let i = 0; i < strategies.length; i++) {
      let withdrawalStrategy = strategies[i]
      let share = changetype<BigInt>(withdrawalStrategy.share)
      let strategyId = changetype<Address>(withdrawalStrategy.strategy)
      let strategy = createOrLoadStrategy(strategyId)
      strategy.totalWithdrawing = strategy.totalWithdrawing.minus(share)
      strategy.withdrawalsCount = strategy.withdrawalsCount - 1
      strategy.save()
    }

    let staker = createOrLoadStaker(changetype<Address>(withdrawal.staker))
    staker.actionsCount = staker.actionsCount + 1
    staker.save()

    let action = new StakerAction(event.transaction.hash.concatI32(event.logIndex.toI32()))
    action.staker = withdrawal.staker
    action.type = 'WithdrawalCompleted'
    action.blockNumber = event.block.number
    action.blockTimestamp = event.block.timestamp
    action.transactionHash = event.transaction.hash
    action.withdrawal = event.params.withdrawalRoot
    action.save()
  }
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

  let withdrawal = Withdrawal.load(event.params.oldWithdrawalRoot)
  if (withdrawal != null) {
    withdrawal.newWithdrawal = event.params.newWithdrawalRoot
    withdrawal.migratedBlockNumber = event.block.number
    withdrawal.migratedBlockTimestamp = event.block.timestamp
    withdrawal.migratedTransactionHash = event.transaction.hash
    withdrawal.save()

    let strategies = withdrawal.strategies.load()
    for (let i = 0; i < strategies.length; i++) {
      let withdrawalStrategy = strategies[i]
      let share = changetype<BigInt>(withdrawalStrategy.share)
      let strategyId = changetype<Address>(withdrawalStrategy.strategy)

      let deposit = createOrLoadStrategyDeposit(
        changetype<Address>(withdrawalStrategy.staker), 
        strategyId, 
        event.transaction.hash, 
        event.block.timestamp
      )
      deposit.shares = deposit.shares.plus(share)
      deposit.lastUpdatedTimestamp = event.block.timestamp
      deposit.lastUpdatedTransactionHash = event.transaction.hash
      deposit.save()

      let strategy = createOrLoadStrategy(strategyId)
      strategy.totalShares = strategy.totalShares.plus(share)
      strategy.totalWithdrawing = strategy.totalWithdrawing.minus(share)
      strategy.withdrawalsCount = strategy.withdrawalsCount - 1
      strategy.save()
    }

    let action = new StakerAction(event.transaction.hash.concatI32(event.logIndex.toI32()))
    action.staker = withdrawal.staker
    action.type = 'WithdrawalMigrated'
    action.blockNumber = event.block.number
    action.blockTimestamp = event.block.timestamp
    action.transactionHash = event.transaction.hash
    action.oldWithdrawal = event.params.oldWithdrawalRoot
    action.newWithdrawal = event.params.newWithdrawalRoot
    action.save()

    let staker = createOrLoadStaker(changetype<Address>(withdrawal.staker))
    staker.actionsCount = staker.actionsCount + 1
    staker.save()
  }
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
  entity.withdrawal_strategies = event.params.withdrawal.strategies.map<string>(s => s.toHexString())
  entity.withdrawal_shares = event.params.withdrawal.shares

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let withdrawal = new Withdrawal(event.params.withdrawalRoot)
  withdrawal.staker = event.params.withdrawal.staker
  withdrawal.root = event.params.withdrawalRoot
  withdrawal.queuedBlockNumber = event.block.number
  withdrawal.queuedBlockTimestamp = event.block.timestamp
  withdrawal.queuedTransactionHash = event.transaction.hash
  withdrawal.save()

  let staker = createOrLoadStaker(event.params.withdrawal.staker)

  for (let i = 0; i < event.params.withdrawal.strategies.length; i++) {
    let s = event.params.withdrawal.strategies[i]
    let withdrawalStrategyId = event.params.withdrawal.staker.toHexString() + "-" + event.params.withdrawal.nonce.toHexString() + "-" + i.toString()
    let withdrawShares = event.params.withdrawal.shares[event.params.withdrawal.strategies.indexOf(s)]

    let deposit = createOrLoadStrategyDeposit(event.params.withdrawal.staker, s, event.transaction.hash, event.block.timestamp)
    deposit.shares = deposit.shares.minus(withdrawShares)
    deposit.withdrawal = withdrawalStrategyId
    deposit.lastUpdatedTimestamp = event.block.timestamp
    deposit.lastUpdatedTransactionHash = event.transaction.hash
    deposit.save()

    let strategy = createOrLoadStrategy(s)
    strategy.totalShares = strategy.totalShares.minus(withdrawShares)
    strategy.totalWithdrawing = strategy.totalWithdrawing.plus(withdrawShares)
    strategy.withdrawalsCount = strategy.withdrawalsCount + 1
    strategy.save()

    let withdrawalStrategy = new WithdrawalStrategy(withdrawalStrategyId)
    withdrawalStrategy.withdrawal = event.params.withdrawalRoot
    withdrawalStrategy.strategy = s
    withdrawalStrategy.staker = event.params.withdrawal.staker
    withdrawalStrategy.share = withdrawShares
    withdrawalStrategy.nonce = event.params.withdrawal.nonce
    withdrawalStrategy.save()
  }

  staker.actionsCount = staker.actionsCount + 1
  staker.save()

  let action = new StakerAction(event.transaction.hash.concatI32(event.logIndex.toI32()))
  action.staker = event.params.withdrawal.staker
  action.type = "WithdrawalQueued"
  action.blockNumber = event.block.number
  action.blockTimestamp = event.block.timestamp
  action.transactionHash = event.transaction.hash
  //params
  action.withdrawal = event.params.withdrawalRoot
  action.delegatedTo = event.params.withdrawal.delegatedTo
  action.withdrawer = event.params.withdrawal.withdrawer
  action.nonce = event.params.withdrawal.nonce
  action.startBlock = event.params.withdrawal.startBlock
  action.save()
}
