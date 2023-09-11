import 'styles/globalStyles.css';

type WrappingBoxProps = {
    children: string | JSX.Element | JSX.Element[] | React.ReactNode;
    padding?: number;
    widthRatio?: number;
}


function WrappingBox({children, padding = 1, widthRatio = 100}: WrappingBoxProps) {
  return (
    <div style={{ padding: `${padding}rem`, width: `${widthRatio}%`}} className='wrapping-box'>
      {children}
    </div>
  )
}

export default WrappingBox;