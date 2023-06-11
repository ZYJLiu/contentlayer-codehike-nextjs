use anchor_lang::prelude::*;

declare_id!("ALeaCzuJpZpoCgTxMjJbNjREVqSwuvYFRZUfc151AKHU");

#[program]
pub mod anchor_counter {
    use super::*;
}

#[account]
pub struct Counter {
    pub count: u64,
}
