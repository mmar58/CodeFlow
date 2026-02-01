<script lang="ts">
    import { MoreVertical, Trash2, Copy } from "@lucide/svelte";

    interface MenuItem {
        label: string;
        icon?: any;
        action: () => void;
        variant?: "default" | "danger";
    }

    interface Props {
        x: number;
        y: number;
        items: MenuItem[];
        onClose: () => void;
    }

    let { x, y, items, onClose }: Props = $props();

    // Close on click outside
    function handleClickOutside(event: MouseEvent) {
        const target = event.target as HTMLElement;
        if (!target.closest(".context-menu")) {
            onClose();
        }
    }

    // Handle item click
    function handleItemClick(item: MenuItem) {
        item.action();
        onClose();
    }

    $effect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    });
</script>

<div
    class="context-menu"
    style="left: {x}px; top: {y}px;"
    onclick={(e) => e.stopPropagation()}
>
    {#each items as item}
        <button
            class="menu-item"
            class:danger={item.variant === "danger"}
            onclick={() => handleItemClick(item)}
        >
            {#if item.icon}
                <svelte:component this={item.icon} size={16} />
            {/if}
            <span>{item.label}</span>
        </button>
    {/each}
</div>

<style>
    .context-menu {
        position: fixed;
        background: linear-gradient(
            135deg,
            rgba(26, 26, 46, 0.98) 0%,
            rgba(15, 15, 26, 0.98) 100%
        );
        border: 1px solid rgba(99, 102, 241, 0.3);
        border-radius: 12px;
        padding: 6px;
        min-width: 180px;
        z-index: 10000;
        box-shadow:
            0 10px 40px rgba(0, 0, 0, 0.5),
            0 0 20px rgba(99, 102, 241, 0.2);
        animation: slideIn 0.15s ease;
        backdrop-filter: blur(10px);
    }

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-5px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    .menu-item {
        display: flex;
        align-items: center;
        gap: 12px;
        width: 100%;
        padding: 10px 14px;
        border: none;
        border-radius: 8px;
        background: transparent;
        color: #e0e0e0;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.15s ease;
        text-align: left;
    }

    .menu-item:hover {
        background: rgba(99, 102, 241, 0.2);
        color: #fff;
    }

    .menu-item.danger {
        color: #f87171;
    }

    .menu-item.danger:hover {
        background: rgba(239, 68, 68, 0.2);
        color: #ef4444;
    }
</style>
