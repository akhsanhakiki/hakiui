<script lang="ts">
  export let value = "";
  export let size: "sm" | "md" | "lg" = "md";
  export let className = "";
  export let type = "text";
  export let label = "";
  export let description = "";
</script>

{#if label}
  <label class="haki-field">
    <span class="haki-label">{label}</span>
    <input bind:value {type} class={`haki-input ${size === "md" ? "" : `haki-input--${size}`} ${className}`.trim()} {...$$restProps} />
    {#if description}<span class="haki-help">{description}</span>{/if}
  </label>
{:else}
  <input bind:value {type} class={`haki-input ${size === "md" ? "" : `haki-input--${size}`} ${className}`.trim()} {...$$restProps} />
{/if}
