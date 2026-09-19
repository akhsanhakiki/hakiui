<script lang="ts">import Base from "./_Base.svelte"; export let className = ""; export let as = "tbody";</script><Base component="table__body" {as} {className} {...$$restProps}><slot /></Base>
