import { useHistory } from 'react-router-dom';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import illustration from '../assets/images/illustration.svg';
import logo from '../assets/images/logo.svg';
import googleIcon from '../assets/images/google-icon.svg';
import '../styles/auth.scss';
import { FormEvent, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

export function Home() {

    const history = useHistory();
    const { signWithGoogle, user } = useAuth();
    const [roomCode, setRoomCode] = useState('');

    // autenticação com google
    async function handleCreateRoom() {
        if (!user) {
            await signWithGoogle();
        }
        history.push('/room/new');
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        // caso o roomCode seja vazio
        if (roomCode.trim() === '') {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()) {
            alert('Essa sala não existe');
            console.log(roomRef);
            return;
        }

        if (roomRef.val().andedAt) {
            alert('Está sala esta encerrada');
            return;
        }

        history.push(`room/${roomCode}`);
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustration} alt='Ilustração simbolizando perguntas e respostas' />
                <strong>Crie salas ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logo} alt="letmeask" />
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIcon} alt="logo do google" />
                        Crie sua sala com Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>

                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digíte o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">Entrar na sala</Button>
                        
                    </form>

                </div>
            </main>
        </div>
    )
}