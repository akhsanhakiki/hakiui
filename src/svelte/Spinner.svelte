<script lang="ts">export let size: "sm" | "md" | "lg" = "md"; export let label = "Loading"; export let className = "";</script>
<span class={`haki-spinner ${size === "md" ? "" : `haki-spinner--${size}`} ${className}`.trim()} role="status" aria-label={label} {...$$restProps}></span>
