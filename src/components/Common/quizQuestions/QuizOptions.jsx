// eslint-disable-next-line react/prop-types
import {Fragment, useMemo} from "react";
import useQuiz from "../../../hooks/useQuiz.js";

const QuizOptions = ({ options }) => {
    console.log(options);
    const shuffleArray =(array)=>{
for(let i= array.length-1;i>=0;i--){
    const randomIdx = Math.floor(Math.random()* (i+1));
    [array[randomIdx],array[i]] = [array[i],array[randomIdx]];
}
return array;
    }
const {chooseOption,setChooseOptions,setOption} = useQuiz()

    const shuffledOptions = useMemo(() => shuffleArray([...options]), [options]);


    // console.log(options,shuffledOptions)
    return (
        <Fragment >
            {shuffledOptions.map((option) => (
                <label
                    key={option}
                    className="flex items-center space-x-3 py-3 px-4 bg-primary/5 rounded-md text-lg"
                >
                    <input
                        type="checkbox"
                        name={`answer${option.id}`}
                        className="form-radio text-buzzr-purple"
                        defaultChecked={option.checked}
                        checked={chooseOption===option}
                        onChange={()=>setChooseOptions(option)}
                    />
                    <span>{option}</span>
                </label>

            ))}
        </Fragment>
    );
};

export default QuizOptions;
