<script lang="ts">import Base from "./_Base.svelte"; export let className = ""; export let as = "td";</script><Base component="table__cell" {as} {className} {...$$restProps}><slot /></Base>
