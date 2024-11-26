import React from 'react';
import Question from '../Common/Question';

const QuestionsAnswersGrid = ({questions}) => {

    return (
        <div className="px-4">
                        {
                            // eslint-disable-next-line react/prop-types
                            questions && questions.map(question=>(<Question question={question} key={question.id}/>))
                        }
        </div>
    );
};

export default QuestionsAnswersGrid;