import { EigenLayer, Strategy, Operator, Staker } from "../../generated/schema"
import { StrategyBase } from "../../generated/StrategyManager/StrategyBase"
import { UnderlyingToken } from "../../generated/StrategyManager/UnderlyingToken"
import { BigInt, Address, ethereum, log } from "@graphprotocol/graph-ts";
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
        layer.totalStaked = BigInt.zero()
        layer.totalDeposit = BigInt.zero()
        layer.totalWithdrawals = BigInt.zero()
        layer.totalDelegated = BigInt.zero()
        layer.avsDirectory = Address.fromString(addresses.avsDirectory)
        layer.eigenPodManager = Address.fromString(addresses.eigenPodManager)
        layer.slasher = Address.fromString(addresses.slasher)
        layer.strategyManager = Address.fromString(addresses.strategyManager)
        layer.delegationManager = Address.fromString(addresses.delegationManager)
        layer.save()
    }
    return layer as EigenLayer
}

export function createOrLoadStrategy(id: string): Strategy {
    let strategy = Strategy.load(id)
    if (strategy == null) {
        strategy = new Strategy(id)
        strategy.whitelisted = true
        strategy.depositsCount = 0
        strategy.withdrawalDelayBlocks = BigInt.zero()
        let strategyBase = StrategyBase.bind(changetype<Address>(id))
        let underlyingToken = strategyBase.try_underlyingToken()
        if (!underlyingToken.reverted) {
            let token = UnderlyingToken.bind(underlyingToken.value)

            let name = token.try_name()
            if (!name.reverted) {
                strategy.name = name.value
            }
            else strategy.name = 'unknown'
            let symbol = token.try_symbol()
            if (!symbol.reverted) {
                strategy.tokenSymbol = name.value
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

        strategy.save()

        let layer = createOrLoadEigenLayer()
        layer.strategiesCount = layer.strategiesCount + 1
        layer.save()
    }
    return strategy as Strategy
}

export function createOrLoadOperator(id: string): Operator {
    let operator = Operator.load(id)
    if (operator == null) {
        operator = new Operator(id)
        operator.tvl = BigInt.fromI32(0)
        operator.metadataURI = ""
        operator.save()

        let layer = createOrLoadEigenLayer()
        layer.operatorsCount = layer.operatorsCount + 1
        layer.save()
    }
    return operator as Operator
}

export function createOrLoadStaker(id: string): Staker {
    let staker = Staker.load(id)
    if (staker == null) {
        staker = new Staker(id)
        staker.staked = BigInt.fromI32(0)
        staker.save()

        let layer = createOrLoadEigenLayer()
        layer.stakersCount = layer.stakersCount + 1
        layer.save()
    }
    return staker as Staker
}