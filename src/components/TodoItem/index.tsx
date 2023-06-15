import styles from './index.module.css';
import type { TodoType } from '@/types/todo';

interface TodoItemProps {
  item: TodoType;
  onCheckclick: (id: number) => void;
  onDeleteClick: (id: number) => void;
}

export default function TodoItem({ item, onCheckclick, onDeleteClick }: TodoItemProps) {
  return (
    <li className={styles.item}>
      <div style={{ display: 'flex' }}>
        {/* attribute에서 분기 처리 안됨 */}
        {item.completed ? (
          <>
            <input type="checkbox" onClick={() => onCheckclick(item.id)} checked />
            <p className={styles.item__text__done}>{item.title}</p>
          </>
        ) : (
          <>
            <input type="checkbox" onClick={() => onCheckclick(item.id)} />
            <p className={styles.item__text}>{item.title}</p>
          </>
        )}
      </div>
      <button className={styles.button__delete} onClick={() => onDeleteClick(item.id)}>
        삭제
      </button>
    </li>
  );
}
