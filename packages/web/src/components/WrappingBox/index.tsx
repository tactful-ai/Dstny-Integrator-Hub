

type WrappingBoxProps = {
    children: string | JSX.Element | JSX.Element[];
    padding?: number;
    widthRatio?: number;
}


function WrappingBox({children, padding = 1, widthRatio = 100}: WrappingBoxProps) {
  return (
    <div style={{ padding: `${padding}rem`, width: `${widthRatio}%`, border: '1px solid #ccc', borderRadius: '5px', marginBottom: '1rem'}}>
      {children}
    </div>
  )
}

export default WrappingBox;