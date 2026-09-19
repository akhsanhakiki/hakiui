<script lang="ts">export let checked = false; export let disabled = false; export let className = "";</script>
<label class={`haki-radio ${className}`.trim()}><input type="radio" checked={checked} {disabled} on:change={() => (checked = true)} {...$$restProps} /><span class="haki-radio__dot"></span><slot /></label>
