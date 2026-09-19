<script lang="ts">
  /** Scoped token overrides; import @hakistudio/hakiui/hakiui.css once globally. */
  export let primary = "";
  export let radius: string | number = "";
  export let mode: "light" | "dark" = "light";
  export let className = "";
  $: style = `${primary ? `--ui-primary:${primary};--ui-primary-bg:${primary};` : ""}${radius !== "" ? `--ui-radius:${typeof radius === "number" ? `${radius}px` : radius};` : ""}`;
</script>

<div class={`haki-provider ${className}`.trim()} class:dark={mode === "dark"} {style} {...$$restProps}><slot /></div>
