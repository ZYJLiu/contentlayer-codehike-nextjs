import * as anchor from "@coral-xyz/anchor"
import { Program } from "@coral-xyz/anchor"
import { AnchorCounter } from "../target/types/anchor_counter"
import { expect } from "chai"

describe("anchor-counter", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)

  const wallet = provider.wallet as anchor.Wallet
  const program = anchor.workspace.AnchorCounter as Program<AnchorCounter>

  const [counter] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("counter")],
    program.programId
  )

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc()

    const account = await program.account["counter"].fetch(counter)
    expect(account.count.toNumber() === 0)
  })

  it("Incremented the count", async () => {
    const tx = await program.methods.increment().rpc()

    const account = await program.account["counter"].fetch(counter)
    expect(account.count.toNumber() === 1)
  })

  it("Decremented the count", async () => {
    const tx = await program.methods.decrement().rpc()

    const account = await program.account["counter"].fetch(counter)
    expect(account.count.toNumber() === 0)
  })
})
