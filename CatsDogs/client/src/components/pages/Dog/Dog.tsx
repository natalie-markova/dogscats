import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../redux/store";
import Button from "../../button/Button";
import Pictures from "../../picture/Pictures";
import { loadDogs } from "../../../redux/dog.slice";
import { addToBlacklist } from "../../blacklist/blacklist";

function Dog() {
    const dogs = useAppSelector((state) => state.dogs)
    const dispatch = useAppDispatch()
    const [showInput, setShowInput] = useState(false);

    const currentImageURL = dogs?.dogs?.url;

    function handleClick(actionType) {

        switch (actionType) {
            case "like":
                setShowInput(true);
                break;
            case "neutral":
                dispatch(loadDogs());
                break;
            case "dislike":
                if (currentImageURL) {
                    addToBlacklist(currentImageURL);
                }
                dispatch(loadDogs());
                break;                
            default:
                break;    
        }
    }    

    return (

        <>
        <div className="colum">
        <Pictures 
            type="dogs"
            showInput={showInput}
            setShowInput={setShowInput}
        />
        {!showInput && <Button handleClick={handleClick}/>}
        </div>
        </>
    )
};

export default Dog;