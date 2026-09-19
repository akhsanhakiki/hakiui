<script lang="ts">
  export let value = 0;
  export let max = 100;
  export let label = "";
  export let color: "primary" | "success" | "warning" | "danger" = "primary";
  export let size: "sm" | "md" | "lg" = "md";
  export let className = "";
  $: percent = Math.max(0, Math.min(100, (value / max) * 100));
</script>

<div class={`haki-progress ${color === "primary" ? "" : `haki-progress--${color}`} ${size === "md" ? "" : `haki-progress--${size}`} ${className}`.trim()} {...$$restProps}>
  {#if label}<div class="haki-progress__head"><span class="haki-progress__label">{label}</span><span class="haki-progress__value">{Math.round(percent)}%</span></div>{/if}
  <div class="haki-progress__track" role="progressbar" aria-valuemin="0" aria-valuemax={max} aria-valuenow={value}><div class="haki-progress__bar" style={`width: ${percent}%`}></div></div>
</div>
