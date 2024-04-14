import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { AVSMetadataURIUpdated } from "../generated/schema"
import { AVSMetadataURIUpdated as AVSMetadataURIUpdatedEvent } from "../generated/AVSDirectory/AVSDirectory"
import { handleAVSMetadataURIUpdated } from "../src/avs-directory"
import { createAVSMetadataURIUpdatedEvent } from "./avs-directory-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let avs = Address.fromString("0x0000000000000000000000000000000000000001")
    let metadataURI = "Example string value"
    let newAVSMetadataURIUpdatedEvent = createAVSMetadataURIUpdatedEvent(
      avs,
      metadataURI
    )
    handleAVSMetadataURIUpdated(newAVSMetadataURIUpdatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AVSMetadataURIUpdated created and stored", () => {
    assert.entityCount("AVSMetadataURIUpdated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AVSMetadataURIUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "avs",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AVSMetadataURIUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "metadataURI",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
