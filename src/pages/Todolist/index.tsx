import { useState } from '@/core/Kreact';
import TodoItem from '@/components/TodoItem';
import styles from './index.module.css';
import type { TodoType } from '@/types/todo';

export default function TodoList() {
  const [list, setList] = useState<TodoType[]>([]);

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    const value = e.target[0].value;

    if (value === '') {
      alert('할 일을 입력해주세요');
      return;
    }

    setList(prev => [...prev, { id: prev.length, title: value, completed: false }]);

    e.target[0].value = '';
  };

  const handleCheckClick = (id: number) => {
    setList(prev =>
      prev.map(item => (item.id === id ? { ...item, completed: !item.completed } : item)),
    );
  };

  const handleDeleteClick = (id: number) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    setList(prev => {
      return prev.filter(item => item.id !== id);
    });
  };

  return (
    <div className={styles.todolist}>
      <h1 className={styles.todolist__title}>할 일을 적어보아요</h1>
      <form className={styles.todolist__form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="할 일을 적으세요"
          className={styles.todolist__form__input}
        />
        <button className={styles.todolist__form__add}>추가</button>
      </form>
      <ul className={styles.todolist__list}>
        {list.map(item => (
          <TodoItem item={item} onCheckclick={handleCheckClick} onDeleteClick={handleDeleteClick} />
        ))}
      </ul>
    </div>
  );
}
