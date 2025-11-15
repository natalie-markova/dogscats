import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../redux/store";
import Button from "../../button/Button";
import Pictures from "../../picture/Pictures";
import { loadCats } from "../../../redux/cat.slice";
import { addToBlacklist } from "../../blacklist/blacklist";

function Cat() {
    const cats = useAppSelector((state) => state.cats)
    const dispatch = useAppDispatch()
    const [showInput, setShowInput] = useState(false);
    const currentImageURL = cats?.dogs?.[0]?.url;

    function handleClick(actionType) {
        switch (actionType) {
            case "like":
                setShowInput(true);
                break;
            case "neutral":
                dispatch(loadCats());
                break;
            case "dislike":
                if (currentImageURL) {
                    addToBlacklist(currentImageURL);
                }
                dispatch(loadCats());
                break;                
            default:
                break;    
        }
    }

    return (

        <>
        <div className="colum">
        <Pictures 
            type="cats"
            showInput={showInput}
            setShowInput={setShowInput}/>

        {!showInput && <Button handleClick={handleClick} />}
        </div>
        </>
    )
};

export default Cat;