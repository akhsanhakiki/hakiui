<script lang="ts">
  export let variant: "primary" | "secondary" | "outline" | "ghost" = "primary";
  export let size: "sm" | "md" | "lg" = "md";
  export let className = "";
  export let type: "button" | "submit" | "reset" = "button";
</script>

<button
  {type}
  class={`haki-btn ${variant === "primary" ? "" : `haki-btn--${variant}`} ${size === "md" ? "" : `haki-btn--${size}`} ${className}`.trim()}
  {...$$restProps}
>
  <slot />
</button>
