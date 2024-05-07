import { EigenLayer, Strategy, Operator, Staker, AVS, Delegation, StrategyDeposit } from "../../generated/schema"
import { StrategyBase } from "../../generated/StrategyManager/StrategyBase"
import { UnderlyingToken } from "../../generated/StrategyManager/UnderlyingToken"
import { BigInt, Address, Bytes, ethereum, log } from "@graphprotocol/graph-ts";
import { addresses } from '../utils/addresses'



export function createOrLoadEigenLayer(): EigenLayer {
    let id = "0"
    let layer = EigenLayer.load(id)
    if (layer == null) {
        layer = new EigenLayer(id)
        layer.avsCount = 0
        layer.operatorsCount = 0
        layer.stakersCount = 0
        layer.stakersWhoDelegateCount = 0
        layer.strategiesCount = 0
        layer.avsDirectory = Address.fromString(addresses.avsDirectory)
        layer.eigenPodManager = Address.fromString(addresses.eigenPodManager)
        layer.slasher = Address.fromString(addresses.slasher)
        layer.strategyManager = Address.fromString(addresses.strategyManager)
        layer.delegationManager = Address.fromString(addresses.delegationManager)
        layer.save()
    }
    return layer as EigenLayer
}

export function createOrLoadStrategy(id: Address): Strategy {
    let strategy = Strategy.load(id)
    if (strategy == null) {
        strategy = new Strategy(id)
        strategy.whitelisted = true
        strategy.stakesCount = 0
        strategy.delegationsCount = 0
        strategy.withdrawalsCount = 0
        strategy.withdrawalDelayBlocks = BigInt.zero()
        strategy.totalShares = BigInt.zero()
        strategy.totalDelegated = BigInt.zero()
        strategy.totalWithdrawing = BigInt.zero()
        log.debug("STRATEGY ID: " + id.toHexString(), [])
        if (id.toHexString() == "0xbeaC0eeEeeeeEEeEeEEEEeeEEeEeeeEeeEEBEaC0".toLowerCase()) {
            //Beacon ETH Strategy
            strategy.name = "Beacon Ether"
            strategy.tokenSymbol = "ETH"
            strategy.tokenDecimals = 18
        }
        else {
            let strategyBase = StrategyBase.bind(id)
            let underlyingToken = strategyBase.try_underlyingToken()
            if (!underlyingToken.reverted) {
                strategy.underlyingToken = underlyingToken.value
                let token = UnderlyingToken.bind(underlyingToken.value)

                let name = token.try_name()
                if (!name.reverted) {
                    strategy.name = name.value
                }
                else strategy.name = 'unknown'
                let symbol = token.try_symbol()
                if (!symbol.reverted) {
                    strategy.tokenSymbol = symbol.value
                }
                else strategy.tokenSymbol = 'UKNWN'
                let decimals = token.try_decimals()
                if (!decimals.reverted) {
                    strategy.tokenDecimals = decimals.value
                }
                else strategy.tokenDecimals = 18
            }
            else {
                strategy.name = 'unknown'
                strategy.tokenSymbol = 'UKNWN'
                strategy.tokenDecimals = 18
            }
        }

        strategy.save()

        let layer = createOrLoadEigenLayer()
        layer.strategiesCount = layer.strategiesCount + 1
        layer.save()
    }
    return strategy as Strategy
}

export function createOrLoadOperator(id: Address, transactionHash: Bytes, timestamp: BigInt): Operator {
    let operator = Operator.load(id)
    if (operator == null) {
        operator = new Operator(id)
        operator.delegationsCount = 0
        operator.statusesCount = 0
        operator.actionsCount = 0
        operator.registered = timestamp
        operator.registeredTransactionHash = transactionHash
        operator.metadataURI = ""
        operator.save()

        let layer = createOrLoadEigenLayer()
        layer.operatorsCount = layer.operatorsCount + 1
        layer.save()
    }
    return operator as Operator
}

export function createOrLoadStaker(id: Address): Staker {
    let staker = Staker.load(id)
    if (staker == null) {
        staker = new Staker(id)
        staker.delegatedTo = null
        staker.stakesCount = 0
        staker.delegationsCount = 0
        staker.actionsCount = 0
        staker.withdrawalsCount = 0
        staker.save()

        let layer = createOrLoadEigenLayer()
        layer.stakersCount = layer.stakersCount + 1
        layer.save()
    }
    return staker as Staker
}

export function createOrLoadAVS(id: Address, transactionHash: Bytes, timestamp: BigInt): AVS {
    let avs = AVS.load(id)
    if (avs == null) {
        avs = new AVS(id)
        avs.metadataURI = ""
        avs.created = timestamp
        avs.createdTransactionHash = transactionHash
        avs.registrationsCount = 0
        avs.actionsCount = 0
        avs.save()

        let layer = createOrLoadEigenLayer()
        layer.avsCount = layer.avsCount + 1
        layer.save()
    }
    return avs as AVS
}

export function createOrLoadDelegation(operatorId: Address, stakerId: Address, strategyId: Address, transactionHash: Bytes, timestamp: BigInt): Delegation {
    let delegationId = operatorId.concat(stakerId).concat(strategyId)
    let delegation = Delegation.load(delegationId)
    if (delegation == null) {
        delegation = new Delegation(delegationId)
        delegation.staker = stakerId
        delegation.operator = operatorId
        delegation.strategy = strategyId
        delegation.shares = BigInt.fromI32(0)
        delegation.createdTimestamp = timestamp
        delegation.createdTransactionHash = transactionHash
        delegation.lastUpdatedTimestamp = timestamp
        delegation.lastUpdatedTransactionHash = transactionHash
        delegation.save()

        let operator = createOrLoadOperator(operatorId, transactionHash, timestamp)
        operator.delegationsCount = operator.delegationsCount + 1
        operator.save()

        let staker = createOrLoadStaker(stakerId)
        staker.delegationsCount = staker.delegationsCount + 1
        staker.save()

        let strategy = createOrLoadStrategy(strategyId)
        strategy.delegationsCount = strategy.delegationsCount + 1
        strategy.save()
    }
    return delegation as Delegation
}

export function createOrLoadStrategyDeposit(stakerId: Address, strategyId: Address, transactionHash: Bytes, timestamp: BigInt): StrategyDeposit {
    let depositId = stakerId.concat(strategyId)
    let deposit = StrategyDeposit.load(depositId)
    if (deposit == null) {
        deposit = new StrategyDeposit(depositId)
        deposit.depositor = stakerId
        deposit.strategy = strategyId
        deposit.shares = BigInt.zero()
        deposit.createdTimestamp = timestamp
        deposit.createdTransactionHash = transactionHash
        deposit.lastUpdatedTimestamp = timestamp
        deposit.lastUpdatedTransactionHash = transactionHash

        deposit.save()

        let staker = createOrLoadStaker(stakerId)
        staker.stakesCount = staker.stakesCount + 1
        staker.save()

        let strategy = createOrLoadStrategy(strategyId)
        strategy.stakesCount = strategy.stakesCount + 1
        strategy.save()
    }

    return deposit as StrategyDeposit
}