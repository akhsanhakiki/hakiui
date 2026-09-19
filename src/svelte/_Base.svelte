<script lang="ts">
  /**
   * Shared shell for structural Svelte components. It deliberately only owns
   * Haki's semantic class and leaves the element/attributes to the consumer.
   */
  export let component: string;
  export let as: string = "div";
  export let className = "";
</script>

<svelte:element this={as} class={`haki-${component} ${className}`.trim()} {...$$restProps}>
  <slot />
</svelte:element>
