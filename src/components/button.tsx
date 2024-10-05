import { SubmitButtonType } from "src/types/formTypes"

const SubmitButton = ({label,classname}:SubmitButtonType) => {
    return (
        <div className="flex justify-center mt-6 mb-3">
            <button className={classname}>{label}</button>
        </div>
    )
}

export default SubmitButton;