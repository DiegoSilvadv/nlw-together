import { useHistory, useParams } from 'react-router-dom';

import logo from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg';
import check from '../assets/images/check.svg';
import answer from '../assets/images/answer.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';

import '../styles/room.scss';
import { Question } from '../components/Questions';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';



type RoomParams = {
    id: string;
}

export function AdminRoom() {
    const history = useHistory();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const { title, questions } = useRoom(roomId);

    async function handleEndRoom() {
        database.ref(`rooms/${roomId}`).update({
            andedAt: new Date(),
        });

        history.push('/');
    }

    async function handleDeleteQuestion(questionId: string){
        if(window.confirm('tem certeza que deseja excluir esta pergunta?')){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    async function handleCheckQuestionAsAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        });
    }
    async function handleHaigLightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true,
        });
    }

    return (
        <div id="page-room">
            <header className="content">
                <img src={logo} alt="logo" />
                <div>
                    <RoomCode code={roomId} />
                    <Button onClick={handleEndRoom} isOutlined >Encerra sala</Button>
                </div>
            </header>

            <main className="content">
                <div className="room-title">
                    <h1>Sala ${title}</h1>

                    {questions.length > 0 && <span>{questions.length}pergunta(s)</span>}
                </div>

                <div className="question-list">
                    {questions.map(question => {
                        return(
                            <Question 
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                isAnswered={question.isAnswered}
                                isHighlighted={question.isHighlighted}
                            >
                                {!question.isAnswered && (
                                    <>
                                    <button
                                    type="button"
                                    onClick={() => handleCheckQuestionAsAnswered(question.id)}
                                    >
                                        <img src={check} alt="marcar pergunta como respondida" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleHaigLightQuestion(question.id)}
                                    >
                                        <img src={answer} alt="dar destaque as perguntas" />
                                    </button>
                                    </>
                                )} 
                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="deletar-pergunta" />
                                </button>
                            </Question>
                        )
                    })}
                </div>

            </main>
        </div>
    )
}