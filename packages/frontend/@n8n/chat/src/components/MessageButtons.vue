<script setup lang="ts">
import { useChat } from '@n8n/chat/composables';
import Button from './Button.vue';

interface ButtonOption {
	id?: string;
	label: string;
	value: string;
	url?: string;
}

interface Props {
	title?: string;
	options: ButtonOption[];
	multiple?: boolean;
}

const props = defineProps<Props>();
const { sendMessage } = useChat();

const handleButtonClick = async (option: ButtonOption) => {
	if (option.url) {
		// If button has URL, open it in new tab
		window.open(option.url, '_blank', 'noopener,noreferrer');
	}

	// Always send the button value as a message back to the workflow
	await sendMessage(option.value);
};
</script>

<template>
	<div class="chat-message-buttons">
		<div v-if="title" class="chat-message-buttons-title">
			{{ title }}
		</div>
		<div class="chat-message-buttons-container">
			<Button
				v-for="option in options"
				:key="option.id || option.value"
				class="chat-message-button"
				@click="handleButtonClick(option)"
			>
				{{ option.label }}
			</Button>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.chat-message-buttons {
	display: flex;
	flex-direction: column;
	gap: var(--chat--spacing, 1rem);
	padding: var(--chat--spacing, 1rem) 0;
}

.chat-message-buttons-title {
	font-size: var(--chat--message--font-size, 0.875rem);
	font-weight: 600;
	color: var(--chat--color-secondary, #666);
	margin-bottom: 0.25rem;
}

.chat-message-buttons-container {
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
}

.chat-message-button {
	flex: 0 1 auto;
	min-width: fit-content;
	white-space: nowrap;

	&:hover {
		transform: translateY(-1px);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	&:active {
		transform: translateY(0);
	}
}
</style>
