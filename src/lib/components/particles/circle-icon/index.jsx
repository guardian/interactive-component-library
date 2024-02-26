export const CircleIcon = ({color}) => {

    return (
        <svg
            style={{ display: 'inline-block', marginRight: 4, transform: 'translateY(-1px)' }}
            fill="none" 
            height="11" 
            viewBox="0 0 11 11" 
            width="11" 
            xmlns="http://www.w3.org/2000/svg">
            <rect fill={color} height="11" rx="5.5" width="11" />
        </svg>
    )
}
  