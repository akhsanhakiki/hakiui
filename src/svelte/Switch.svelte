<script lang="ts">export let checked = false; export let disabled = false; export let className = "";</script>
<label class={`haki-switch ${className}`.trim()}><input type="checkbox" bind:checked {disabled} {...$$restProps} /><span class="haki-switch__track"><span class="haki-switch__thumb"></span></span><slot /></label>
