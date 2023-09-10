import 'styles/globalStyles.css';

type TagNumberProps = {
    text: string;
}

function TagNumber({text}:TagNumberProps) {
  return (
    <div className='tag-number'>{text}</div>
  )
}

export default TagNumber;