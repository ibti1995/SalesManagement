import { CustomButtonType } from "src/types/formTypes"

const CustomButton = ({label,classname}:CustomButtonType) => {
    return (
        <div className="flex justify-center mt-6 mb-3">
            <button className={classname}>{label}</button>
        </div>
    )
}

export default CustomButton;