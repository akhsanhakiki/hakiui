<script lang="ts">export let variant: "rect" | "circle" | "text" = "rect"; export let className = "";</script>
<span class={`haki-skeleton ${variant === "rect" ? "" : `haki-skeleton--${variant}`} ${className}`.trim()} {...$$restProps}></span>
