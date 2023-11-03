import { IconBaseProps } from 'react-icons';
import * as Icons from 'react-icons/io5';

type CleanIconsType = Exclude<keyof typeof Icons extends `Io${infer Rest}` ? Rest : keyof typeof Icons, `${string}${'Outline'|'Sharp'|'Circle'}`>;

interface OptionsType extends IconBaseProps {
	type: CleanIconsType, 
	active?: boolean
}

function TouchableIcon({ type, active, ...args }: OptionsType) {
	const Icon = (Icons as any)?.[`Io${type}${!active ? 'Outline' : ''}`]

	return (
		<Icon {...args} />
	)
}

export default TouchableIcon;