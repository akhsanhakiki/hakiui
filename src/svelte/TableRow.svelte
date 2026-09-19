<script lang="ts">import Base from "./_Base.svelte"; export let className = ""; export let as = "tr";</script><Base component="table__row" {as} {className} {...$$restProps}><slot /></Base>
