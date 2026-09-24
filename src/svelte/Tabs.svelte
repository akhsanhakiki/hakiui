<script lang="ts">
  import Base from "./_Base.svelte";

  export let className = "";
  export let as = "div";
  export let variant: "underline" | "segmented" = "underline";
  export let size: "sm" | "md" | "lg" = "md";
  export let radius: "none" | "sm" | "md" | "lg" | "full" = "md";

  $: classes = `${variant === "underline" ? "" : `haki-tabs--${variant}`} ${size === "md" ? "" : `haki-tabs--${size}`} ${radius === "md" ? "" : `haki-tabs--radius-${radius}`} ${className}`.trim();
</script>

<Base component="tabs" {as} className={classes} {...$$restProps}>
  <slot />
</Base>
