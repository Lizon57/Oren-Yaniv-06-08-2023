import classNames from 'classnames'
import { ICON_PATH_MAP } from '@/constants/icon-path-map'


export function Icon({ name, title, size, classList, onClick }: Props) {
    const icon = ICON_PATH_MAP[name]

    if (!icon) return <></>

    const spanProps = { title, onClick }

    return (
        <span className={classNames('common--icon__container', classList)}  {...spanProps}>
            <svg
                color="currentColor"
                fill="currentColor"
                height={size || '1em'}
                width={size || '1em'}
                viewBox="0 0 32 32"
                role="img"
            >
                {ICON_PATH_MAP[name]}
            </svg>
        </span>
    )
}


interface Props {
    name: string
    title?: string
    size?: string
    classList?: string | { [key: string]: any }
    onClick?: () => void
}
