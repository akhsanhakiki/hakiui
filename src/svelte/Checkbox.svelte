<script lang="ts">export let checked = false; export let disabled = false; export let className = "";</script>
<label class={`haki-checkbox ${className}`.trim()}><input type="checkbox" bind:checked {disabled} {...$$restProps} /><span class="haki-checkbox__box"></span><slot /></label>
