export const Button = ({
	action,
	label,
	dark = false,
	disabled = false
}: {
	action: (() => any) | undefined
	label: string
	dark?: boolean
	disabled?: boolean
}) => {
	return (
		<button
			onClick={action}
			className={`text-white p-3 rounded-lg m-2 ${
				dark ? 'bg-black border border-white' : 'bg-violet-700'
			}`}
			disabled={disabled}
		>
			{label}
		</button>
	)
}
