<script lang="ts">
  export let color: "primary" | "neutral" | "success" | "warning" | "danger" = "primary";
  export let variant: "solid" | "soft" | "outline" = "soft";
  export let size: "sm" | "md" = "md";
  export let className = "";
</script>

<span class={`haki-badge haki-badge--${color} ${variant === "soft" ? "" : `haki-badge--${variant}`} ${size === "md" ? "" : "haki-badge--sm"} ${className}`.trim()} {...$$restProps}><slot /></span>
