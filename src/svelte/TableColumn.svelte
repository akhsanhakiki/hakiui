<script lang="ts">import Base from "./_Base.svelte"; export let className = ""; export let as = "th";</script><Base component="table__column" {as} {className} {...$$restProps}><slot /></Base>
