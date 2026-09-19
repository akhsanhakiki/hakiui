<script lang="ts">import Base from "./_Base.svelte"; export let className = ""; export let as = "thead";</script><Base component="table__header" {as} {className} {...$$restProps}><slot /></Base>
