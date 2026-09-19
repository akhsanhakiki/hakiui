<script lang="ts">import Base from "./_Base.svelte"; export let className = ""; export let as = "div";</script><Base component="toast" {as} {className} role="status" {...$$restProps}><slot /></Base>
