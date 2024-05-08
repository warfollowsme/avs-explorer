import { BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import {
  Deposit as DepositEvent,
  Initialized as InitializedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Paused as PausedEvent,
  PauserRegistrySet as PauserRegistrySetEvent,
  StrategyAddedToDepositWhitelist as StrategyAddedToDepositWhitelistEvent,
  StrategyRemovedFromDepositWhitelist as StrategyRemovedFromDepositWhitelistEvent,
  StrategyWhitelisterChanged as StrategyWhitelisterChangedEvent,
  Unpaused as UnpausedEvent,
  UpdatedThirdPartyTransfersForbidden as UpdatedThirdPartyTransfersForbiddenEvent,
  WithdrawalCompleted as WithdrawalCompletedEvent,
  WithdrawalQueued as WithdrawalQueuedEvent,
  ShareWithdrawalQueued as ShareWithdrawalQueuedEvent
} from "../generated/StrategyManager/StrategyManager"
import {
  Deposit,
  Initialized,
  OwnershipTransferred,
  Paused,
  PauserRegistrySet,
  StakerAction,
  StrategyAddedToDepositWhitelist,
  StrategyRemovedFromDepositWhitelist,
  StrategyWhitelisterChanged,
  Unpaused,
  UpdatedThirdPartyTransfersForbidden,
  Withdrawal,
  WithdrawalRoot,
  WithdrawalStrategy
} from "../generated/schema"
import {
  createOrLoadEigenLayer,
  createOrLoadStrategy,
  createOrLoadStrategyDeposit,
  createOrLoadStaker
} from "./utils/helper"

export function handleDeposit(event: DepositEvent): void {
  let entity = new Deposit(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.staker = event.params.staker
  entity.token = event.params.token
  entity.strategy = event.params.strategy
  entity.shares = event.params.shares

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let deposit = createOrLoadStrategyDeposit(event.params.staker, event.params.strategy, event.transaction.hash, event.block.timestamp)
  deposit.shares = deposit.shares.plus(event.params.shares)
  deposit.lastUpdatedTimestamp = event.block.timestamp
  deposit.lastUpdatedTransactionHash = event.transaction.hash
  deposit.save()

  let strategy = createOrLoadStrategy(event.params.strategy)
  strategy.totalShares = strategy.totalShares.plus(event.params.shares)
  strategy.save()

  let staker = createOrLoadStaker(event.params.staker)
  staker.actionsCount = staker.actionsCount + 1
  staker.save()

  let action = new StakerAction(event.transaction.hash.concatI32(event.logIndex.toI32()))
  action.staker = event.params.staker
  action.type = "Deposit"
  action.blockNumber = event.block.number
  action.blockTimestamp = event.block.timestamp
  action.transactionHash = event.transaction.hash
  //params
  action.share = event.params.shares
  action.strategy = event.params.strategy
  action.token = event.params.token
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

export function handleStrategyAddedToDepositWhitelist(
  event: StrategyAddedToDepositWhitelistEvent,
): void {
  let entity = new StrategyAddedToDepositWhitelist(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.strategy = event.params.strategy

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let strategy = createOrLoadStrategy(event.params.strategy)
  strategy.whitelisted = true
  strategy.save()
}

export function handleStrategyRemovedFromDepositWhitelist(
  event: StrategyRemovedFromDepositWhitelistEvent,
): void {
  let entity = new StrategyRemovedFromDepositWhitelist(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.strategy = event.params.strategy

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let strategy = createOrLoadStrategy(event.params.strategy)
  strategy.whitelisted = false
  strategy.save()
}

export function handleStrategyWhitelisterChanged(
  event: StrategyWhitelisterChangedEvent,
): void {
  let entity = new StrategyWhitelisterChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.previousAddress = event.params.previousAddress
  entity.newAddress = event.params.newAddress

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

export function handleUpdatedThirdPartyTransfersForbidden(
  event: UpdatedThirdPartyTransfersForbiddenEvent,
): void {
  let entity = new UpdatedThirdPartyTransfersForbidden(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.strategy = event.params.strategy
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdrawalCompleted(
  event: WithdrawalCompletedEvent
): void {
  let withdrawalRoot = WithdrawalRoot.load(event.params.withdrawalRoot)
  if (withdrawalRoot != null) {
    let withdrawal = Withdrawal.load(withdrawalRoot.withdrawal)
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
        let stakerId = changetype<Address>(withdrawalStrategy.staker)
        let strategy = createOrLoadStrategy(changetype<Address>(strategyId))
        strategy.totalWithdrawing = strategy.totalWithdrawing.minus(share)
        strategy.withdrawalsCount = strategy.withdrawalsCount - 1
        strategy.save()

        let deposit = createOrLoadStrategyDeposit(stakerId, strategyId, event.transaction.hash, event.block.timestamp)
        deposit.withdrawal = null
        deposit.save()
      }

      let staker = createOrLoadStaker(event.params.depositor)
      staker.actionsCount = staker.actionsCount + 1
      staker.save()

      let action = new StakerAction(event.transaction.hash.concatI32(event.logIndex.toI32()))
      action.staker = event.params.depositor
      action.type = 'WithdrawalCompleted'
      action.blockNumber = event.block.number
      action.blockTimestamp = event.block.timestamp
      action.transactionHash = event.transaction.hash
      action.withdrawal = event.params.withdrawalRoot
      action.save()
    }
  }
}

export function handleWithdrawalQueued(event: WithdrawalQueuedEvent): void {
  let withdrawalId = event.params.depositor.concatI32(event.params.nonce.toI32())
  let withdrawal = new Withdrawal(withdrawalId)
  withdrawal.staker = event.params.depositor
  withdrawal.nonce = event.params.nonce
  withdrawal.root = event.params.withdrawalRoot
  withdrawal.queuedBlockNumber = event.block.number
  withdrawal.queuedBlockTimestamp = event.block.timestamp
  withdrawal.queuedTransactionHash = event.transaction.hash
  withdrawal.save()

  let withdrawalRoot = new WithdrawalRoot(event.params.withdrawalRoot)
  withdrawalRoot.withdrawal = withdrawalId
  withdrawalRoot.save()

  let staker = createOrLoadStaker(event.params.depositor)
  staker.actionsCount = staker.actionsCount + 1
  staker.save()

  let action = new StakerAction(event.transaction.hash.concatI32(event.logIndex.toI32()))
  action.staker = event.params.depositor
  action.type = "WithdrawalQueued"
  action.blockNumber = event.block.number
  action.blockTimestamp = event.block.timestamp
  action.transactionHash = event.transaction.hash
  //params
  action.withdrawal = event.params.withdrawalRoot
  action.delegatedTo = event.params.delegatedAddress
  action.withdrawer = event.params.withdrawer
  action.nonce = event.params.nonce
  action.save()
}

export function handleShareWithdrawalQueued(event: ShareWithdrawalQueuedEvent): void {
  let withdrawalStrategyId = event.params.depositor.concatI32(event.params.nonce.toI32()).concat(event.params.strategy)
  let withdrawalStrategy = new WithdrawalStrategy(withdrawalStrategyId)
  withdrawalStrategy.staker = event.params.depositor
  withdrawalStrategy.strategy = event.params.strategy
  withdrawalStrategy.share = event.params.shares
  withdrawalStrategy.withdrawal = event.params.depositor.concatI32(event.params.nonce.toI32())
  withdrawalStrategy.save()

  let deposit = createOrLoadStrategyDeposit(event.params.depositor, event.params.strategy, event.transaction.hash, event.block.timestamp)
  deposit.withdrawal = withdrawalStrategyId
  deposit.shares = deposit.shares.minus(event.params.shares)
  deposit.lastUpdatedTimestamp = event.block.timestamp
  deposit.lastUpdatedTransactionHash = event.transaction.hash
  deposit.save()

  let strategy = createOrLoadStrategy(event.params.strategy)
  strategy.totalShares = strategy.totalShares.minus(event.params.shares)
  strategy.totalWithdrawing = strategy.totalWithdrawing.plus(event.params.shares)
  strategy.withdrawalsCount = strategy.withdrawalsCount + 1
  strategy.save()
}
