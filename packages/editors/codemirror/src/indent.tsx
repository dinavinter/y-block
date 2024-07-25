export function icon(){
    return <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24">
	<g fill="none" stroke="#84a6f5" stroke-linecap="round" stroke-width="2">
		<path stroke-dasharray="14" stroke-dashoffset="14" d="M8 5H20">
			<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.1s" dur="0.2s" values="14;0" />
		</path>
		<path stroke-dasharray="12" stroke-dashoffset="12" d="M10 10H20">
			<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.2s" values="12;0" />
		</path>
		<path stroke-dasharray="10" stroke-dashoffset="10" d="M12 15H20">
			<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="10;0" />
		</path>
		<path stroke-dasharray="8" stroke-dashoffset="8" d="M14 20H20">
			<animate fill="freeze" attributeName="stroke-dashoffset" begin="1s" dur="0.2s" values="8;0" />
		</path>
	</g>
	<g fill="#84a6f5" fill-opacity="0">
		<circle cx="4" cy="5" r="1">
			<animate fill="freeze" attributeName="fill-opacity" dur="0.2s" values="0;1" />
		</circle>
		<circle cx="6" cy="10" r="1">
			<animate fill="freeze" attributeName="fill-opacity" begin="0.3s" dur="0.2s" values="0;1" />
		</circle>
		<circle cx="8" cy="15" r="1">
			<animate fill="freeze" attributeName="fill-opacity" begin="0.6s" dur="0.2s" values="0;1" />
		</circle>
		<circle cx="10" cy="20" r="1">
			<animate fill="freeze" attributeName="fill-opacity" begin="0.9s" dur="0.2s" values="0;1" />
		</circle>
	</g>
</svg>
}