import { BigInt } from "@graphprotocol/graph-ts"
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
} from "../generated/StrategyManager/StrategyManager"
import {
  Deposit,
  Initialized,
  OwnershipTransferred,
  Paused,
  PauserRegistrySet,
  Strategy,
  StrategyAddedToDepositWhitelist,
  StrategyRemovedFromDepositWhitelist,
  StrategyWhitelisterChanged,
  Unpaused,
  UpdatedThirdPartyTransfersForbidden,
} from "../generated/schema"

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

  const strategyId = event.params.strategy.toHexString()
  let strategy = Strategy.load(strategyId)
  if(strategy == null){
    strategy = new Strategy(strategyId)
    strategy.withdrawalDelayBlocks = BigInt.fromI32(0)
  }
  strategy.whitelisted = true
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

  const strategyId = event.params.strategy.toHexString()
  let strategy = Strategy.load(strategyId)
  if(strategy == null){
    strategy = new Strategy(strategyId)
    strategy.withdrawalDelayBlocks = BigInt.fromI32(0)
  }
  strategy.whitelisted = false
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
