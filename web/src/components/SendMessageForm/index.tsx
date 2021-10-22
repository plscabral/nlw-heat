import { useState, FormEvent } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './styles.module.scss';
import { api } from '../../services/api';

export function SendMessageForm() {
  const { user, signOut } = useAuth();
  const [message, setMessage] = useState('');

  const notify = () => toast('Mensagem enviada com sucesso!', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  });

  async function handleSendMessage(event: FormEvent) {
    event.preventDefault();

    if (!message.trim()) {
      return
    }

    await api.post('messages', { message });

    notify();

    setMessage('');
  }

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button className={styles.signOutButton} onClick={signOut}>
        <VscSignOut size={32} />
      </button>

      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>
        <strong className={styles.userName}>
          {user?.name}
        </strong>
        <span className={styles.userGithub}>
          <VscGithubInverted size={16} />
          {user?.login}
        </span>
      </header>

      <form className={styles.sendMessageForm} onSubmit={handleSendMessage}>
        <label htmlFor="message">Mensagem</label>
        <textarea
          id="message"
          name="message"
          placeholder="Qual sua expectativa para o evento?"
          onChange={e => setMessage(e.target.value)}
          value={message}
        />

        <button type="submit">Enviar Mensagem</button>
      </form>
    </div>
  )
}