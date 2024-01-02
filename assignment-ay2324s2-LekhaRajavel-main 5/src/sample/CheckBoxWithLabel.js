export default function CheckBoxWithLabel(props) {
    const [isChecked, setIsChecked] = React.useState(false);
    const onChange = () => setIsChecked(!isChecked);
    return (
        <label>
            <input type="checkbox" checked={isChecked} onChange={onChange} />
            {isChecked ? props.labelOn : props.labelOff}
        </label>
    );
}
