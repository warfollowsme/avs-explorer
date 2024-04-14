import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { BeaconChainETHDeposited } from "../generated/schema"
import { BeaconChainETHDeposited as BeaconChainETHDepositedEvent } from "../generated/EigenPodManager/EigenPodManager"
import { handleBeaconChainETHDeposited } from "../src/eigen-pod-manager"
import { createBeaconChainETHDepositedEvent } from "./eigen-pod-manager-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let podOwner = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let amount = BigInt.fromI32(234)
    let newBeaconChainETHDepositedEvent = createBeaconChainETHDepositedEvent(
      podOwner,
      amount
    )
    handleBeaconChainETHDeposited(newBeaconChainETHDepositedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("BeaconChainETHDeposited created and stored", () => {
    assert.entityCount("BeaconChainETHDeposited", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "BeaconChainETHDeposited",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "podOwner",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "BeaconChainETHDeposited",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
